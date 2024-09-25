import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { MongoClient } from 'mongodb';
import { Enterprise } from '@/constants/Enterprise';
import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';


/**
Approach:
https://www.mongodb.com/docs/atlas/atlas-vector-search/rag/
https://www.mongodb.com/docs/atlas/atlas-vector-search/tutorials/vector-search-tutorial/#create-the-atlas-vector-search-index
*/


const client = new MongoClient(process.env.MONGODB_URI as string);
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY,});

//Retrieve most relevant output
async function searchEnterprisesRAG(userQuery: string) {
    //Initialisation
    await client.connect();
    const db = client.db('goodgoods');
    const coll = db.collection("socialenterprises");


    //Generate embedding for user query
    const queryEmbedding = await openai.embeddings.create({
        input: userQuery,
        model: 'text-embedding-3-small',
    });
    const queryVector = queryEmbedding.data[0].embedding;


    //Perform aggregation pipeline
    const agg = [
        {
            '$vectorSearch': {
                'index': 'vector_index', // Replace with your actual search index name
                'path': 'plot_embedding', // Your embedding field
                'queryVector': queryVector,
                'numCandidates': 200, 
                'limit': 5 //Return the 5 most relevant results, we can change this if required
            }
        }
    ];
    const results = await coll.aggregate(agg).toArray();
    const filteredResults = results.map(({ plot_embedding, ...rest }) => rest); //Remove embeddings key

    console.log(filteredResults);
   
    return filteredResults
}

//Answering based on given context
const TEMPLATE = `Your job is to remove social enterprises that are not relevant or related to the user's query. You are given context that has a list of social enterprises. Based on the context,
return a list [ID1, ID2, ...] where the IDs (which are numbers) are the enterprise IDs of the social enterprises that apply. For example, a possible output is [1, 2, 3].
==============================
Context: {context}
==============================
User: {question}
Assistant:
`

//For filtering of documents
async function filterResultsWithPrompt(filteredResults: any, question:string) {
    const context = filteredResults.map((doc: Enterprise) => {
        return `ID ${doc['eid']}: ${doc['enterpriseName']} is located in ${doc['location']}, offers ${doc['products']}, has these impacts: ${doc['typeOfImpact']} and is a ${doc['format']}. ${doc['detailedImpact']}`;
    }).join('\n');

    const prompt = PromptTemplate.fromTemplate(TEMPLATE);
    const formattedPrompt = await prompt.format({ context, question });

    const model = new ChatOpenAI({
        apiKey: process.env.OPENAI_API_KEY!,
        model: 'gpt-4o-mini', 
        temperature: 0,
    });

    // Prepare the input for the model
    console.log(question)
    const messages = [
        { role: 'system', content: formattedPrompt},
        { role: 'user', content: question }
    ];

    const response = await model.invoke(messages);
    return response.content;
}



//Logic that runs when user submits a query
export async function POST(req: Request) {
        //Prepare user input
        const userInput = await req.json();

        //Perform RAG to find most relevant results
        const topMatchEnterprises = await searchEnterprisesRAG(userInput["question"]);

        const output = await filterResultsWithPrompt(topMatchEnterprises, userInput["question"]);
        return NextResponse.json({ answer: output }, { status: 200 },);
}

