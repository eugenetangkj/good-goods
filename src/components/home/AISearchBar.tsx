"use client"

import { FaArrowCircleUp } from "react-icons/fa";
import { useState } from "react";

//Constants
const maxNumberOfCharacters = 100;
const promptOne = "I want to dine near Serangoon"
const promptTwo = "I want catering services"


export function AISearchBar() {

    //User's input value
    const [userInput, setUserInput] = useState('');

    //Handler function that runs when user's input in search bar changes
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      if (value.length <= maxNumberOfCharacters) {
        setUserInput(value);
      }
    };


    //Function that runs when user submits query
    //TODO: Update this with AI processing
    const handleSubmitQuery = async(event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();    
        console.log("Submitted query:", userInput);
        try {
            console.log('About to make API call.')
            const response = await fetch("/api/queryChatbot", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ question: userInput }), // Send the user input as the question
            })
            console.log (response)
        }
        catch{
            console.log('Ran into an error.')
        }
    };

    return (
        <div className='flex flex-col space-y-8'>

            <form className="flex flex-col gap-4 space-y-8" onSubmit={ handleSubmitQuery }>
                <div>
                    <div className="relative lg:w-4/5">
                        {/* Input field */}
                        <input
                            className="block border border-gray-300 bg-white text-gray-900 text-sm sm:text-base md:text-lg focus:border-cyan-500 focus:ring-cyan-500 p-3 lg:p-4 pr-12 rounded-full w-full sm:w-4/5 lg:w-3/4"
                            type="text"
                            id="searchQuery"
                            placeholder="What goods or services are you looking for?"
                            value={userInput}
                            onChange={handleInputChange}
                            required
                        />

                        {/* Submit button */}
                        <button
                            type="submit"
                            className="absolute top-1/2 left-0.9 sm:left-0.7 text-xl sm:text-2xl lg:text-3xl transform -translate-y-1/2 text-good-goods-blue-900 hover:text-gray-900 duration-200">
                            <FaArrowCircleUp />
                        </button>
                    </div>

                    {/* Character counter */}
                    <div className={`mt-4 text-sm sm:text-base block ${userInput.length === maxNumberOfCharacters ? 'text-red-500' : 'text-gray-500'}`}>{userInput.length} / { maxNumberOfCharacters } characters</div>
                </div>
            </form>

            {/* Suggested prompts */}
            <div className='flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 mt-8'>
                <div className='bg-sky-200 hover:bg-sky-300 px-4 py-2 text-sm md:text-base rounded-full cursor-pointer duration-200 w-fit' onClick={() => setUserInput(promptOne)}>
                    <h6 className='font-bold text-good-goods-blue-900'>{ promptOne }</h6>
                </div>
                <div className='bg-sky-200 hover:bg-sky-300 px-4 py-2 text-sm md:text-base rounded-full cursor-pointer duration-200 w-fit' onClick={() => setUserInput(promptTwo)}>
                    <h6 className='font-bold text-good-goods-blue-900'>{ promptTwo }</h6>
                </div>
            </div>

        </div>
    );
  }