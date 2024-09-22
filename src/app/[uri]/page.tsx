'use client';

import enterprisesDetails from '../../constants/social_enterprises.json';
import EnterpriseLocation from '@/components/enterprises/EnterpriseLocation';
import Footer from "@/components/common/Footer";
import Image from "next/image";
import Navbar from "@/components/common/Navbar";
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Enterprise {
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
                    {enterprise["Enterprise picture relative path"] && !enterpriseImageError && 
                    <a href={enterprise['Website']} className='relative w-full h-96 overflow-hidden rounded-lg'>
                    <Image 
                            src={enterprise["Enterprise picture relative path"]}
                            alt={enterprise["Enterprise Name"]}
                            className='object-cover rounded-lg'
                            fill
                            style={{ objectFit: 'cover' }}
                            onError = {() => {
                                console.log('Enterprise pictuure reelative path invalid.');
                                setenterpriseImageError(true);
                            }}
                    />
                    </a>}

                    {/* Enterprise Name */}
                    <div>
                        <a 
                            href={enterprise['Website']} 
                            className='text-good-goods-blue-900 font-semibold text-4xl sm:text-5xl lg:text-6xl'
                            style={{ 
                                display: 'inline-block', 
                                whiteSpace: 'nowrap',  
                                overflow: 'hidden', 
                                textOverflow: 'ellipsis', 
                                maxWidth: '100%', 
                                lineHeight: '1.2', 
                                padding: '0.25rem 0'
                            }}
                        >
                            {enterprise['Enterprise Name']}
                        </a>
                    </div>

                    {/* Enterprise Stores */}
                    <div className="flex space-x-2">
                        {enterprise["Format"].includes("Physical") && (
                            <span 
                                className="bg-indigo-100 text-indigo-800 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-indigo-900 dark:text-indigo-300"
                                onClick={() => document.getElementById('goods-section')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                Physical
                            </span>
                        )}

                        {enterprise["Format"].includes("Online") && (
                            <a 
                                href={enterprise['Website']} 
                                rel="noopener noreferrer"
                                className="bg-gray-100 text-gray-800 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-gray-900 dark:text-gray-300"
                            >
                                Online
                            </a>
                        )}

                        {/* Enterprise Regions */}
                        {enterprise["Region"].includes("North") && 
                            <span 
                                className="bg-red-100 text-red-800 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
                            >
                                North
                            </span>
                        }

                        {enterprise["Region"].includes("South") && 
                            <span 
                                className="bg-red-100 text-red-800 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300"
                            >
                                South
                            </span>
                        }

                        {enterprise["Region"].includes("East") && 
                            <span 
                                className="bg-green-100 text-green-800 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
                            >
                                East
                            </span>
                        }

                        {enterprise["Region"].includes("West") && 
                            <span 
                                className="bg-green-100 text-green-800 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300"
                            >
                                West
                            </span>
                        }

                        {enterprise["Region"].includes("North-East") && 
                            <span 
                                className="bg-purple-100 text-purple-800 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300"
                            >
                                North-East
                            </span>
                        }

                        {enterprise["Region"].includes("North-West") && 
                            <span 
                                className="bg-purple-100 text-purple-800 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300"
                            >
                                North-West
                            </span>
                        }

                        {enterprise["Region"].includes("South-East") && 
                            <span 
                                className="bg-yellow-100 text-yellow-800 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300"
                            >
                                South-East
                            </span>
                        }

                        {enterprise["Region"].includes("South-West") && 
                            <span 
                                className="bg-yellow-100 text-yellow-800 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300"
                            >
                                South-West
                            </span>
                        }
                    </div>


                    {/* Enterprise Goods */}
                    <div id='goods-section' className="flex flex-wrap max-w-[75%]">
                        {truncatedGoods.map((good, index) => (
                            <span 
                                key={index} 
                                className="bg-blue-100 text-blue-800 text-xs sm:text-sm lg:text-lg font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300 mr-2 mb-2 overflow-hidden whitespace-nowrap text-ellipsis"
                                style={{ maxWidth: '300px' }}
                                title={good}
                            >
                                {good}
                            </span>
                        ))}
                    </div>
                    
                    {/* Render Locations with Opening Hours */}
                    <div id="locations-section" className='space-y-1'>
                        {enterprise["Location"].map((location, index) => (
                            <EnterpriseLocation 
                                key={index} 
                                name={enterprise["Enterprise Name"]}
                                address={location} 
                                openingHours={enterprise["Opening hours"][index]} 
                            />
                        ))}
                    </div>

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