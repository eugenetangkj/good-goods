'use client';


import Footer from "@/components/common/Footer";
import Image from "next/image";
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Enterprise } from '@/constants/Enterprise';
import LoadingIndicator from "@/components/common/LoadingIndicator";
import CreatableSelect from 'react-select/creatable';
import { MultiValue } from 'react-select';


interface OptionType {
    value: string;
    label: string;
}

function EditEnterprisePage() {
    // Name of field (uri in this case) should be the same as the name of directory this file is in.
    const enterpriseNameUri = useParams()['uri'] as string;
    const [isLoading, setIsLoading] = useState(true);
    const [enterprise, setEnterprise] = useState<Enterprise | null>(null);



    // Form states
    const [enterpriseName, setEnterpriseName] = useState(enterprise?.enterpriseName);
    const [businessType, setBusinessType] = useState(enterprise?.businessType);
    const [format, setFormat] = useState(enterprise?.format);


   

    //Products options
    const [selectedProductOptions, setSelectedProductOptions] = useState<OptionType[]>([]);
    const [defaultProductOptions, setDefaultProductOptions] = useState<OptionType[]>([]);
    const handleProductChange = (newValue: MultiValue<OptionType>) => {
        setSelectedProductOptions(newValue as OptionType[]);
      };
    const handleProductCreate = (inputValue: string) => {
        const newOption: OptionType = { value: inputValue, label: inputValue };
        setSelectedProductOptions((prev) => [...prev, newOption]);
    };







    


    useEffect(() => {
        const getEnterpriseByParam = async (name:string) => {
            try {
                const response = await fetch(`/api/retrieveSocialEnterprise?name=${name}`); // Adjust the endpoint as needed
                if (!response.ok) {
                    throw new Error('Cannot fetch enterprise data');
                }
                const data = await response.json();
                return data.enterprise; // Assuming your API returns the enterprise object
            } catch (err) {
                console.error(err);
                return undefined;
            }
        };

        if (enterpriseNameUri) {
            const fetchEnterprise = async () => {
                const foundEnterprise = await getEnterpriseByParam(enterpriseNameUri);
                setEnterprise(foundEnterprise || null);
                if (foundEnterprise) {
                    //Set all states initially



                    //Set product options
                    setSelectedProductOptions(foundEnterprise.products.map((product:string) => ({
                        value: product,
                        label: product,
                    })));
                    setDefaultProductOptions(foundEnterprise.products.map((product:string) => ({
                        value: product,
                        label: product,
                    })));











                }
                setIsLoading(false);
            };

            fetchEnterprise();
        } else {
            setIsLoading(false);
        }
    }, []);


  


































































    return (
        <div className='bg-good-goods-blue-100 p-8 h-screen flex flex-col justify-between'>
            
            {/* Body */}
            {
                (!isLoading && enterprise)
                ?<div className='flex flex-col justify-center p-4 space-y-16 mt-15vh'>
                    <form className='flex flex-col space-y-8'>
                        {/* Enterprise name */}
                        <div>
                            <label htmlFor="enterpriseName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enterprise Name</label>
                            <input
                                type="text"
                                id="enterpriseName"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                                            focus:border-blue-500 block w-full p-2.5"
                                placeholder="Enter social enterprise name"
                                required
                                value={ enterprise.enterpriseName }
                                onChange={(e) => setEnterpriseName(e.target.value)}
                            />
                        </div>

                        {/* Business Type */}
                        <div>
                            <label htmlFor="businessType" className="block mb-2 text-sm font-medium text-gray-900">Select Business Type</label>
                            <select id="businessType" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={(e) => setBusinessType(e.target.value)} value={ businessType }>
                                <option selected={ enterprise.businessType == "Food and Beverage"} value="Food and Beverage">Food and Beverage</option>
                                <option selected={ enterprise.businessType == "Fashion and Retail"} value="Fashion and Retail">Fashion and Retail</option>
                            </select>
                        </div>
                       


                        {/* Format */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Business Type</label>
                            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input id="physical-checkbox-list" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500focus:ring-2"
                                        checked={ format?.includes("Physical") }
                                        onChange={(e) => {
                                            if (e.target.checked) {
                                              // Add "Physical" to the format array
                                              setFormat([...(format || []), "Physical"]);
                                            } else {
                                              // Remove "Physical" from the format array
                                              setFormat(format?.filter(item => item !== "Physical"));
                                            }}}
                                        />
                                        <label htmlFor="physical-checkbox-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900">Physical</label>
                                    </div>
                                </li>
                                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                    <div className="flex items-center ps-3">
                                        <input id="online-checkbox-list" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                            checked={ format?.includes("Online") }
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                  // Add "Physical" to the format array
                                                  setFormat([...(format || []), "Online"]);
                                                } else {
                                                  // Remove "Physical" from the format array
                                                  setFormat(format?.filter(item => item !== "Online"));
                                            }}}
                                        />
                                        <label htmlFor="online-checkbox-list" className="w-full py-3 ms-2 text-sm font-medium text-gray-900">Online</label>
                                    </div>
                                </li>
                            </ul>
    
                            
                        </div>



                        {/* Products */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Products</label>
                            <CreatableSelect
                                isMulti
                                options={defaultProductOptions}
                                value={selectedProductOptions} // Prepopulate with selected values
                                onChange={handleProductChange}
                                onCreateOption={handleProductCreate}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                placeholder="Type and press enter to create product"
                                />
                        </div>


                        {/* Type of Impact */}
                        




                    </form>





















                
                </div>
                : <LoadingIndicator />
                
           
            
            
            
            }


            <Footer />
        </div>
    );
}

export default EditEnterprisePage;