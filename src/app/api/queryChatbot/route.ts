import { ChatOpenAI } from '@langchain/openai';
import { PromptTemplate } from '@langchain/core/prompts';
import { NextResponse } from 'next/server';
import { Enterprise } from '@/constants/Enterprise';
import connectToDB from "../../../../lib/mongodb";
import SocialEnterprise from "../../../../models/socialEnterprise";



export const dynamic = 'force-dynamic';

const TEMPLATE = `You are tasked with answering user queries about social enterprises. Based on the context provided, return a list [ID1,ID2,...] where the IDs(which are numbers) are the IDs of the social enterprises that apply. If the answer is not in the context, reply politely that you do not have that information available.:
==============================
Context: {context}
==============================
User: {question}
Assistant:`;




export async function POST(req: Request) {
    //Get social enterprises data from MongoDB
    let enterprises: Enterprise[] = [];
    
    try {
        // Connect to MongoDB
        await connectToDB();
    
        //Fetch social enterprises
        enterprises = (await SocialEnterprise.find().lean()).map((enterprise: any) => {
            return {
            "eid": enterprise.eid,
            "enterpriseName": enterprise.enterpriseName,
            "urlParam": enterprise.urlParam,
            "enterprisePictureRelativePath": enterprise.enterprisePictureRelativePath,
            "typeOfImpact": enterprise.typeOfImpact,
            "detailedImpact": enterprise.detailedImpact,
            "format": enterprise.format,
            "location": enterprise.location,
            "region": enterprise.region,
            "products": enterprise.products,
            "openingHours": enterprise.openingHours,
            "website": enterprise.website,
            "logoImage": enterprise.logoImage,
            "businessType": enterprise.businessType
        };
        });
      } catch (error) {
        enterprises = [];
      }



        // Extract the question from the request body
        const { question } = await req.json();


    
        // Create the context string from the loaded data
        const context = enterprises.map((enterprise: any) => {
            return `ID ${enterprise['eid']}: ${enterprise['enterpriseName']} is located in ${enterprise['location']}, offers ${enterprise['products']} and is a ${enterprise['format']}.`;
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

