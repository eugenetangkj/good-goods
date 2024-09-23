"use client"


import React from 'react';
import { filterRegionTypes } from '@/constants';
import { useState } from 'react';

interface CheckboxRegionProps {
    setRegion: React.Dispatch<React.SetStateAction<string[]>>;
}

const CheckboxRegion: React.FC<CheckboxRegionProps> = ({ setRegion }) => {
    const [regions, setRegions] = useState<string[]>(["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"]);


    // Runs when a checkbox is clicked
    const handleCheckboxChange = (region: string) => {
        setRegions((prevRegions) => {
            const updatedRegions = prevRegions.includes(region)
                ? prevRegions.filter(item => item !== region) // Remove the region if it exists
                : [...prevRegions, region]; // Add the region if it does not exist

            setRegion(updatedRegions); // Update the parent state with the new regions
            return updatedRegions; // Return the updated regions
        });
    };


    return (
        <div>
            {/* Button */}
            <button id="dropdownCheckboxRegionButton" data-dropdown-toggle="dropdownCheckboxRegion" className="text-white bg-good-goods-blue-900 hover:bg-sky-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center duration-200" type="button">Region<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
            </button>

            {/* Dropdown menu */}
            <div id="dropdownCheckboxRegion" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-60">
                
                <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxRegionButton">
                    {/* Iterate through options */}
                    {
                        filterRegionTypes.map((region, index) => {
                            return (
                                <li key={ index }>
                                    <div className="flex p-2 rounded hover:bg-gray-100">
                                        <div className="flex items-center h-5">
                                            <input type="checkbox" value={ region }  onChange={() => handleCheckboxChange(region)} className="w-4 h-4 text-good-goods-blue-900 bg-gray-100 border-gray-300 rounded" checked={regions.includes(region)}/>
                                        </div>
                                        <div className="ms-2 text-sm">
                                            <div className="font-medium text-gray-900 dark:text-gray-300">{ region }</div>
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

export default CheckboxRegion;
