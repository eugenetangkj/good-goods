"use client"

import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { useState, useEffect } from "react";
import { Enterprise } from "@/constants/Enterprise";
import { AdminEnterprises } from "@/components/admin/AdminEnterprises";
import LoadingIndicator from "@/components/common/LoadingIndicator";

export default function AdminDashboard() {
  // Track which tab is being selected
  const [activeTab, setActiveTab] = useState('enterprises');
  const [isLoading, setIsLoading] = useState(true);


  //Populate data when page loads
  const [socialEnterprises, setSocialEnterprises] = useState<Enterprise[]>([]); //Maintains full list of social enterprises available in MongoDB
  useEffect(() => {
    // Function to fetch data from the API
    const fetchSocialEnterprises = async () => {
      try {
        const response = await fetch("/api/socialEnterprises"); // API call to your route
        if (!response.ok) {
          throw new Error("Cannot fetch data");
        }
        const data = await response.json(); // Convert response to JSON
        console.log(data);
        setSocialEnterprises(data["enterprises"] || []); // Store the data in state
        setIsLoading(false);
      } catch (error) {
          setSocialEnterprises([]); // Store the data in state
          setIsLoading(false);
      } finally {
        // TODO: Run clean up code
      }
    };
    fetchSocialEnterprises();
  }, []);






  return (
    <div className='bg-good-goods-blue-100 p-8 h-screen flex flex-col justify-between'>
      <div className='flex flex-col justify-start'>
        <Navbar />
        {/* Body */}
        <div className='flex flex-col justify-center p-4 space-y-16 mt-12.5vh'>
          <div className='flex flex-col justify-center space-y-8'>
            <h2 className='text-good-goods-blue-900 font-semibold text-2xl sm:text-3xl lg:text-4xl'>Admin Dashboard</h2>


            {/* Tabs */}
            <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 w-fit">
                  <ul className="flex flex-wrap -mb-px">
                      <li className="me-2">
                          <div className={`inline-block p-4 ${
                              activeTab === 'enterprises'
                                ? 'text-blue-600 border-b-2 border-blue-600'
                                : 'text-gray-600 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300'
                              } rounded-t-lg cursor-pointer duration-200`} onClick={() => setActiveTab('enterprises')}>Enterprises
                          </div>
                      </li>
                      <li className="me-2">
                          <div className={`inline-block p-4 ${
                                activeTab === 'recommendations'
                                  ? 'text-blue-600 border-b-2 border-blue-600'
                                  : 'text-gray-600 border-b-2 border-transparent hover:text-gray-600 hover:border-gray-300'
                              } rounded-t-lg cursor-pointer duration-200`} onClick={() => setActiveTab('recommendations')}>Recommendations</div>
                      </li>
                  </ul>
              </div>



              {/* Conditionally render depending on which tab it is */}
              {
                (activeTab == "enterprises" && !isLoading)
                ? <AdminEnterprises enterprises={ socialEnterprises } />
                : (activeTab == "recommendations" && !isLoading)
                ? null
                : <LoadingIndicator />
                 
                 
              }
            
          </div>

        </div> 
      </div>
     

      <Footer />


    </div>
  );
}
