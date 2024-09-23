import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import path from 'path';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
// import { JSONLoader } from "langchain/document_loaders/fs/json";


// Define type for social enterprise data
interface Enterprise {
    "ID": number, 
    "Enterprise Name": string;
    "URL Param": string;
    "Enterprise picture relative path": string;
    "Type of impact": string[];
    "Detailed impact": string;
    "Story title": string; 
    "Story": string;
    "Story picture relative path": string;
    "Format": string[];
    "Location": string[];
    "Region": string[];
    "Type of goods offered": string[];
    "Opening hours": string[];
    "Website": string;
    "logo image": string;
}

// const loader = new JSONLoader(
//     path.join(process.cwd(), 'public', 'data', 'social_enterprises.json'), // Path to social enterprises data
//     ["/ID", "/Enterprise Name", "/Location", "/Type of goods offered", "/Format"]
// );
// Temporarily read from file, but may obtain from MongoDB instead

export const dynamic = 'force-dynamic';

const TEMPLATE = `Answer the user's questions about social enterprises based only on the following context. Give the enterprises that apply
 by returning a list [ID1,ID2,...] where the IDs(which are numbers) are the IDs of the social enterprises that apply. Example: ID of Charitable Eats is 6.
 If the answer is not in the context, reply politely that you do not have that information available.:
==============================
Context: {context}
==============================
User: {question}
Assistant:`;




export async function POST(req: Request) {

        // Extract the question from the request body
        const { question } = await req.json();


       // Construct the full path to the JSON file in the public directory
        const filePath = path.join(process.cwd(), 'public', 'social_enterprises.json');
        
        // Read the file asynchronously
        const jsonData = await fs.readFile(filePath, 'utf-8');
        
        // Parse the JSON data
        const docs = JSON.parse(jsonData);
      
        // Create the context string from the loaded data
        const context = docs.map((doc: Enterprise) => {
            return `KEY ${doc['ID']}: ${doc['Enterprise Name']} is located in ${doc['Location']}, offers ${doc['Type of goods offered']} and is a ${doc['Format']}.`;
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
            { role: 'system', content: formattedPrompt},
            { role: 'user', content: question }
        ];

        // Call the model with the correctly formatted messages
        const response = await model.invoke(messages);

        return NextResponse.json({ answer: response.content }, { status: 200 });
}

