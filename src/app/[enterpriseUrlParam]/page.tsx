'use client';

import enterprisesDetails from '../../constants/social_enterprises.json';
import { useSearchParams } from 'next/navigation';
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
    const searchParams = useSearchParams();
    const enterpriseName = searchParams.get('name');
    const [enterprise, setEnterprise] = useState<Enterprise | null>(null);

    useEffect(() => {
        console.log(enterpriseName);
        if (enterpriseName) {
            if (Array.isArray(enterpriseName)) {
                setEnterprise(getEnterpriseByParam(enterpriseName[0]) || null);
            } else if (typeof enterpriseName === 'string') {
                setEnterprise(getEnterpriseByParam(enterpriseName) || null);
            }
        }
    }, [enterpriseName]);

    if (!enterprise) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{enterprise["Enterprise Name"]}</h1>
        </div>
    );
}

export default EnterprisePage;