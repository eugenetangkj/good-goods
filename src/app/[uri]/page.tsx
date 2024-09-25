'use client';

import enterprisesDetails from '../../../public/social_enterprises.json'
import EnterpriseLocation from '@/components/enterprises/EnterpriseLocation';
import Footer from "@/components/common/Footer";
import Image from "next/image";
import Navbar from "@/components/common/Navbar";
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Enterprise } from '@/constants/Enterprise';



function EnterprisePage() {
    // Name of field (uri in this case) should be the same as the name of directory this file is in.
    const enterpriseName = useParams()['uri'] as string;
    const [loading, setLoading] = useState(true);
    const [enterprise, setEnterprise] = useState<Enterprise | null>(null);
    const [enterpriseImageError, setenterpriseImageError] = useState(false);
    const [truncatedGoods, setTruncatedGoods] = useState<string[]>([]);


    useEffect(() => {
        const getEnterpriseByParam = async (name:string) => {
            try {
                const response = await fetch(`/api/retrieveSocialEnterprise?name=${name}`); // Adjust the endpoint as needed
                if (!response.ok) {
                    throw new Error('Failed to fetch enterprise data');
                }
                const data = await response.json();
                return data.enterprise; // Assuming your API returns the enterprise object
            } catch (err) {
                console.error(err);
                return undefined;
            }
        };

        if (enterpriseName) {
            const fetchEnterprise = async () => {
                const foundEnterprise = await getEnterpriseByParam(enterpriseName);
                setEnterprise(foundEnterprise || null);
                setTruncatedGoods(foundEnterprise ? foundEnterprise.products.slice(0, 10) : []);
                setLoading(false);
            };

            fetchEnterprise();
        } else {
            setLoading(false); // Handle case where enterpriseName is not present
        }
    }, [enterpriseName]);

  
    return (
        <div className='bg-good-goods-blue-100 p-8 h-screen flex flex-col justify-between'>
            <Navbar />
            {/* Body */}
            {!loading && enterprise && 
            <div className='flex flex-col justify-center p-4 space-y-16 mt-15vh'>
                {/* Enterprise Information */}
                <div className='flex flex-col justify-center space-y-8'>
                    <div className='flex flex-row justify-between'>
                        {/* Name and website */}
                        <h1 className='text-good-goods-blue-900 font-semibold text-2xl sm:text-3xl lg:text-4xl'>{enterprise['enterpriseName']}</h1>
                        <a href={enterprise['website']} className='w-fit' target='_blank'>
                            <button className='rounded-full w-full text-semibold text-sm md:text-base text-white bg-good-goods-blue-900 hover:bg-sky-700 py-2 px-8 duration-200'>Visit Site</button>
                        </a>
                    </div>

                    {/* Location */}
                    <div className='flex flex-row justify-start flex-wrap gap-y-2'>
                        {enterprise["format"].includes("Physical") && (
                            <span className="bg-sky-200 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                Physical
                            </span>
                        )}

                        {enterprise["format"].includes("Online") && (
                            <span className="bg-sky-200 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                Online
                            </span> 
                        )}

                        {/* Enterprise regions */}
                        {enterprise["region"].includes("North") && !(enterprise["format"].length === 1 && enterprise["format"][0] === "Online") &&
                            <span className="bg-blue-200 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                North
                            </span>
                        }

                        {enterprise["region"].includes("South") && !(enterprise["format"].length === 1 && enterprise["format"][0] === "Online") &&
                            <span className="bg-blue-200 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                South
                            </span>
                        }

                        {enterprise["region"].includes("East") && !(enterprise["format"].length === 1 && enterprise["format"][0] === "Online") &&
                            <span className="bg-blue-200 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                East
                            </span>
                        }

                        {enterprise["region"].includes("West") && !(enterprise["format"].length === 1 && enterprise["format"][0] === "Online") &&
                            <span className="bg-blue-200 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                West
                            </span>
                        }

                        {enterprise["region"].includes("North-East") && !(enterprise["format"].length === 1 && enterprise["format"][0] === "Online") &&
                            <span className="bg-blue-200 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                North-East
                            </span>
                        }

                        {enterprise["region"].includes("North-West") && !(enterprise["format"].length === 1 && enterprise["format"][0] === "Online") &&
                            <span className="bg-blue-200 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                North-West
                            </span>
                        }

                        {enterprise["region"].includes("South-East") && !(enterprise["format"].length === 1 && enterprise["format"][0] === "Online") &&
                            <span className="bg-blue-200 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                South-East
                            </span>
                        }

                        {enterprise["region"].includes("South-West") && !(enterprise["format"].length === 1 && enterprise["format"][0] === "Online") &&
                            <span className="bg-blue-200 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                South-West
                            </span>
                        }
                    </div> 

                    {/* Render Locations with Opening Hours */}
                    <div id="locations-section" className='space-y-1 flex flex-row justify-start items-center flex-wrap gap-y-2 gap-x-4'>
                            {enterprise["location"].map((location, index) => (
                                <EnterpriseLocation 
                                    key={index} 
                                    name={enterprise["enterpriseName"]}
                                    address={location} 
                                    openingHours={enterprise["openingHours"][index]} 
                                />
                            ))}
                    </div>
                </div>

              

                {/* Enterprise Goods */}
                <div id='goods-section' className="flex flex-col space-y-4">
                    <h2 className='text-good-goods-blue-900 font-semibold text-xl sm:text-2xl lg:text-3xl'>🛍️ Some items that we sell</h2>

                    <div className='flex flex-wrap gap-x-4 gap-y-2'>
                        {truncatedGoods.map((good, index) => (
                            <div key={index}  className='rounded-xl bg-white text-black p-4 font-semibold text-base lg:text-lg'>{ good }</div>
                        ))}
                    </div>
                </div>

                {/* About Enterprise With Image */}
                <div className='flex flex-col space-y-8'>
                    <div className='space-y-4'>
                        {/* About title */}
                        <h2 className='text-good-goods-blue-900 font-semibold text-xl sm:text-2xl lg:text-3xl'>👋 Who are we</h2>

                        {/* Impact areas */}
                        <div className='flex justify-start items-center flex-wrap gap-y-2 gap-x-4'>
                            {enterprise["typeOfImpact"].map((impact, index) => (
                                <span key={ index } className="bg-good-goods-orange-900 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-semibold me-2 px-2.5 py-0.5 rounded-full ">🩵 { impact }</span> 
                            ))}
                        </div>
                    </div>
                   
                        
                    {/* Enterprise background and image */}
                    <div className='flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-start lg:items-center lg:space-x-8'>
                        <p className='text-gray-700 text-base sm:text-md lg:text-xl lg:w-3/5'>
                                {enterprise['detailedImpact'].split('\\n').map((line, index) => (
                                    <span key={index}>{line}<br /><br /></span>
                                ))}
                        </p>

                        {/* Enterprise image */}
                        {enterprise["enterprisePictureRelativePath"] && !enterpriseImageError && 
                            <Image 
                                    src={enterprise["enterprisePictureRelativePath"]}
                                    alt={enterprise["enterpriseName"]}
                                    className='relative max-w-112 h-60 sm:h-80 overflow-hidden rounded-xl w-3/4 lg:w-2/5'
                                    width={ 150 }
                                    height={ 150 }
                                    layout="responsive"
                                    onError = {() => {
                                        console.log('Enterprise picture relative path invalid.');
                                        setenterpriseImageError(true);
                                    }}
                            />
                        }
                    </div>
                </div>
            </div>}


            <Footer />
        </div>
    );
}

export default EnterprisePage;