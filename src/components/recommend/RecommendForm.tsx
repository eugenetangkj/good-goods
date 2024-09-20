"use client"

import { useEffect, useState } from "react";
import { EmailSuccessfulToast } from "./EmailSuccessfulToast";
import { EmailUnsuccessfulToast } from "./EmailUnsuccessfulToast";


//Form seen in recommendation page
export function RecommendForm() {

    //Email input value
    const [emailInput, setEmailInput] = useState('');
    //Business name input value
    const [businessNameInput, setBusinessNameInput] = useState('');
    //Business contact input value
    const [businessContactInput, setBusinessContactInput] = useState('');
    

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



    //Function that runs when user changes email input
    const handleEmailInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailInput(event.target.value);
    };
    //Function that runs when user changes email input
     const handleBusinessNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBusinessNameInput(event.target.value);
    };
    //Function that runs when user changes enterprise contact
    const handleBusinessContactInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBusinessContactInput(event.target.value);
    };

   
    //Function that runs when user submits recommendation form
    const handleSubmitQuery = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const newMessage = "From: " + emailInput + "\n\n" + "Business to recommend: " + businessNameInput + "\n\n" + "Business Website/Location: " + businessContactInput;
            await sendEmail("Recommendation: " + businessNameInput, newMessage);
           
            //Reset fields
            setEmailInput("");
            setBusinessNameInput("");
            setBusinessContactInput("");
            } catch (error) {
                console.error("Error sending email:", error);
                setShouldModalAppear(true);
                setShouldModalShowSuccess(false);
            }
    };

    
    //Helper function that makes the API request
    const sendEmail = async (subject: string, message: string) => {
        try {
            const response = await fetch("/api/sendContactEmail", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ subject, message }),
            });
            const data = await response.json();

            if (data.status !== 200) {
                setShouldModalAppear(true);
                setShouldModalShowSuccess(false);
                throw new Error(
                    `Email API request failed with status: ${response.status}`
                );
            }
            setShouldModalAppear(true);
            setShouldModalShowSuccess(true);
            console.log(data);
        } catch (error) {
            setShouldModalAppear(true);
            setShouldModalShowSuccess(false);
            console.log(error);
            throw new Error(`Error sending email: ${(error as Error).message}`);
        }
    };


    return (
            <div>
            <form className="flex flex-col w-full sm:w-3/4 2xl:w-1/2" onSubmit={ handleSubmitQuery }>
                
                {/* Email field */}
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 font-medium text-gray-900">Your Email</label>
                    <input type="email"
                        id="email"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 px-3 "
                        value={ emailInput }
                        onChange={ handleEmailInputChange }
                        required
                    />
                </div>

                {/* Name of business */}
                <div className="mb-5">
                    <label htmlFor="nameOfBusiness" className="block mb-2 font-medium text-gray-900">Name of Business</label>
                    <input type="text"
                        id="nameOfBusiness"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 px-3 "
                        value={ businessNameInput }
                        onChange={ handleBusinessNameInputChange }
                        required
                    />
                </div>


                {/* Business Contact */}
                <div className="mb-5">
                    <label htmlFor="businessContact" className="block mb-2 font-medium text-gray-900">Website/Location of Business</label>
                    <input type="text"
                        id="businessContact"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 px-3 "
                        value={ businessContactInput }
                        onChange={ handleBusinessContactInputChange }
                        required
                    />
                </div>

                {/* Submit button */}
                <button type="submit" className="mt-4 text-white bg-good-goods-blue-900 hover:bg-sky-700 rounded-full text-sm w-full sm:w-auto px-5 sm:px-16 py-2.5 text-center self-end duration-200">Submit</button>
            </form>


            {shouldModalAppear && (
               <div className="fixed z-10 inset-0 top-36 flex justify-center items-start">
                <div>
                    {shouldModalShowSuccess ? <EmailSuccessfulToast /> : <EmailUnsuccessfulToast />}
                </div>
             </div>
            )}
            </div>
    );
  }