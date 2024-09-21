'use client';

import enterprisesDetails from '../../constants/social_enterprises.json';
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
    const [enterprise, setEnterprise] = useState<Enterprise | null>(null);

    useEffect(() => {
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