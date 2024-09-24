'use client';

import enterprisesDetails from '../../../public/social_enterprises.json'
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
    "Story title": string,
    "Story": string;
    "Story picture relative path": string;
    "Format": string[];
    "Location": string[];
    "Region": string[];
    "Products": string[];
    "Opening hours": string[];
    "Website": string;
    "logo image": string;
    "Business Type": string;
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
            setTruncatedGoods(foundEnterprise === undefined ? [] : foundEnterprise["Products"].slice(0, 10));
            setLoading(false);
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
                            <span className="bg-blue-200 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                North
                            </span>
                        }

                        {enterprise["Region"].includes("South") && 
                            <span className="bg-blue-200 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                South
                            </span>
                        }

                        {enterprise["Region"].includes("East") && 
                            <span className="bg-blue-200 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                East
                            </span>
                        }

                        {enterprise["Region"].includes("West") && 
                            <span className="bg-blue-200 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                West
                            </span>
                        }

                        {enterprise["Region"].includes("North-East") && 
                            <span className="bg-blue-200 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                North-East
                            </span>
                        }

                        {enterprise["Region"].includes("North-West") && 
                            <span className="bg-blue-200 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                North-West
                            </span>
                        }

                        {enterprise["Region"].includes("South-East") && 
                            <span className="bg-blue-200 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                South-East
                            </span>
                        }

                        {enterprise["Region"].includes("South-West") && 
                            <span className="bg-blue-200 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-medium me-2 px-2.5 py-0.5 rounded-full ">
                                South-West
                            </span>
                        }
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
                </div>

              

                {/* Enterprise Goods */}
                <div id='goods-section' className="flex flex-col space-y-4">
                    <h2 className='text-good-goods-blue-900 font-semibold text-xl sm:text-2xl lg:text-3xl'>🛍️ What we sell</h2>

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
                            {enterprise["Type of impact"].map((impact, index) => (
                                <span key={ index } className="bg-good-goods-orange-900 text-good-goods-blue-900 text-xs sm:text-sm lg:text-lg font-semibold me-2 px-2.5 py-0.5 rounded-full ">🩵 { impact }</span> 
                            ))}
                        </div>
                    </div>
                   
                        
                    {/* Enterprise background and image */}
                    <div className='flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-start lg:items-center lg:space-x-8'>
                        <p className='text-gray-700 text-base sm:text-md lg:text-xl lg:w-3/5'>
                                {enterprise['Detailed impact'].split('\n').map((line, index) => (
                                    <span key={index}>{line}<br /><br /></span>
                                ))}
                        </p>

                        {/* Enterprise image */}
                        {enterprise["Enterprise picture relative path"] && !enterpriseImageError && 
                            <Image 
                                    src={enterprise["Enterprise picture relative path"]}
                                    alt={enterprise["Enterprise Name"]}
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


                {/* Story */}
                <div id='stories' className="flex flex-col space-y-4">
                    <h2 className='text-good-goods-blue-900 font-semibold text-xl sm:text-2xl lg:text-3xl'>📖 Our Stories</h2>

                    {/* Story card */}
                    <div className='flex flex-row flex-wrap gap-x-4 gap-y-4'>
                        <div className="max-w-lg bg-white border border-gray-200 rounded-xl shadow">
                            {enterprise['Story picture relative path'] && !storyImageError ? (
                                <Image 
                                    src={enterprise['Story picture relative path']}
                                    alt={`Image of employee for ${enterprise['Enterprise Name']}`}
                                    className='rounded-t-lg w-full'
                                    width='100'
                                    height='100'
                                    layout="responsive"
                                    onError={() => setStoryImageError(true)}
                                />
                                ) : (
                                    <div className="flex-none md:w-1/2" style={{ minHeight: '24rem' }} />
                            )}
                            <div className="p-5">
                                <a href="#">
                                    <h5 className="mb-2 text-xl font-bold tracking-tight text-black">{ enterprise['Story title'] }</h5>
                                </a>
                                <p className="mb-3 font-normal text-gray-700">{ enterprise['Story'] }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}


            <Footer />
        </div>
    );
}

export default EnterprisePage;