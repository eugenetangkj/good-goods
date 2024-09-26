"use client"

import { FaArrowCircleUp } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Enterprises } from "./Enterpises";
import CheckboxFormat from "./CheckboxFormat";
import CheckboxRegion from "./CheckboxRegion";
import CheckboxBusinessType from "./CheckboxBusinessType";
import { IoCloseOutline } from "react-icons/io5";
import { Enterprise } from "@/constants/Enterprise";

// Constants
const maxNumberOfCharacters = 100;
const promptOne = "Cafes"
const promptTwo = "Western Food"



export function AISearchBar() {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    //States
    const [socialEnterprises, setSocialEnterprises] = useState<Enterprise[]>([]); //Maintains full list of social enterprises available in MongoDB
    const [userInput, setUserInput] = useState('');
    const [display, setDisplay] = useState<Enterprise[]>();
    const [format, setFormat] = useState<string[]>(["Physical", "Online"]); 
    const [region, setRegion] = useState<string[]>(["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"]); 
    const [businessType, setBusinessType] = useState<string[]>(["Food and Beverage", "Fashion and Retail"]); 
    const [isLoading, setIsLoading] = useState(false);
    const [enterprisesIsLoading, setEnterprisesIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [userSearchQuery, setUserSearchQuery] = useState('');
    const [userSearchResults, setUserSearchResults] = useState<Enterprise[]>();
    const [currentPage , setCurrentPage] = useState<number>(1);


    //Populate data when page loads
    useEffect(() => {
        // Function to fetch data from the API
        const fetchSocialEnterprises = async () => {
          try {
            const response = await fetch("/api/socialEnterprises"); // API call to your route
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const data = await response.json(); // Convert response to JSON
            setEnterprisesIsLoading(false)
            setSocialEnterprises(data["enterprises"] || []); // Store the data in state
            setDisplay(data["enterprises"] || []);
            setUserSearchResults(data["enterprises"] || []);
          } catch (error) {
                setEnterprisesIsLoading(false)
                setSocialEnterprises([]); // Store the data in state
                setDisplay([]);
                setUserSearchResults([]);
          } finally {
            // TODO: Run clean up code
          }
        };
        fetchSocialEnterprises();
    }, []);



    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value.length <= maxNumberOfCharacters) {
            setUserInput(value);
        }
    };


    //Handle user submitting a query
    const handleSubmitQuery = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
        setCurrentPage(1);
        console.log("Submitted query:", userInput);
        setUserSearchQuery(userInput); //User searched something
        try {
            const response = await fetch("/api/queryChatbot", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: userInput }),
            });
            const output = await response.json();
            const matchingOutput = output.answer;
            const filteredSocialEnterprises = socialEnterprises.filter(socialEnterprise =>
                matchingOutput.includes(socialEnterprise.eid)
            );
            setDisplay(filteredSocialEnterprises);
            setIsLoading(false);
            setUserSearchResults(filteredSocialEnterprises);
            setUserInput('');
            if (filteredSocialEnterprises.length === 0) {
                setErrorMessage("No result found. Please try a different search term.")
            }
        } catch {
            console.log('Ran into an error.');
            setDisplay([]);
            setIsLoading(false);
            setUserInput('');
            setUserSearchResults([]);

        }
    };


    //Filtering
    const handleManualFilter = ()=> {
        //If user searched something, we will filter from the results he obtained.
        //If user did not search anything, we will filter from all the data available.
        let filteredDocs = (userSearchQuery.length !== 0) ? userSearchResults : socialEnterprises;
        
        if (format.length === 0 || region.length === 0 || businessType.length === 0) {
            filteredDocs = [];
        } else {
            //Must contain all the checkbox values
            filteredDocs = filteredDocs?.filter(doc => 
                region.some(item => doc.region.includes(item)) &&
                format.some(item => doc.format.includes(item)) &&
                businessType.some(item => doc["businessType"].includes(item))
            );
        }
        setDisplay(filteredDocs);
    }


    // Run filter whenever checkbox options change
    useEffect(() => {
       handleManualFilter();
    }, [format, region, businessType]);




    return (
        <div className='flex flex-col space-y-8'>
            {(enterprisesIsLoading || isLoading) &&
            (<div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
            <div className="w-16 h-16 border-4 border-t-4 border-t-transparent border-white rounded-full animate-spin"></div>
            </div>)
            }






            {/* Search bar form */}
            {!(enterprisesIsLoading || isLoading) &&
            <form className="flex flex-col gap-4 space-y-8" onSubmit={handleSubmitQuery}>

                {/* Search bar */}
                <div className="relative lg:w-4/5">
                    <input
                        className="block border border-gray-300 bg-white text-gray-900 text-sm sm:text-base md:text-lg focus:border-cyan-500 focus:ring-cyan-500 p-3 lg:p-4 pr-12 rounded-full w-full sm:w-4/5 lg:w-3/4"
                        type="text"
                        id="searchQuery"
                        placeholder="What goods or services are you looking for?"
                        value={userInput}
                        onChange={handleInputChange}
                        required
                    />
                    {
                    (isLoading)
                    ?  <div className='absolute top-1/2 left-0.9 sm:left-0.7 transform -translate-y-1/2'><svg aria-hidden="true" className="w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8  text-gray-400 animate-spin fill-good-goods-blue-900" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/><path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/></svg></div>
                    :   <button
                    type="submit"
                    className="absolute top-1/2 left-0.9 sm:left-0.7 text-xl sm:text-2xl lg:text-3xl transform -translate-y-1/2 text-good-goods-blue-900 hover:text-gray-900 duration-200"
                >
                    <FaArrowCircleUp />
                </button>      
                    
                    }
                </div>


                {/* Error message, if any */}
                {
                    (errorMessage.length === 0)
                    ? null
                    : <h6 className='text-red-600 text-sm sm:text-base md:text-lg'>{ errorMessage }</h6>
                }



                <div className={`mt-4 text-sm sm:text-base block ${userInput.length === maxNumberOfCharacters ? 'text-red-600' : 'text-gray-700'}`}>
                    {userInput.length} / {maxNumberOfCharacters} characters
                </div>
            </form>
            }

            

            {/* Suggested prompts */}
            {!(enterprisesIsLoading || isLoading) &&
            <div className='flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 mt-8' id="prompts">
                <div className='bg-sky-200 hover:bg-sky-300 px-4 py-2 text-sm md:text-base rounded-full cursor-pointer duration-200 w-fit' onClick={() => {
                    setUserInput(promptOne);
                    }}>
                    <h6 className='font-bold text-good-goods-blue-900'>{promptOne}</h6>
                </div>
                <div className='bg-sky-200 hover:bg-sky-300 px-4 py-2 text-sm md:text-base rounded-full cursor-pointer duration-200 w-fit' onClick={() => {
                    setUserInput(promptTwo);
                }}>
                    <h6 className='font-bold text-good-goods-blue-900'>{promptTwo}</h6>
                </div>
            </div>
            }


            {/* Enterprises */}
            <div className='pt-20 flex flex-col items-center gap-y-8'>
                 {/* Filter checkboxes */}
                    <div className='flex flex-row justify-start sm:justify-end items-center flex-wrap gap-x-4 gap-y-2 lg:gap-x-8 self-start sm:self-end'>
                            <CheckboxFormat setFormat={ setFormat } setCurrentPage={ setCurrentPage } />
                            <CheckboxRegion setRegion={ setRegion }  setCurrentPage={ setCurrentPage } />
                            <CheckboxBusinessType setBusinessType={ setBusinessType }  setCurrentPage={ setCurrentPage } />
                        
                    </div>
                

                {/* User's search query */}
                {
                    (userSearchQuery.length !== 0 && !(enterprisesIsLoading || isLoading))
                    ? <div className='flex flex-col sm:flex-row justify-start items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 w-fit self-start'>
                        <h6 className='text-sm sm:text-base'>You searched for:</h6>
                        <div className= 'text-white font-semibold bg-good-goods-blue-900 hover:bg-sky-700 text-xs sm:text-sm px-3 py-1 rounded-full w-fit flex flex-row items-center justify-center space-x-2'>
                            <h6>{ userSearchQuery }</h6>
                            <div onClick={() => {setUserSearchQuery(''); setUserSearchResults(socialEnterprises); setUserInput(''); setDisplay(socialEnterprises); setErrorMessage(''); setCurrentPage(1)}} className="cursor-pointer">
                                <IoCloseOutline size={24} /> {/* You can adjust the size */}
                            </div>

                        </div>
                    </div>
                    : null
                }
                
                {/* Enterprises list */}
                {isClient && !(enterprisesIsLoading || isLoading) &&
                    <Enterprises enterprises={display || []} currentPage={ currentPage } setCurrentPage={ setCurrentPage }></Enterprises>
            
                }

                

            </div>
            


           
        </div>
    );
}

export default AISearchBar;