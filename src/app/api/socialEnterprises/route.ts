// app/api/social-enterprises/route.js


import connectToDB from "../../../../lib/mongodb";
import SocialEnterprise from "../../../../models/socialEnterprise";
import { NextResponse } from "next/server";

// RETRIEVES ALL SOCIAL ENTERPRISES
export async function GET() {
  try {
    // Connect to MongoDB
    await connectToDB();

    // // Fetch social enterprises
    const enterprises = await SocialEnterprise.find();
    console.log(enterprises);

    // Return the enterprises as JSON
    return NextResponse.json({enterprises});
  } catch (error) {
    return NextResponse.json(
      { message: "Cannot fetch social enterprises", error },
      { status: 500 }
    );
  }
}
