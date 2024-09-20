"use client"

import { FaArrowCircleUp } from "react-icons/fa";
import { useState } from "react";
import '../src/app/globals.css';

//Constants
const maxNumberOfCharacters = 100;
const promptOne = "I want to buy flowers for my friend's birthday"
const promptTwo = "I want to dine near Serangoon"


export function AISearchBar() {

    //User's input value
    const [userInput, setUserInput] = useState('');

    //Handler function that runs when user's input in search bar changes
    const handleInputChange = (event: any) => {
      const { value } = event.target;
      if (value.length <= maxNumberOfCharacters) {
        setUserInput(value);
      }
    };


    //Function that runs when user submits query
    //TODO: Update this with AI processing
    const handleSubmitQuery = (event: any) => {
        event.preventDefault();    
        console.log("Submitted query:", userInput);
    };

    return (
        <div>

            <form className="flex flex-col gap-4 space-y-8" onSubmit={ handleSubmitQuery }>
                <div>
                    <div className="relative w-4/5 mx-auto">
                        {/* Input field */}
                        <input
                            className="block border border-gray-300 bg-white text-gray-900 text-lg focus:border-cyan-500 focus:ring-cyan-500 p-4 pr-12 rounded-full"
                            style={{ width: "75%"}}
                            type="text"
                            id="searchQuery"
                            placeholder="What goods are you looking for?"
                            value={userInput}
                            onChange={handleInputChange}
                            required
                        />

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="absolute top-1/2 transform -translate-y-1/2 text-good-goods-blue-900 hover:text-gray-900 duration-200"
                            style={{ left: "70%", fontSize: "1.875rem"}}>
                            <FaArrowCircleUp />
                        </button>
                    </div>

                    {/* Character counter */}
                    <div className={`mt-4 block ${userInput.length === maxNumberOfCharacters ? 'text-red-500' : 'text-gray-500'}`}>{userInput.length} / { maxNumberOfCharacters } characters</div>
                </div>
            </form>

            {/* Suggested prompts */}
            <div className='flex gap-x-4 space-x-8 mt-8' style={{ marginTop: "2rem"}}>
                <div className='suggested-prompt px-4 py-2 rounded-full cursor-pointer duration-200 w-fit' onClick={() => setUserInput(promptOne)}>
                    <h6 className='font-bold' style={{ color: '#0369a1' }}>{ promptOne }</h6>
                </div>
                <div className='suggested-prompt px-4 py-2 rounded-full cursor-pointer duration-200 w-fit' onClick={() => setUserInput(promptTwo)}>
                    <h6 className='font-bold' style={{ color: '#0369a1' }}>{ promptTwo }</h6>
                </div>
            </div>

        </div>
    );
  }