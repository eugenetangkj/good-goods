import React from 'react';
import Image from 'next/image';
import { Enterprise } from '@/constants/Enterprise';
import Link from 'next/link';

interface EnterpriseCardProps {
    enterprise: Enterprise;
}

export const EnterpriseCard: React.FC<EnterpriseCardProps> = ({ enterprise }) => {
    return (
    <Link href={`./${enterprise['urlParam']}`} passHref>  
        <div className="cursor-pointer p-2 sm:p-6 space-y-4 bg-white rounded-xl card w-72 h-72 lg:w-96 lg:h-56 flex flex-col justify-center lg:flex-row space-x-4">
                {/* Image */}
                <Image 
                    src={enterprise['logoImage']} 
                    alt={enterprise['enterpriseName']} 
                    width={96}
                    height={96}
                    className="rounded-lg self-center h-24 w-24"
                />

                {/* Store name and Description */}
                <div className="flex flex-col space-y-4">
                    <h5 className="text-xl xl:text-1.5xl font-semibold text-good-goods-blue-900">
                        {enterprise['enterpriseName']}
                    </h5>
                    <p className="text-sm xl:text-base line-clamp-4">
                        {enterprise['detailedImpact']}
                    </p>
                </div>
        </div>
       </Link>
    );
};
