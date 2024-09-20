"use client"

import { useState } from "react";


//Form seen in recommendation page
export function RecommendForm() {

    //Email input value
    const [emailInput, setEmailInput] = useState('');
    //Business name input value
    const [businessNameInput, setBusinessNameInput] = useState('');
    //Business contact input value
    const [businessContactInput, setBusinessContactInput] = useState('');





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
          let newMessage = "From: " + emailInput + "\n\n" + businessNameInput + businessContactInput;
          await sendEmail("subject", newMessage);
        //   openModal("Message successfully sent! We will get in touch soon.");

        //Reset fields
        setEmailInput("");
        setBusinessNameInput("");
        setBusinessContactInput("");
        } catch (error) {
          console.error("Error sending email:", error);
        //   openModal("We could not receive your message. Please try again.");
        }
      };




      const sendEmail = async (subject: string, message: string) => {
        try {
            const response = await fetch("/api/sendContactEmail", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ subject, message }),
            });
        
            if (!response.ok) {
            throw new Error(
                `Email API request failed with status: ${response.status}`
            );
            }
        
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.log(error);
            throw new Error(`Error sending email: ${(error as Error).message}`);
        }
        };






















    return (
        <div className='flex flex-col space-y-8'>
            <form className="flex flex-col w-3/4 2xl:w-1/2" onSubmit={ handleSubmitQuery }>
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
                <button type="submit" className="text-white bg-good-goods-blue-900 hover:bg-sky-700 rounded-full text-sm w-full sm:w-auto px-5 sm:px-16 py-2.5 text-center self-end duration-200">Submit</button>
            </form>


            

        </div>
    );
  }