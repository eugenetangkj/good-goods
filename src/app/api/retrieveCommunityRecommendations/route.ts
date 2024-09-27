// app/api/retrieveRecommendations/route.ts
import connectToDB from "../../../../lib/mongodb";
import CommunityRecommendation from "../../../../models/communityRecommendation";
import { NextResponse } from "next/server";

// https://github.com/vercel/next.js/discussions/61884
export const revalidate = 0;

// RETRIEVES ALL RECOMMENDATIONS
export async function GET() {
  try {
    // Connect to MongoDB
    await connectToDB();

    // // Fetch recommendations
    const recommendations = await CommunityRecommendation.find();
    console.log(recommendations);


    // Return the enterprises as JSON
    return NextResponse.json({recommendations});
  } catch (error) {
    return NextResponse.json(
      { message: "Cannot fetch community recommendations", error },
      { status: 500 }
    );
  }
}
