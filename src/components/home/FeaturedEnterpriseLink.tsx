"use client"
import { useState, useEffect } from 'react';


interface Enterprise {
    storeName: string;
    location: string;
    typeOfStore: string;
    typeOfGoodsOffered: string;
  }
  

function FeaturedEnterpriseLink() {
    const [enterprises, setEnterprises] = useState<Enterprise[]>([]);

    useEffect(() => {
      // Fetch the JSON data
      fetch('/data/social_enterprises.json')
        .then((response) => response.json())
        .then((data) => setEnterprises(data));
    }, []);


    //Currently, it just selects the enterprise by matching index with date of the month
    //In reality, we should not do randomly, but have admin decide which to feature
    const getEnterpriseId = () => {
        const totalNumberOfEnterprises = enterprises.length;
      
        //Get current date
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate());
        const day = currentDate.getDate();

        // Calculate the selected ID based on the day and total enterprises
        const selectedId = day % totalNumberOfEnterprises;
        return selectedId;
    };
      

   
    return (
        <a href={
            (enterprises[getEnterpriseId() - 1]?.storeName)
            ? "/businesses/" + (enterprises[getEnterpriseId() - 1]?.storeName)
            : '#'} className="w-fit flex flex-col space-y-2 sm:space-y-0 justify-start items-start sm:inline-flex sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 pe-4 mb-7 text-sm text-good-goods-blue-900 hover:text-sky-700 bg-transparent rounded-full hover:bg-transparent duration-200">
            
            <span className="text-xs bg-good-goods-blue-900 rounded-full text-white px-4 py-1.5 me-3">⭐ Featured Enterprise</span>
            <div className='flex flex-row items-center'>
                <span className="text-sm font-medium">Meet { enterprises[getEnterpriseId() - 1]?.storeName ?? "Loading..."}</span> 
                <svg className="w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
            </div>
        </a>   
    );
  }

export default FeaturedEnterpriseLink;