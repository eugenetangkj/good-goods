'use client';


import Footer from "@/components/common/Footer";
import Image from "next/image";
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Enterprise } from '@/constants/Enterprise';
import LoadingIndicator from "@/components/common/LoadingIndicator";
import CreatableSelect from 'react-select/creatable';
import { MultiValue } from 'react-select';
import { filterFormatTypes, filterRegionTypes } from "../../../../constants/index";


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
    const [enterpriseName, setEnterpriseName] = useState('');
    const [businessType, setBusinessType] = useState('');



    //Format
    const [format, setFormat] = useState<string[]>();

    //Region
    const [region, setRegion] = useState<string[]>();


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


    //Type of impact options
    const [selectedTypeOfImpactOptions, setSelectedTypeOfImpactOptions] = useState<OptionType[]>([]);
    const [defaultTypeOfImpactOptions, setDefaultTypeOfImpactOptions] = useState<OptionType[]>([]);
    const handleTypeOfImpactChange = (newValue: MultiValue<OptionType>) => {
        setSelectedTypeOfImpactOptions(newValue as OptionType[]);
      };
    const handleTypeOfImpactCreate = (inputValue: string) => {
        const newOption: OptionType = { value: inputValue, label: inputValue };
        setSelectedTypeOfImpactOptions((prev) => [...prev, newOption]);
    };


    //Enterprise description
    const [detailedImpact, setDetailedImpact] = useState<string>();


    //Website
    const [website, setWebsite] = useState<string>();







    


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
                    //Set enterprise name
                    setEnterpriseName(foundEnterprise.enterpriseName);

                    //Set format checkboxes
                    setFormat(foundEnterprise.format);

                    //Set region checkboxes
                    setRegion(foundEnterprise.region);

                    //Set product options
                    setSelectedProductOptions(foundEnterprise.products.map((product:string) => ({
                        value: product,
                        label: product,
                    })));
                    setDefaultProductOptions(foundEnterprise.products.map((product:string) => ({
                        value: product,
                        label: product,
                    })));


                    //Set type of impact options
                    setSelectedTypeOfImpactOptions(foundEnterprise.typeOfImpact.map((impact:string) => ({
                        value: impact,
                        label: impact,
                    })));
                    setDefaultTypeOfImpactOptions(foundEnterprise.typeOfImpact.map((impact:string) => ({
                        value: impact,
                        label: impact,
                    })));

                    //Set website
                    setWebsite(foundEnterprise.website);

                    //Set detailed impact
                    setWebsite(foundEnterprise.detailedImpact);











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
                    <h2 className='text-good-goods-blue-900 font-semibold text-2xl sm:text-3xl lg:text-4xl'>Edit Enterprise</h2>

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
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Format</label>
                            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
                            
                                {
                                    filterFormatTypes.map((formatType, index) => {
                                        return (
                                            <li key={ index } className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                                <div className="flex items-center ps-3">
                                                    <input id={`${formatType}-checkbox-list`} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500focus:ring-2"
                                                    checked={ format?.includes(formatType) }
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                        // Add "Physical" to the format array
                                                        setFormat([...(format || []), formatType]);
                                                        } else {
                                                        // Remove "Physical" from the format array
                                                        setFormat(format?.filter(item => item !== formatType));
                                                        }}}
                                                    />
                                                    <label htmlFor={`${formatType}-checkbox-list`} className="w-full py-3 ms-2 text-sm font-medium text-gray-900">{ formatType }</label>
                                                </div>
                                            </li>
                                        );
                                    })
                                    }
                            </ul>
                        </div>

                        {/* Region */}
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Region</label>
                            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
                            
                                {
                                    filterRegionTypes.map((regionType, index) => {
                                        return (
                                            <li key={ index } className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                                                <div className="flex items-center ps-3">
                                                    <input id={`${regionType}-checkbox-list`} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500focus:ring-2"
                                                    checked={ region?.includes(regionType) }
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                        // Add item to the region array
                                                        setFormat([...(region || []), regionType]);
                                                        } else {
                                                        // Remove item from the region array
                                                        setFormat(region?.filter(item => item !== regionType));
                                                        }}}
                                                    />
                                                    <label htmlFor={`${regionType}-checkbox-list`} className="w-full py-3 ms-2 text-sm font-medium text-gray-900">{ regionType }</label>
                                                </div>
                                            </li>
                                        );
                                    })
                                    }
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
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Type of Impact</label>
                                <CreatableSelect
                                    isMulti
                                    options={defaultTypeOfImpactOptions}
                                    value={selectedTypeOfImpactOptions} // Prepopulate with selected values
                                    onChange={handleTypeOfImpactChange}
                                    onCreateOption={handleTypeOfImpactCreate}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    placeholder="Type and press enter to create type of impact"
                            />
                        </div>

                         {/* Detailed impact */}
                         <div>
                            <label htmlFor="detailedImpact" className="block mb-2 text-sm font-medium text-gray-900">Detailed Impact</label>
                            <textarea id="detailedImpact" rows={5} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300
                            focus:ring-blue-500 focus:border-blue-500" placeholder="Describe social enterprise" value= { enterprise.detailedImpact}
                            onChange={(e) => setDetailedImpact(e.target.value) }></textarea>
                        </div>


                        {/* Website */}
                        <div>
                            <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enterprise Website</label>
                            <input
                                type="text"
                                id="website"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                                            focus:border-blue-500 block w-full p-2.5"
                                placeholder="Enter social enterprise website"
                                required
                                value={ enterprise.website }
                                onChange={(e) => setWebsite(e.target.value)}
                            />
                        </div>

                        




                    </form>





















                
                </div>
                : <LoadingIndicator />
                
           
            
            
            
            }


            <Footer />
        </div>
    );
}

export default EditEnterprisePage;