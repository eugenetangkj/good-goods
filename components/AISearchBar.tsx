"use client"

import { Button, Label } from "flowbite-react";
import type { CustomFlowbiteTheme } from "flowbite-react";
import { FaArrowCircleUp } from "react-icons/fa";
import { useState } from "react";

const customTheme: CustomFlowbiteTheme = {
    button: {
      base: "rounded-full"
    },
};

const maxNumberOfCharacters = 100;

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
    );
  }