// app/api/socialEnterprises/route.ts
import connectToDB from "../../../../lib/mongodb";
import SocialEnterprise from "../../../../models/socialEnterprise";
import { NextResponse, NextRequest } from "next/server";


export async function GET(request:NextRequest) {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');

    if (!name) {
        return NextResponse.json({ error: 'No name provided' }, { status: 400 });
    }

    try {
        const enterprise = await SocialEnterprise.findOne({ urlParam: name }).select('-plot_embedding');

        if (!enterprise) {
            return NextResponse.json({ enterprise: null }, { status: 404 }); // Return 404 if not found
        }

        return NextResponse.json({ enterprise: JSON.parse(JSON.stringify(enterprise)) });
    } catch (error) {
        console.error('Error fetching enterprise:', error);
        return NextResponse.json({ error: 'Error fetching enterprise' }, { status: 500 });
    }
}
