'use client';

import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { CommunityRecommendation } from '@/constants/CommunityRecommendation';
import IndividualRecommendation from '@/components/recommend/IndividualRecommendation';


function ViewCommunityRecommendation() {
    const recommendationId = useParams()['uri'] as string;
    // const [loading, setLoading] = useState(true);
    const [communityRecommendation, setCommunityRecommendation] = useState<CommunityRecommendation | null>(null);


    useEffect(() => {
        const getRecommendationById = async (recommendationId:string) => {
            try {
                const response = await fetch(`/api/retrieveCommunityRecommendation?_id=${recommendationId}`);
                if (!response.ok) {
                    throw new Error('Cannot fetch recommendation');
                }
                const data = await response.json();
                return data.communityRecommendation;
            } catch (err) {
                console.error(err);
                return undefined;
            }
        };

        if (recommendationId) {
            const fetchCommunityRecommendation = async () => {
                const foundRecommendation = await getRecommendationById(recommendationId);
                setCommunityRecommendation(foundRecommendation || null);
                // setLoading(false);
            };

            fetchCommunityRecommendation();
        } else {
            // setLoading(false); // Handle case where id is not present
        }
    }, [recommendationId]);


 
    return (

        <div className='bg-good-goods-blue-100 p-8 h-screen flex flex-col justify-between'>
            <Navbar />
            {/* Body */}
            {/* {loading && (
            <div className='absolute inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center'>
                <div className='w-16 h-16 border-4 border-t-4 border-t-transparent border-white rounded-full animate-spin'></div>
            </div>)} */}
            
            {/* {!loading && communityRecommendation &&  */}
            <div className='flex flex-col justify-center p-4 space-y-16 mt-15vh'>
                {/* Community recommendation */}
                {
                   <IndividualRecommendation submission={{
                    enterpriseName: communityRecommendation?.enterpriseName || '',
                    description: communityRecommendation?.description || '',
                    website: communityRecommendation?.website || '',
                    comments: communityRecommendation?.comments.map((text, index) => ({
                        id: index + 1, // Start id from 1
                        text: text
                    })) || [],
                    numberOfDislikes: communityRecommendation?.numberOfDislikes || 0,
                    numberOfLikes: communityRecommendation?.numberOfLikes || 0
                }} />
                }
                
                    
                
            </div>
            {/* } */}


            <Footer />
        </div>
    );
}

export default ViewCommunityRecommendation;