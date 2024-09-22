import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
// import { JSONLoader } from "langchain/document_loaders/fs/json";

// Define type for social enterprise data
interface SocialEnterprise {
    "store name": string;
    "location": string;
    "type of store": string;
    "type of goods offered": string;
}

// const loader = new JSONLoader(
//     "./social_enterprises.json", // Path to social enterprises data
//     ["/store name", "/location", "/type of store", "/type of goods offered"]
// );
// Temporarily read from file, but may obtain from MongoDB instead

export const dynamic = 'force-dynamic';

const TEMPLATE = `Answer the user's questions about social enterprises based only on the following context. If the answer is not in the context, reply politely that you do not have that information available.:
==============================
Context: {context}
==============================
User: {question}
Assistant:`;

export async function POST(req: Request) {

        // Extract the question from the request body
        const { question } = await req.json();

        // const docs = await loader.load() as unknown as SocialEnterprise[]; 
        // Hardcoded docs
        const docs = [
            {
                "store name": "Green Eats",
                "location": "San Francisco, CA",
                "type of store": "Restaurant",
                "type of goods offered": "Organic food"
            }
        ]

        // Create the context string from the loaded data
        const context = docs.map((doc: SocialEnterprise) => {
            return `${doc['store name']} is located in ${doc['location']}, offers ${doc['type of goods offered']} and is a ${doc['type of store']}.`;
        }).join('\n');

        // Create the prompt using the TEMPLATE and context
        const prompt = PromptTemplate.fromTemplate(TEMPLATE);
        const formattedPrompt = await prompt.format({ context, question });
        console.log("Formatted Prompt:", formattedPrompt);
        
        const model = new ChatOpenAI({
            apiKey: process.env.OPENAI_API_KEY!,
            model: 'gpt-3.5-turbo', //Can choose better model
            temperature: 0,
        });

        // Prepare the input for the model
        console.log(question)
        const messages = [
            { role: 'user', content: question },
            { role: 'system', content: formattedPrompt}
        ];

        // Call the model with the correctly formatted messages
        const response = await model.call(messages);

        return Response.json({ answer: response.content }, { status: 200 });
}

