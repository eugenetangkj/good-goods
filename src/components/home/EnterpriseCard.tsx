import React from 'react';
import Image from 'next/image';
import { Enterprise } from '@/app/[uri]/page';
import Link from 'next/link';

interface EnterpriseCardProps {
    enterprise: Enterprise;
}

export const EnterpriseCard: React.FC<EnterpriseCardProps> = ({ enterprise }) => {
    return (
    <Link href={`./${enterprise['URL Param']}`} passHref>  
        <div className="cursor-pointer p-6 space-y-4">
            <div className="flex flex-row space-x-4 items-start">
                {/* Image */}
                <Image 
                    src={enterprise['logo image']} 
                    alt={enterprise['Enterprise Name']} 
                    width={100}
                    height={100}
                    className="rounded-lg"
                />

                {/* Store name and Description */}
                <div className="flex flex-col space-y-4">
                    <h5 className="text-xl md:text-1.5xl font-semibold text-good-goods-blue-900">
                        {enterprise['Enterprise Name']}
                    </h5>
                    <p className="text-sm sm:text-base line-clamp-4">
                        {enterprise['Detailed impact']}
                    </p>
                </div>
            </div>
        </div>
       </Link>
    );
};
