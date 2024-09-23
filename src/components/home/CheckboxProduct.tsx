"use client"


import React from 'react';
import { filterProductTypes } from '@/constants';
import { useState } from 'react';

interface CheckboxProductProps {
    setProduct: React.Dispatch<React.SetStateAction<string[]>>;
}

const CheckboxProduct: React.FC<CheckboxProductProps> = ({ setProduct }) => {
    const [products, setProducts] = useState<string[]>(["Taxi services", "Food delivery", "Driving Lessons", "White Canes", "Guide Dogs", "Sunglasses"]);


    // Runs when a checkbox is clicked
    const handleCheckboxChange = (product: string) => {
        setProducts((prevProducts) => {
            const updatedProducts = prevProducts.includes(product)
                ? prevProducts.filter(item => item !== product) // Remove the product if it exists
                : [...prevProducts, product]; // Add the product if it does not exist

            setProduct(updatedProducts); // Update the parent state with the new products
            return updatedProducts; // Return the updated products
        });
    };


    return (
        <div>
            {/* Button */}
            <button id="dropdownCheckboxProductButton" data-dropdown-toggle="dropdownCheckboxProduct" className="text-white bg-good-goods-blue-900 hover:bg-sky-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center duration-200" type="button">Product<svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4"/>
            </svg>
            </button>

            {/* Dropdown menu */}
            <div id="dropdownCheckboxProduct" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-60">
                
                <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownCheckboxProductButton">
                    {/* Iterate through options */}
                    {
                        filterProductTypes.map((product, index) => {
                            return (
                                <li key={ index }>
                                    <div className="flex p-2 rounded hover:bg-gray-100">
                                        <div className="flex items-center h-5">
                                            <input type="checkbox" value={ product }  onChange={() => handleCheckboxChange(product)} className="w-4 h-4 text-good-goods-blue-900 bg-gray-100 border-gray-300 rounded" checked={products.includes(product)}/>
                                        </div>
                                        <div className="ms-2 text-sm">
                                            <div className="font-medium text-gray-900 dark:text-gray-300">{ product }</div>
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

export default CheckboxProduct;
