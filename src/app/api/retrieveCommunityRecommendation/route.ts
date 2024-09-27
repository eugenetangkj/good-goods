import { NextRequest, NextResponse } from 'next/server';
import connectToDB from '../../../../lib/mongodb';
import CommunityRecommendation from '../../../../models/communityRecommendation';
import mongoose from 'mongoose';

export async function GET(request: NextRequest) {
    await connectToDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('_id');

    if (!id) {
        return NextResponse.json({ error: 'No id provided' }, { status: 400 });
    }

    try {
        // Convert string ID to ObjectId
        const objectId = new mongoose.Types.ObjectId(id);

        const communityRecommendation = await CommunityRecommendation.findOne({ _id: objectId });


        if (!communityRecommendation) {
            return NextResponse.json({ communityRecommendation: null }, { status: 404 });
        }

        return NextResponse.json({ communityRecommendation: JSON.parse(JSON.stringify(communityRecommendation)) });
    } catch (error) {
        console.error('Error fetching community recommendation:', error);
        return NextResponse.json({ error: 'Error fetching community recommendation' }, { status: 500 });
    }
}
