"use client"

import { useState } from "react";


//Form seen in recommendation page
export function RecommendForm() {

    //User's input value
    const [userInput, setUserInput] = useState('');

   
    //Function that runs when user submits recommendation form
    const handleSubmitForm = (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();    
        console.log("Submitted form:", userInput);
    };

    return (
        <div className='flex flex-col space-y-8'>
            <form className="max-w-sm">
                {/* Email field */}
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 font-medium text-gray-900 dark:text-white">Your email</label>
                    <input type="email" id="email" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 px-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                


                
                <button type="submit" className="text-white bg-good-goods-blue-900 hover:bg-sky-700 rounded-full text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
            </form>


            

        </div>
    );
  }