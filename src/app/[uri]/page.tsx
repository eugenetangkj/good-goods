'use client';

import enterprisesDetails from '../../constants/social_enterprises.json';
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
    "Opening hours": string;
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

    useEffect(() => {
        if (enterpriseName) {
            const foundEnterprise = Array.isArray(enterpriseName)
                ? getEnterpriseByParam(enterpriseName[0])
                : getEnterpriseByParam(enterpriseName);
            setEnterprise(foundEnterprise || null);
            setLoading(false);
        }
    }, [enterpriseName]);

    return (
        <div className='bg-good-goods-blue-100 p-8 h-screen flex flex-col justify-between'>
            <Navbar />
            {/* Body */}
            {!loading && enterprise && 
            <div className='flex flex-col justify-center p-4 space-y-16 mt-10vh'>
                <div className='flex flex-col justify-center space-y-8'>
                    {enterprise["Enterprise picture relative path"] && !imageError && 
                    <div className='relative w-full h-96 overflow-hidden rounded-lg'>
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
                    /></div>}
                    <div className='h-96'>
                        <h2 className='text-good-goods-blue-900 font-semibold text-2xl sm:text-3xl lg:text-4xl'>{enterprise['Enterprise Name']}</h2>
                    </ div>
                </div>
            </div>}
            <Footer />
        </div>
    );
}

export default EnterprisePage;