import React from 'react';
import { EnterpriseCard } from "./EnterpriseCard";
import { Enterprise } from '@/app/[uri]/page';

interface EnterprisesProps {
    enterprises: Enterprise[];
}

export const Enterprises: React.FC<EnterprisesProps> = ({ enterprises }) => {
    return (
        <div className='flex flex-col justify-center items-start space-y-12'>
            <div className='flex flex-wrap justify-start'>
                {enterprises.map((ent) => {
                    return (
                        <div 
                            key={ent.ID}
                            className='card bg-good-goods-white-500 border rounded-xl p-6 h-70 sm:h-60 w-full sm:w-72 lg:w-1/4 flex flex-row space-y-8 mb-4 mx-12 last:mb-0'
                        >
                            <EnterpriseCard enterprise={ent} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
