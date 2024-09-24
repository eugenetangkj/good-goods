"use client"


import React from 'react';
import { filterFormatTypes } from '@/constants';
import { useState } from 'react';

interface CheckboxFormatProps {
    setFormat: React.Dispatch<React.SetStateAction<string[]>>;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const CheckboxFormat: React.FC<CheckboxFormatProps> = ({ setFormat, setCurrentPage }) => {
    const [formats, setFormats] = useState<string[]>(["Physical", "Online"]);


    // Runs when a checkbox is clicked
    const handleCheckboxChange = (format: string) => {
        setFormats((prevFormats) => {
            const updatedFormats = prevFormats.includes(format)
                ? prevFormats.filter(item => item !== format) // Remove the format if it exists
                : [...prevFormats, format]; // Add the format if it does not exist

            setFormat(updatedFormats); // Update the parent state with the new formats
            setCurrentPage(1);
            return updatedFormats; // Return the updated formats
        });
    };


    return (
        <div>
            {/* Button */}
            <button id="dropdownCheckboxFormatButton" data-dropdown-toggle="dropdownCheckboxFormat" className="text-white bg-good-goods-blue-900 hover:bg-sky-700 font-medium rounded-xl text-xs sm:text-sm px-3 py-1 text-center inline-flex items-center duration-200" type="button">Format<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
            </button>

            {/* Dropdown menu */}
            <div id="dropdownCheckboxFormat" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-60">
                
                <ul className="p-3 space-y-1 text-sm text-gray-700" aria-labelledby="dropdownCheckboxFormatButton">
                    {/* Iterate through options */}
                    {
                        filterFormatTypes.map((format, index) => {
                            return (
                                <li key={ index }>
                                    <div className="flex p-2 rounded hover:bg-gray-100">
                                        <div className="flex items-center h-5">
                                            <input type="checkbox" value={ format }  onChange={() => handleCheckboxChange(format)} className="w-4 h-4 text-good-goods-blue-900 bg-gray-100 border-gray-300 rounded" checked={formats.includes(format)}/>
                                        </div>
                                        <div className="ms-2 text-sm">
                                            <div className="font-medium text-gray-900">{ format }</div>
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

export default CheckboxFormat;
