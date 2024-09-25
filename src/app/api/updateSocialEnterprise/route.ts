// app/api/socialEnterprises/route.ts
import connectToDB from "../../../../lib/mongodb";
import SocialEnterprise from "../../../../models/socialEnterprise";
import { NextResponse, NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    await connectToDB();

    try {
        // Parse the request body
        const body = await request.json();
        
        const { eid, ...updateData } = body; // Extract eid and the data to update

        // Validate that eid is provided
        if (!eid) {
            return NextResponse.json({ error: "eid is required" }, { status: 400 });
        }

        // Update the document in the database
        const updatedEnterprise = await SocialEnterprise.findOneAndUpdate(
            { eid }, // Filter by eid
            updateData, // Update data
            { new: true } // Return the updated document
        );

        // Check if the document was found and updated
        if (!updatedEnterprise) {
            return NextResponse.json({ error: "Enterprise not found" }, { status: 404 });
        }

        // Return the updated document
        return NextResponse.json({message: "Success" }, { status: 200 });
    } catch (error) {
        console.error('Error updating enterprise:', error);
        return NextResponse.json({ error: "An error occurred while updating" }, { status: 500 });
    }
}
