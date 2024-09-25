// src/app/api/generateEmbeddings/route.ts
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { MongoClient } from 'mongodb';

//Initialise MongoDB and OpenAI
const client = new MongoClient(process.env.MONGODB_URI as string);
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY,});

type Embedding = {
    eid: number;
    embedding: number[];  // Array of numbers representing the embedding vector
};

async function generateEmbeddings() {
    await client.connect();
    const db = client.db('goodgoods');
    const enterprises = await db.collection('socialenterprises').find().toArray();

    const batchSize = 3; // Number of embeddings to generate per API call
    const embeddings: Embedding[] = [];

    for (let i = 0; i < enterprises.length; i += batchSize) {
        const batch = enterprises.slice(i, i + batchSize);
        
        // Create combined text for each enterprise in the batch
        const combinedTexts = batch.map(enterprise => {
            // Combine key fields to represent the full enterprise information in text format
            return `
                Enterprise Name: ${enterprise.enterpriseName}
                Location: ${enterprise.location.join(", ")}
                Products: ${enterprise.products.join(", ")}
                Type of Impact: ${enterprise.typeOfImpact.join(", ")}
                Business Type: ${enterprise.businessType}
                Format: ${enterprise.format.join(", ")}
            `;
        });
        

        // Generate embeddings for the current batch
        const response = await openai.embeddings.create({
            input: combinedTexts,
            model: 'text-embedding-3-small',
        });

        // Collect embeddings with corresponding enterprise IDs
        // response.data.forEach((embedding, index) => {
        //     embeddings.push({
        //         eid: batch[index].eid,
        //         embedding: embedding.embedding, // Adjust based on the OpenAI response structure
        //     });
        // });

        // Collect embeddings and update corresponding documents
        for (let index = 0; index < response.data.length; index++) {
            const embedding = response.data[index].embedding;
            const enterprise = batch[index];

            // Update the enterprise document with the new embedding field
            await db.collection('socialenterprises').updateOne(
                { eid: enterprise.eid },  // Match by `eid` or another unique identifier
                { $set: { plot_embedding: embedding } }  // Add embedding field
            );
        }
    }

    // Store embeddings in a new collection
    console.log('Embeddings stored successfully');
}




export async function GET() {
    try {
      await generateEmbeddings();
      return NextResponse.json({ message: 'Embeddings generated and stored successfully!' }); // Success response
    } catch (error) {
      console.error("Error generating embeddings:", error);
      return NextResponse.error(); // Handle error response
    }
}
