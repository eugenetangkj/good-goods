'use client';


import Footer from "@/components/common/Footer";
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Enterprise } from '@/constants/Enterprise';
import LoadingIndicator from "@/components/common/LoadingIndicator";
import CreatableSelect from 'react-select/creatable';
import { MultiValue } from 'react-select';
import { filterFormatTypes, filterRegionTypes } from "../../../../constants/index";
import { SuccessfulToast } from "@/components/recommend/SuccessfulToast";
import { UnsuccessfulToast } from "@/components/recommend/UnsuccessfulToast";


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



    // Location
    const [locations, setLocations] = useState([{ name: '', hours: '' }]);
    const handleLocationChange = (index:number, value:string) => {
      const newLocations = [...locations];
      newLocations[index].name = value;
      setLocations(newLocations);
    };
    const handleHoursChange = (index:number, value:string) => {
      const newLocations = [...locations];
      newLocations[index].hours = value;
      setLocations(newLocations);
    };
    const addLocation = () => {
      setLocations([...locations, { name: '', hours:'' }]);
    };
    const removeLocation = (index:number) => {
      const newLocations = locations.filter((_, i) => i !== index);
      setLocations(newLocations);
    };



    //Controls modal
    const [shouldModalAppear, setShouldModalAppear] = useState(false);
    const [shouldModalShowSuccess, setShouldModalShowSuccess] = useState<boolean>();
    const timeoutDuration = 3000; //In ms

    useEffect(() => {
        if (shouldModalAppear) {
            const timer = setTimeout(() => {
                setShouldModalAppear(false);
            }, timeoutDuration); // Adjust the delay as needed
          
            return () => clearTimeout(timer); // Clean up the timer on unmount
        }
    }, [shouldModalAppear])



    //Handles user submit form
    const handleSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        //Put all fields into an enterprise
        const enterpriseOutput = {
            "eid": enterprise?.eid, 
            "enterpriseName": enterpriseName,
            "urlParam": enterpriseName.split(' ').map(word => word.toLowerCase()).join('_'), 
            "enterprisePictureRelativePath": enterprise?.enterprisePictureRelativePath, //Never cater for image change
            "typeOfImpact": selectedTypeOfImpactOptions.map(option => option.value),
            "detailedImpact": detailedImpact,
            "format": format,
            "location": locations.map(location => location.name),
            "region": region,
            "products": selectedProductOptions.map(option => option.value),
            "openingHours": locations.map(location => location.hours),
            "website": website,
            "logoImage": enterprise?.logoImage,
            "businessType": businessType
        }

        try {
            const response = await fetch("/api/updateSocialEnterprise", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(enterpriseOutput),
            });
            const output = await response.json();
            console.log(output);
            if (response.status !== 200) {
                setShouldModalAppear(true);
                setShouldModalShowSuccess(false);
                throw new Error(
                    `Email API request failed with status: ${response.status}`
                );
            }
            setShouldModalAppear(true);
            setShouldModalShowSuccess(true);
        } catch {
            console.log('Ran into an error.');
            setShouldModalAppear(true);
            setShouldModalShowSuccess(false);
        }
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
                    //Set enterprise name
                    setEnterpriseName(foundEnterprise.enterpriseName);

                    //Set business type
                    setBusinessType(foundEnterprise.businessType);

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
                    setDetailedImpact(foundEnterprise.detailedImpact);

                    setLocations(foundEnterprise.location.map((locationName:string, index:number) => ({
                        name: locationName,
                        hours: foundEnterprise.openingHours[index]
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
                    <h2 className='text-good-goods-blue-900 font-semibold text-2xl sm:text-3xl lg:text-4xl'>Edit Enterprise</h2>

                    <form className='flex flex-col space-y-8' onSubmit={handleSubmitForm}>
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
                                value={ enterpriseName }
                                onChange={(e) => setEnterpriseName(e.target.value)}
                            />
                        </div>

                        {/* Business Type */}
                        <div>
                            <label htmlFor="businessType" className="block mb-2 text-sm font-medium text-gray-900">Select Business Type</label>
                            <select id="businessType" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            onChange={(e) => setBusinessType(e.target.value)} value={ businessType }>
                                <option selected={ businessType == "Food and Beverage"} value="Food and Beverage">Food and Beverage</option>
                                <option selected={ businessType == "Fashion and Retail"} value="Fashion and Retail">Fashion and Retail</option>
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
                                                <input 
                                                    id={`${regionType}-checkbox-list`} 
                                                    type="checkbox" 
                                                    value="" 
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                                    checked={region?.includes(regionType)} 
                                                    onChange={(e) => {
                                                        setRegion((prevRegion) => {
                                                            if (e.target.checked) {
                                                                // If checked, add regionType to the array
                                                                return [...(prevRegion || []), regionType];
                                                            } else {
                                                                // If unchecked, filter out regionType from the array
                                                                return prevRegion?.filter(item => item !== regionType) || [];
                                                            }
                                                        });
                                                    }}
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
                            focus:ring-blue-500 focus:border-blue-500" placeholder="Describe social enterprise" value= { detailedImpact }
                            onChange={(e) => setDetailedImpact(e.target.value) }></textarea>
                        </div>


                        {/* Website */}
                        <div>
                            <label htmlFor="website" className="block mb-2 text-sm font-medium text-gray-900">Enterprise Website</label>
                            <input
                                type="text"
                                id="website"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                                            focus:border-blue-500 block w-full p-2.5"
                                placeholder="Enter social enterprise website"
                                required
                                value={ website }
                                onChange={(e) => setWebsite(e.target.value)}
                            />
                        </div>


                        {/* Locations */}
                        <div>
                            <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900">Locations and Opening Hours</label>
                            <div className='flex flex-col space-y-4'>
                            {locations.map((location, index) => (
                                <div key={index} className="location-item">
                                    <input
                                        type="text"
                                        placeholder="Location"
                                        value={location.name}
                                        onChange={(e) => handleLocationChange(index, e.target.value)}
                                        className='text-sm text-gray-900 rounded-lg border-gray-300 focus:ring-blue-500 bg-gray-50'
                                    />
                                    <input
                                        type="text"
                                        placeholder="Opening Hours (e.g. 08:00 - 17:00)"
                                        value={location.hours}
                                        onChange={(e) => handleHoursChange(index, e.target.value)}
                                        className='text-sm text-gray-900 rounded-lg border-gray-300 focus:ring-blue-500 bg-gray-50'
                                    />
                                    <button type="button" className='text-sm text-gray-900 ml-2' onClick={() => removeLocation(index)}>Remove</button>
                                </div>
                            ))}
                            </div>
                            <button type="button" className='text-sm text-gray-900' onClick={addLocation}>Add Location</button>
                        </div>


                        {/* Submission */}
                        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full duration-300
                        sm:w-auto px-5 py-2.5 text-center">Submit</button>
                    </form>


                    {shouldModalAppear && (
                        <div className="fixed z-10 inset-0 top-36 flex justify-center items-start">
                            <div>
                                {shouldModalShowSuccess ? <SuccessfulToast /> : <UnsuccessfulToast />}
                            </div>
                        </div>
                    )}





















                
                </div>
                : <LoadingIndicator />
                
           
            
            
            
            }


            <Footer />
        </div>
    );
}

export default EditEnterprisePage;