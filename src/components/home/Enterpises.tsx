"use client"

import React from 'react';
import { EnterpriseCard } from "./EnterpriseCard";
import { Enterprise } from '@/constants/Enterprise';
import { useState, useEffect } from 'react';
import { breakpoints } from '@/constants';

interface EnterprisesProps {
    enterprises: Enterprise[];
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

const enterprisesPerPageDefault = 10;
const enterprisesPerPageXXL = 16;
const enterprisesPerPageXL = 12;
const enterprisesPerPageSM = 8;
const enterprisesPerPageXS = 4;


export const Enterprises: React.FC<EnterprisesProps> = ({ enterprises, currentPage, setCurrentPage }) => {

    //States to track number of enterprises per page and also current page
    const [enterprisesPerPage, setEnterprisesPerPage] = useState(enterprisesPerPageDefault);

    // Update the number of enterprises per page depending on the screen size
    const updateEnterprisesPerPage = () => {
        const screenWidth = window.innerWidth;

        if (screenWidth >= breakpoints['2.5xl']) {
            if (enterprisesPerPage != enterprisesPerPageXXL) {
                // setCurrentPage(1);      
                setEnterprisesPerPage(enterprisesPerPageXXL);
            }
        } else if (screenWidth >= breakpoints.xl) {
            if (enterprisesPerPage != enterprisesPerPageXL) {
                // setCurrentPage(1);
                setEnterprisesPerPage(enterprisesPerPageXL);
            }
        } else if (screenWidth >= breakpoints.sm) {
            if (enterprisesPerPage != enterprisesPerPageSM) {
                // setCurrentPage(1);
                setEnterprisesPerPage(enterprisesPerPageSM);
            }
        } else {
            if (enterprisesPerPage != enterprisesPerPageXS) {
                // setCurrentPage(1);
                setEnterprisesPerPage(enterprisesPerPageXS);
            }
        }
    };


    //Add event listener to detect change in window size
    useEffect(() => {
            updateEnterprisesPerPage();
            window.addEventListener('resize', updateEnterprisesPerPage);

            return () => {
                window.removeEventListener('resize', updateEnterprisesPerPage);
            };
    }, []);


    //Get enterprises for the current page
    const totalPages = Math.ceil(enterprises.length / enterprisesPerPage);
    const indexOfLastEnterprise = currentPage * enterprisesPerPage;
    const indexOfFirstEnterprise = indexOfLastEnterprise - enterprisesPerPage;
    const currentEnterprises = enterprises.slice(indexOfFirstEnterprise, indexOfLastEnterprise);

    // Handle page change
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);

        //Scroll back to top
        const element = document.getElementById('prompts');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <div className='flex flex-col items-center'>
            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2.5xl:grid-cols-4 gap-8 w-fit self-center">
                {currentEnterprises.map((ent) => (
                <EnterpriseCard key={ent.eid} enterprise={ent} />
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center flex-wrap mt-8 gap-2">
                {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`px-3 py-1 rounded-full ${
                    currentPage === i + 1 ? 'bg-good-goods-blue-900 text-white' : 'bg-gray-300 hover:bg-gray-400 duration-200'
                    }`}
                >
                    {i + 1}
                </button>
                ))}
            </div>
    </div>
    );
}
