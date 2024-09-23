'use client';

import enterprisesDetails from '../../constants/social_enterprises.json';
import EnterpriseLocation from '@/components/enterprises/EnterpriseLocation';
import Footer from "@/components/common/Footer";
import Image from "next/image";
import Navbar from "@/components/common/Navbar";
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

export interface Enterprise {
    "ID": number, 
    "Enterprise Name": string;
    "URL Param": string;
    "Enterprise picture relative path": string;
    "Type of impact": string[];
    "Detailed impact": string;
    "Story": string;
    "Story picture relative path": string;
    "Format": string[];
    "Location": string[];
    "Region": string[];
    "Type of goods offered": string[];
    "Opening hours": string[];
    "Website": string;
    "logo image": string;
}

function getEnterpriseByParam(param: string) {
    return enterprisesDetails.find(enterprise => enterprise["URL Param"] === param);
}

function EnterprisePage() {
    // Name of field (uri in this case) should be the same as the name of directory this file is in.
    const enterpriseName = useParams()['uri'];
    const [loading, setLoading] = useState(true);
    const [enterprise, setEnterprise] = useState<Enterprise | null>(null);
    const [enterpriseImageError, setenterpriseImageError] = useState(false);
    const [storyImageError, setStoryImageError] = useState(false);
    const [truncatedGoods, setTruncatedGoods] = useState<string[]>([]);

    useEffect(() => {
        if (enterpriseName) {
            const foundEnterprise = Array.isArray(enterpriseName)
                ? getEnterpriseByParam(enterpriseName[0])
                : getEnterpriseByParam(enterpriseName);
            setEnterprise(foundEnterprise || null);
            setTruncatedGoods(foundEnterprise === undefined ? [] : foundEnterprise["Type of goods offered"].slice(0, 10));
            setLoading(false);
        }
    }, [enterpriseName]);

    return (
        <div className='bg-good-goods-blue-100 p-8 h-screen flex flex-col justify-between'>
            <Navbar />
            {/* Body */}
            {!loading && enterprise && 
            <div className='flex flex-col justify-center p-4 space-y-16 mt-15vh'>
                <div className='flex flex-col justify-center space-y-8'>
                    {/* Enterprise Image */}
                    {/* {enterprise["Enterprise picture relative path"] && !enterpriseImageError && 
                    <a href={enterprise['Website']} className='relative w-full h-96 overflow-hidden rounded-lg'>
                    <Image 
                            src={enterprise["Enterprise picture relative path"]}
                            alt={enterprise["Enterprise Name"]}
                            className='object-cover rounded-lg'
                            fill
                            style={{ objectFit: 'cover' }}
                            onError = {() => {
                                console.log('Enterprise picture relative path invalid.');
                                setenterpriseImageError(true);
                            }}
                    />
                    </a>} */}

                    {/* Enterprise Information */}
                    <div className='flex flex-col justify-center space-y-8'>
                        <div className='flex flex-row justify-between'>
                            {/* Name and website */}
                            <h1 className='text-good-goods-blue-900 font-semibold text-2xl sm:text-3xl lg:text-4xl'>{enterprise['Enterprise Name']}</h1>
                            <a href={enterprise['Website']} className='w-fit' target='_blank'>
                                <button className='rounded-full w-full text-semibold text-sm md:text-base text-white bg-good-goods-blue-900 hover:bg-sky-700 py-2 px-8 duration-200'>Visit Site</button>
                            </a>
                        </div>

                        {/* Location */}
                        <div className='flex flex-row justify-start flex-wrap gap-y-2'>
                            {enterprise["Format"].includes("Physical") && (
                                <span className="bg-sky-200 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                    Physical
                                </span>
                            )}

                            {enterprise["Format"].includes("Online") && (
                                <span className="bg-sky-200 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                 Online
                                </span> 
                            )}

                            {/* Enterprise Regions */}
                            {enterprise["Region"].includes("North") && 
                                <span className="bg-orange-300 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                    North
                                </span>
                            }

                            {enterprise["Region"].includes("South") && 
                                <span className="bg-orange-300 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                    South
                                </span>
                            }

                            {enterprise["Region"].includes("East") && 
                                <span className="bg-orange-300 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                    East
                                </span>
                            }

                            {enterprise["Region"].includes("West") && 
                                <span className="bg-orange-300 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                    West
                                </span>
                            }

                            {enterprise["Region"].includes("North-East") && 
                                <span className="bg-orange-300 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                    North-East
                                </span>
                            }

                            {enterprise["Region"].includes("North-West") && 
                                <span className="bg-orange-300 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                    North-West
                                </span>
                            }

                            {enterprise["Region"].includes("South-East") && 
                                <span className="bg-orange-300 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                    South-East
                                </span>
                            }

                            {enterprise["Region"].includes("South-West") && 
                               <span className="bg-orange-300 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                    South-West
                                </span>
                            }










































                        </div>



                        
                    </div>

                </div>

                {/* Render Locations with Opening Hours */}
                <div id="locations-section" className='space-y-1 flex flex-row justify-start items-center flex-wrap gap-y-2 gap-x-4'>
                        {enterprise["Location"].map((location, index) => (
                            <EnterpriseLocation 
                                key={index} 
                                name={enterprise["Enterprise Name"]}
                                address={location} 
                                openingHours={enterprise["Opening hours"][index]} 
                            />
                        ))}
                </div>

                {/* Enterprise Goods */}
                <div id='goods-section' className="flex flex-col space-y-4">
                    <h1 className='text-good-goods-blue-900 font-semibold text-xl sm:text-2xl lg:text-3xl'>🛍️ What we sell</h1>

                    <div className='flex flex-wrap gap-x-4 gap-y-2'>
                        {truncatedGoods.map((good, index) => (
                            <div key={index}  className='rounded-xl bg-white text-black px-8 py-4 font-semibold text-base lg:text-lg'>{ good }</div>
                        ))}
                    </div>
                </div>






                    {/* Enterprise Stores */}
                    <div className="flex space-x-2">
                        

                    
                    
                    

                    {/* Enterprise Impact */}
                    <p className='text-good-goods-blue-900 text-l sm:text-xl lg:text-2xl' style={{ textAlign: 'justify' }}>
                        {enterprise['Detailed impact'].split('\n').map((line, index) => (
                            <span key={index}>{line}<br /><br /></span>
                        ))}
                    </p>

                    {/* Visit Line */}
                    <p className='text-good-goods-blue-900 text-m sm:text-xl lg:text-2xl'>
                        Visit <a href={enterprise['Website']} className='text-blue-500 underline text-m sm:text-xl lg:text-2xl'>{enterprise['Enterprise Name']}</a> now!
                    </p>

                    <p className='text-good-goods-blue-900 font-semibold text-2xl sm:text-3xl lg:text-4xl'>Meet our staff!</p>

                    {/* Enterprise Story Container */}
                    <div className="flex flex-col md:flex-row items-start">
                        <div className="flex-1 md:w-1/2">
                            <p className='text-good-goods-blue-900 text-m sm:text-l lg:text-xl' style={{ textAlign: 'justify' }}>
                                {enterprise['Story'].split('\n').map((line, index) => (
                                    <span key={index}>{line}<br /><br /></span>
                                ))}
                            </p>
                        </div>
                        {enterprise['Story picture relative path'] && !storyImageError ? (
                            <div className="flex-none md:w-1/2 h-96 relative ml-4"> 
                                <Image 
                                    src={enterprise['Story picture relative path']}
                                    alt={`Image of employee for ${enterprise['Enterprise Name']}`}
                                    className='object-cover rounded-lg'
                                    fill
                                    style={{ borderRadius: '0.5rem' }}
                                    onError={() => setStoryImageError(true)}
                                />
                            </div>
                        ) : (
                            <div className="flex-none md:w-1/2" style={{ minHeight: '24rem' }} />
                        )}
                    </div>

                    {/* Areas of Impact Section */}
                    <div className="mt-8">
                        <h2 className='text-good-goods-blue-900 font-semibold text-2xl sm:text-3xl lg:text-4xl'>
                            What we do
                        </h2>
                        <ul className="list-disc pl-5 mt-2 text-good-goods-blue-900 text-lg sm:text-xl lg:text-2xl">
                            {enterprise["Type of impact"].map((impact, index) => (
                                <li key={index}>{impact}</li>
                            ))}
                        </ul>
                    </div>

                </div>
            </div>}
            <Footer />
        </div>
    );
}

export default EnterprisePage;