import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import path from 'path';
import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import { Enterprise } from '@/constants/Enterprise';



export const dynamic = 'force-dynamic';

const TEMPLATE = `You are tasked with answering user queries about social enterprises. Based on the context provided, return a list [ID1,ID2,...] where the IDs(which are numbers) are the IDs of the social enterprises that apply. If the answer is not in the context, reply politely that you do not have that information available.:
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
            return `ID: ${doc['eid']}: ${doc['enterpriseName']} is located in ${doc['location']}, offers ${doc['products']} and is a ${doc['format']}.`;
        }).join('\n');

        // Create the prompt using the TEMPLATE and context
        const prompt = PromptTemplate.fromTemplate(TEMPLATE);
        const formattedPrompt = await prompt.format({ context, question });
        console.log("Formatted Prompt:", formattedPrompt);
        
        const model = new ChatOpenAI({
            apiKey: process.env.OPENAI_API_KEY!,
            model: 'gpt-4o-mini', 
            // model:'gpt-3.5-turbo',
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

