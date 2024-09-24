import React from 'react';
import { EnterpriseCard } from "./EnterpriseCard";
import { Enterprise } from '@/app/[uri]/page';

interface EnterprisesProps {
    enterprises: Enterprise[];
}

export const Enterprises: React.FC<EnterprisesProps> = ({ enterprises }) => {
    return (
        <div className="grid grid-cols-1 md-l:grid-cols-2 xl:grid-cols-3 2.5xl:grid-cols-4 gap-8 w-fit self-center">
            {enterprises.map((ent) => {
                return (
                    <EnterpriseCard key={ent.ID} enterprise={ent} />
                );
            })}
        </div>
    );
}
