"use client"

import { FaArrowCircleUp } from "react-icons/fa";
import { useState } from "react";
import doc from "../../constants/social_enterprises.json"
import { Enterprises } from "./Enterpises";

// Constants
const maxNumberOfCharacters = 100;
const promptOne = "I want to dine near Serangoon"
const promptTwo = "I want catering services"
const docs = doc

export function AISearchBar() {
    const [userInput, setUserInput] = useState('');
    const [display, setDisplay] = useState(docs);
    const [format, setFormat] = useState('');
    const [region, setRegion] = useState('');
    const [goodsType, setGoodsType] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        if (value.length <= maxNumberOfCharacters) {
            setUserInput(value);
        }
    };

    const handleSubmitQuery = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Submitted query:", userInput);
        try {
            const response = await fetch("/api/queryChatbot", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ question: userInput }),
            });
            const test = await response.json();
            const keep = JSON.parse(test.answer);
            const newDisplay = docs.filter(x => keep.includes(x.ID));
            console.log(newDisplay)
            setDisplay(newDisplay);
        } catch {
            console.log('Ran into an error.');
            setUserInput("No result found. Please try a different search parameter.")
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
            <form className="flex flex-col gap-4 space-y-8" onSubmit={handleSubmitQuery}>
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
                    <button
                        type="submit"
                        className="absolute top-1/2 left-0.9 sm:left-0.7 text-xl sm:text-2xl lg:text-3xl transform -translate-y-1/2 text-good-goods-blue-900 hover:text-gray-900 duration-200"
                    >
                        <FaArrowCircleUp />
                    </button>
                </div>
                <div className={`mt-4 text-sm sm:text-base block ${userInput.length === maxNumberOfCharacters ? 'text-red-500' : 'text-gray-700'}`}>
                    {userInput.length} / {maxNumberOfCharacters} characters
                </div>
            </form>
            {/* Suggested prompts */}
            <div className='flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 mt-8'>
                <div className='bg-sky-200 hover:bg-sky-300 px-4 py-2 text-sm md:text-base rounded-full cursor-pointer duration-200 w-fit' onClick={() => setUserInput(promptOne)}>
                    <h6 className='font-bold text-good-goods-blue-900'>{promptOne}</h6>
                </div>
                <div className='bg-sky-200 hover:bg-sky-300 px-4 py-2 text-sm md:text-base rounded-full cursor-pointer duration-200 w-fit' onClick={() => setUserInput(promptTwo)}>
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
