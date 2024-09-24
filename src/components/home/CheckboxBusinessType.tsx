"use client"


import React from 'react';
import { filterBusinessTypes } from '@/constants';
import { useState } from 'react';

interface CheckboxBusinessTypeProps {
    setBusinessType: React.Dispatch<React.SetStateAction<string[]>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const CheckboxBusinessType: React.FC<CheckboxBusinessTypeProps> = ({ setBusinessType, setCurrentPage }) => {
    const [businessTypes, setBusinessTypes] = useState<string[]>(["Food and Beverage", "Fashion and Retail"]);


    // Runs when a checkbox is clicked
    const handleCheckboxChange = (businessType: string) => {
        setBusinessTypes((prevBusinessTypes) => {
            const updatedBusinessTypes = prevBusinessTypes.includes(businessType)
                ? prevBusinessTypes.filter(item => item !== businessType) // Remove the product if it exists
                : [...prevBusinessTypes, businessType]; // Add the product if it does not exist

            setBusinessType(updatedBusinessTypes); // Update the parent state with the new products
            setCurrentPage(1);
            return updatedBusinessTypes; // Return the updated products
        });
    };


    return (
        <div>
            {/* Button */}
            <button id="dropdownCheckboxProductButton" data-dropdown-toggle="dropdownCheckboxProduct" className="text-white bg-good-goods-blue-900 hover:bg-sky-700 font-medium rounded-xl text-xs sm:text-sm px-3 py-1 text-center inline-flex items-center duration-200" type="button">Business Type<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
            </button>

            {/* Dropdown menu */}
            <div id="dropdownCheckboxProduct" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-60">
                
                <ul className="p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownCheckboxProductButton">
                    {/* Iterate through options */}
                    {
                        filterBusinessTypes.map((businessType, index) => {
                            return (
                                <li key={ index }>
                                    <div className="flex p-2 rounded hover:bg-gray-100">
                                        <div className="flex items-center h-5">
                                            <input type="checkbox" value={ businessType }  onChange={() => handleCheckboxChange(businessType)} className="w-4 h-4 text-good-goods-blue-900 bg-gray-100 border-gray-300 rounded" checked={businessTypes.includes(businessType)}/>
                                        </div>
                                        <div className="ms-2 text-sm">
                                            <div className="font-medium text-gray-900">{ businessType }</div>
                                        </div>
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>

        </div>

    );
};

export default CheckboxBusinessType;
