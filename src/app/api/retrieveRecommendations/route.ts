// app/api/retrieveRecommendations/route.ts
import connectToDB from "../../../../lib/mongodb";
import Recommendation from "../../../../models/recommendation";
import { NextResponse } from "next/server";

// RETRIEVES ALL RECOMMENDATIONS
export async function GET() {
  try {
    // Connect to MongoDB
    await connectToDB();

    // // Fetch social enterprises
    const enterprises = await Recommendation.find();

    // Return the enterprises as JSON
    return NextResponse.json({enterprises});
  } catch (error) {
    return NextResponse.json(
      { message: "Cannot fetch recommendations", error },
      { status: 500 }
    );
  }
}
