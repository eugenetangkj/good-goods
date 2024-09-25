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

// FIND SOCIAL ENTERPRISE GIVEN NAME
export async function POST(request: Request) {
    await connectToDB(); // Ensure the DB is connected
  
    try {
      // Extract the enterprise name from the request body
      const { enterpriseName } = await request.json();
  
      // Find the enterprise by name in the database
      const enterprise = await SocialEnterprise.findOne({ enterpriseName });
  
      // Check if the enterprise was found
      if (!enterprise) {
        return NextResponse.json({ message: 'Enterprise not found' }, { status: 404 });
      }
      // Return the found enterprise
      return NextResponse.json(enterprise, { status: 200 });
    } catch (error) {
      console.error('Error fetching enterprise:', error);
      return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
  }

