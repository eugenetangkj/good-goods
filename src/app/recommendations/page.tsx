"use client"

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useState, useEffect } from "react";
import { CommunityRecommendation } from "@/constants/CommunityRecommendation";
import Link from "next/link";
import { FaRegThumbsDown, FaRegThumbsUp } from "react-icons/fa";


//View recommendations made by other people
export default function Recommendations() {
  //List of recommendations to display
  const [communityRecommendations, setCommunityRecommendations] = useState<CommunityRecommendation[]>([]);
  const [areRecommendationsLoading, setAreRecommendationsLoading] = useState(true);


  //Populate data when page loads
  useEffect(() => {
    // Function to fetch data from the API
    const fetchRecommendations = async () => {
      try {
        // setAreRecommendationsLoading(true);
        const response = await fetch("/api/retrieveCommunityRecommendations");
        if (!response.ok) {
          throw new Error("Cannot get recommendations");
        }
        const data = await response.json(); // Convert response to JSON
        console.log(data);
        setAreRecommendationsLoading(false)
        setCommunityRecommendations(data["recommendations"] || []);

      } catch (error) {
            setAreRecommendationsLoading(false);
            setCommunityRecommendations([]); //Just return no recommendation
      } finally {
      }
    };
    fetchRecommendations();
}, []);


  return (
    <div className='bg-good-goods-blue-100 p-8 h-screen flex flex-col justify-between'>
      <div className='flex flex-col justify-start'>
        <Navbar />

        {(areRecommendationsLoading)
        ?
            (<div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
            <div className="w-16 h-16 border-4 border-t-4 border-t-transparent border-white rounded-full animate-spin"></div>
            </div>)
        :
        
        
        <div className='flex flex-col justify-center p-4 space-y-16 mt-12.5vh'>
          <div className='flex flex-col justify-center space-y-8'>
            {/* Title and add recommendation button */}
            <div className='flex flex-row flex-wrap items-center'>
              <h2 className='text-good-goods-blue-900 font-semibold text-2xl sm:text-3xl lg:text-4xl sm:w-3/4'>Community-Recommended Social Enterprises for Good Goods</h2>
              <a href='/recommendations/recommend'>
                <div className="mt-4 text-white bg-good-goods-blue-900 hover:bg-sky-700 rounded-full text-sm w-full sm:w-auto px-5 sm:px-8 py-2.5 text-center self-end duration-200">Add Recommendation</div>
              </a>         
            </div>

            {/* Sub heading */}
            <h5 className='text-sm md:text-base'>Upvote community-recommended social enterprises to be featured in Good Goods!</h5>

            {/* Recommendations List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2.5xl:grid-cols-4 gap-8 w-fit self-center">
                {communityRecommendations.map((recommendation) => (

                    <Link key={recommendation._id} href={`./recommendations/${recommendation['_id']}`} passHref>  
                    <div className="cursor-pointer p-4 sm:p-6 space-y-4 bg-white rounded-xl card w-72 h-72 lg:w-96 lg:h-56 flex flex-col justify-start lg:flex-row space-x-4">
                            
                            {/* Store name and Description */}
                            <div className="flex flex-col space-y-4 w-full">
                                <h5 className="text-xl xl:text-1.5xl font-semibold text-good-goods-blue-900">
                                    {recommendation['enterpriseName']}
                                </h5>
                                <p className="text-sm xl:text-base line-clamp-4">
                                    {recommendation['description']}
                                </p>

                                {/* Likes and Dislikes */}
                                <div className='w-full flex flex-row justify-end self-end'>
                                {/* Likes */}
                                <div className="text-blue-700 border font-medium rounded-full text-sm p-2.5 text-center flex flex-row justify-center items-center duration-200 border-none space-x-1">
                                  <FaRegThumbsUp />
                                  <h6 className='text-gray-700 font-semibold'>{recommendation['numberOfLikes']}</h6>
                                </div>

                                {/* Dislikes */}
                                <div className="text-gray-500 border font-medium rounded-full text-sm p-2.5 text-center flex flex-row justify-center items-center duration-200 border-none space-x-1">
                                  <FaRegThumbsDown />
                                  <h6 className='text-gray-700 font-semibold'>{recommendation['numberOfDislikes']}</h6>
                                </div>

                                </div>

                                
                               
                            </div>
                    </div>
                    </Link>
                ))}
            </div>


            
            
          </div>
      </div>
    }
     

      <Footer />
      </div>
    </div>


    
  );
}
