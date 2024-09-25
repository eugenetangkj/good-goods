import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { NextResponse } from 'next/server';
import { Enterprise } from '@/constants/Enterprise';
import connectToDB from "../../../../lib/mongodb";
import SocialEnterprise from "../../../../models/socialEnterprise";
import { OpenAI } from 'openai';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI as string);
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY,});

async function searchEnterprises(userQuery: string) {
    await client.connect();
    const db = client.db('goodgoods');
    const coll = db.collection("socialenterprises");


    // Step 1: Generate embedding for the user query
    const queryEmbedding = await openai.embeddings.create({
        input: userQuery,
        model: 'text-embedding-3-small',
    });

   

    const queryVector = queryEmbedding.data[0].embedding;

    const agg = [
        {
            '$vectorSearch': {
                'index': 'vector_index', // Replace with your actual search index name
                'path': 'plot_embedding', // Your embedding field
                'queryVector': queryVector,
                'numCandidates': 200, 
                'limit': 2
            }
        }
    ];


    const results = await coll.aggregate(agg).toArray();
    console.log(results);
    return results;



















    // // Step 2: Retrieve all embeddings from the collection
    // const embeddings = await db.collection('socialenterpriseembeddings').find().toArray();

    // // Step 3: Calculate similarity and find the closest matches
    // const results = embeddings.map(enterprise => {
    //     const similarity = calculateCosineSimilarity(queryVector, enterprise.embedding); // Implement this function
    //     return { eid: enterprise.eid, similarity };  // Only keep eid and similarity
    // }).sort((a, b) => b.similarity - a.similarity); // Sort by similarity

    // // Step 4: Get top N results based on similarity
    // const topResults = results.slice(0, 5);  // Adjust the number as needed

    // // Step 5: Fetch corresponding social enterprise documents
    // const matchedEnterprises = await db.collection('socialenterprises')
    //     .find({ eid: { $in: topResults.map(e => e.eid) } })
    //     .toArray();

    // // Optionally, add similarity score to matched enterprises for reference
    // const topMatchedEnterprises = matchedEnterprises.map(enterprise => {
    //     const correspondingResult = topResults.find(result => result.eid === enterprise.eid);
    //     return { ...enterprise, similarity: correspondingResult?.similarity };
    // });

    //return topMatchedEnterprises;
}





export async function POST(req: Request) {
        const output = await req.json();
        const topMatchEnterprises = await searchEnterprises(output["question"]);

        console.log(topMatchEnterprises);

        return NextResponse.json({ answer: topMatchEnterprises }, { status: 200 });
}

