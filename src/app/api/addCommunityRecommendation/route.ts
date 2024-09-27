import connectToDB from "../../../../lib/mongodb";
import CommunityRecommendation from "../../../../models/communityRecommendation";
import { NextResponse } from "next/server";

// CREATE A NEW RECOMMENDATION
export async function POST(req: Request) {
  try {
    // Connect to MongoDB
    await connectToDB();

    // Parse the request body
    const body = await req.json();
    
    // Destructure necessary fields from the body
    const { emailInput, enterpriseNameInput, descriptionInput, enterpriseContactInput } = body;

    // Validate the incoming data
    if (!emailInput || !enterpriseNameInput || !descriptionInput || !enterpriseContactInput) {
      return NextResponse.json(
        { message: "Missing required fields: email, enterprise name, description, website/location" },
        { status: 400 }
      );
    }

    // Create a new entry in the community recommendations collection
    const newRecommendation = new CommunityRecommendation({
        enterpriseName: enterpriseNameInput,
        description: descriptionInput,
        website: enterpriseContactInput,
        numberOfLikes: 0,
        numberOfDislikes: 0,
        comments: [],
        emailAddress: emailInput
    });

 
    // Save the new recommendation to the database
    await newRecommendation.save();

    // Return the created recommendation as JSON
    return NextResponse.json(
      { message: "Recommendation created successfully", status: 201, recommendation: newRecommendation },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Cannot create recommendation", status: 500, error },
    );
  }
}
