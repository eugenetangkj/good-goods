"use client"

import { FaArrowCircleUp } from "react-icons/fa";
import { useState, useRef } from "react";
import doc from "../../../public/social_enterprises.json"
import { Enterprises } from "./Enterpises";

// Constants
const maxNumberOfCharacters = 100;
const promptOne = "I want to dine near Serangoon"
const promptTwo = "I want catering services"
const docs = doc

export function AISearchBar() {
    const formRef = useRef<HTMLFormElement>(null);
    const [userInput, setUserInput] = useState('');
    const [display, setDisplay] = useState(docs);
    const [format, setFormat] = useState('');
    const [region, setRegion] = useState('');
    const [goodsType, setGoodsType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value.length <= maxNumberOfCharacters) {
            setUserInput(value);
        }
    };

    const handleSubmitQuery = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage('');
        console.log("Submitted query:", userInput);
        try {
            const response = await fetch("/api/queryChatbot", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: userInput }),
            });
            const test = await response.json();
            console.log(test.answer);
            const keep = JSON.parse(test.answer);
            const newDisplay = docs.filter(x => keep.includes(x.ID));
            console.log(newDisplay)
            setDisplay(newDisplay);
            setIsLoading(false);
        } catch {
            console.log('Ran into an error.');
            setErrorMessage("No result found. Please try a different search parameter.")
            setIsLoading(false);
        }
    };

    const handleManualFilter = (event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        let filteredDocs = docs;

        if (format !== "") {
            filteredDocs = filteredDocs.filter(x => x.Format.includes(format));
        }
        if (region !== "") {
            filteredDocs = filteredDocs.filter(x => x.Region.includes(region));
        }
        if (goodsType !== "") {
            filteredDocs = filteredDocs.filter(x => x["Type of goods offered"].includes(goodsType));
        }

        setDisplay(filteredDocs);
        console.log(filteredDocs)
       
    }


    return (
        <div className='flex flex-col space-y-8'>
            {/* Search bar form */}
            <form className="flex flex-col gap-4 space-y-8" onSubmit={handleSubmitQuery} ref={formRef}>

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





            {/* Suggested prompts */}
            <div className='flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 mt-8'>
                <div className='bg-sky-200 hover:bg-sky-300 px-4 py-2 text-sm md:text-base rounded-full cursor-pointer duration-200 w-fit' onClick={() => {
                    setUserInput(promptOne);
                    formRef.current?.dispatchEvent(new Event('submit', { bubbles: true }));
                    }}>
                    <h6 className='font-bold text-good-goods-blue-900'>{promptOne}</h6>
                </div>
                <div className='bg-sky-200 hover:bg-sky-300 px-4 py-2 text-sm md:text-base rounded-full cursor-pointer duration-200 w-fit' onClick={() => {
                    setUserInput(promptTwo);
                    formRef.current?.dispatchEvent(new Event('submit', { bubbles: true }));
                }}>
                    <h6 className='font-bold text-good-goods-blue-900'>{promptTwo}</h6>
                </div>
            </div>


            {/* Filters on the same row */}
            <form className="flex items-center gap-4 w-full" onSubmit={handleManualFilter}>
                <label className="flex flex-col w-full">
                    Format:
                    <select
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                    >
                        <option value="">All</option>
                        <option value="Physical">Physical</option>
                        <option value="Online">Online</option>
                    </select>
                </label>

                <label className="flex flex-col w-full">
                    Region:
                    <select
                        value={region}
                        onChange={(e) => setRegion(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                    >
                        <option value="">All</option>
                        <option value="North-East">NE</option>
                        <option value="North-West">NW</option>
                        <option value="South-East">SE</option>
                        <option value="South-West">SW</option>
                        <option value="North">N</option>
                        <option value="South">S</option>
                        <option value="East">E</option>
                        <option value="West">W</option>
                    </select>
                </label>

                <label className="flex flex-col w-full">
                    Type of Goods:
                    <select
                        value={goodsType}
                        onChange={(e) => setGoodsType(e.target.value)}
                        className="border border-gray-300 rounded px-2 py-1"
                    >
                        <option value="">All</option>
                        <option value="Food delivery">Food Delivery</option>
                        <option value="Taxi services">Taxi services</option>
                        <option value="Socks">Socks</option>
                        <option value="Shoes">Shoes</option>
                    </select>
                </label>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Filter
                </button>
            </form>
            <Enterprises enterprises={display}></Enterprises>
        </div>
    );
}

export default AISearchBar;
