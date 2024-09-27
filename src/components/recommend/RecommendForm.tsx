"use client"

import { useEffect, useState } from "react";
import { EmailSuccessfulToast } from "./EmailSuccessfulToast";
import { EmailUnsuccessfulToast } from "./EmailUnsuccessfulToast";


//Form seen in recommendation page
export function RecommendForm() {

    //Email input value
    const [emailInput, setEmailInput] = useState('');
    //Enterprise name input value
    const [enterpriseNameInput, setBusinessNameInput] = useState('');
    //Enterprise description input value
    const [descriptionInput, setDescriptionInput] = useState('');
    //Enterprise contact input value
    const [enterpriseContactInput, setBusinessContactInput] = useState('');
    

    //Controls modal
    const [shouldModalAppear, setShouldModalAppear] = useState(false);
    const [shouldModalShowSuccess, setShouldModalShowSuccess] = useState<boolean>();
    const timeoutDuration = 3000; //In ms
    const [isLoading, setIsLoading] = useState(false);


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
    //Function that runs when user changes business name input
     const handleBusinessNameInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBusinessNameInput(event.target.value);
    };
    //Function that runs when user changes description input
    const handleDescriptionInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionInput(event.target.value);
    }
    //Function that runs when user changes business contact input
    const handleBusinessContactInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBusinessContactInput(event.target.value);
    };

   
    //Function that runs when user submits recommendation form
    const handleSubmitQuery = async (event : React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const newMessage = "From: " + emailInput + "\n\n" + "Enterprise to recommend: " + enterpriseNameInput + "\n\n" + "Enterprise Description: " + descriptionInput
            + "\n\n" + "Enterprise Website/Location: " + enterpriseContactInput
            await sendEmail("Recommendation: " + enterpriseNameInput, newMessage);
           
            //Reset fields
            setEmailInput("");
            setBusinessNameInput("");
            setBusinessContactInput("");
            setDescriptionInput("");
            } catch (error) {
                console.error("Error sending email:", error);
                setShouldModalAppear(true);
                setShouldModalShowSuccess(false);
            }
    };

    
    //Helper function that makes the API request
    const sendEmail = async (subject: string, message: string) => {

        try {
            setIsLoading(true);
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
                setIsLoading(false);
                throw new Error(
                    `Email API request failed with status: ${response.status}`
                );
            }
            setShouldModalAppear(true);
            setShouldModalShowSuccess(true);
            setIsLoading(false);
            console.log(data);
        } catch (error) {
            setIsLoading(false);
            setShouldModalAppear(true);
            setShouldModalShowSuccess(false);
            console.log(error);
            throw new Error(`Error sending email: ${(error as Error).message}`);
        }
    };


    return (
            (isLoading)
            ?
            (<div className="absolute inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
                <div className="w-16 h-16 border-4 border-t-4 border-t-transparent border-white rounded-full animate-spin"></div>
            </div>)
            :(<div>
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

                {/* Name of enterprise */}
                <div className="mb-5">
                    <label htmlFor="nameOfEnterprise" className="block mb-2 font-medium text-gray-900">Name of Enterprise</label>
                    <input type="text"
                        id="nameOfEnterprise"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 px-3 "
                        value={ enterpriseNameInput }
                        onChange={ handleBusinessNameInputChange }
                        required
                    />
                </div>

                {/* Description of Enterprise */}
                <div className="mb-5">
                    <label htmlFor="descriptionOfEnterprise" className="block mb-2 font-medium text-gray-900">Description of Enterprise</label>
                    <textarea
                    id="descriptionOfEnterprise"
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 px-3"
                    value={descriptionInput}
                    onChange={ handleDescriptionInputChange }
                    rows={2}
                    required
                    ></textarea>

                </div>




                {/* Enterprise Contact */}
                <div className="mb-5">
                    <label htmlFor="enterpriseContact" className="block mb-2 font-medium text-gray-900">Website/Location of Enterprise</label>
                    <input type="text"
                        id="enterpriseContact"
                        className="bg-white border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 px-3 "
                        value={ enterpriseContactInput }
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
            </div>)
    );
  }