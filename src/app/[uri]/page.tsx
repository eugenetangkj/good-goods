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
    "Format": string;
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
    const [imageError, setImageError] = useState(false);
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
                    {enterprise["Enterprise picture relative path"] && !imageError && 
                    <a href={enterprise['Website']} className='relative w-full h-96 overflow-hidden rounded-lg'>
                    <Image 
                            src={enterprise["Enterprise picture relative path"]}
                            alt={enterprise["Enterprise Name"]}
                            className='object-cover rounded-lg'
                            fill
                            style={{ objectFit: 'cover' }}
                            onError = {() => {
                                console.log('Enterprise pictuure reelative path invalid.');
                                setImageError(true);
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
                            }}
                        >
                            {enterprise['Enterprise Name']}
                        </a>
                    </div>

                    {/* Enterprise Goods */}
                    <div className="flex flex-wrap max-w-[75%]">
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
                    <div className='space-y-1'>
                        {enterprise["Location"].map((location, index) => (
                            <EnterpriseLocation 
                                key={index} 
                                address={location} 
                                openingHours={enterprise["Opening hours"][index]} 
                            />
                        ))}
                    </div>

                    {/* Enterprise Impact */}
                    <p className='text-good-goods-blue-900 text-l sm:text-2xl lg:text-3xl' style={{ textAlign: 'justify' }}>
                        {enterprise['Detailed impact'].split('\n').map((line, index) => (
                            <span key={index}>{line}<br /><br /></span>
                        ))}
                    </p>
                    {/* Visit Line */}
                    <p className='text-good-goods-blue-900'>
                        Visit <a href={enterprise['Website']} className='text-blue-500 underline'>{enterprise['Enterprise Name']}</a> now!
                    </p>

                    {/* Render Locations with Opening Hours */}
                    <div className='space-y-1'>
                        {enterprise["Location"].map((location, index) => (
                            <EnterpriseLocation 
                                key={index} 
                                address={location} 
                                openingHours={enterprise["Opening hours"][index]} 
                            />
                        ))}
                    </div>
                </div>
            </div>}
            <Footer />
        </div>
    );
}

export default EnterprisePage;