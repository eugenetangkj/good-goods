"use client"
import enterprisesDetails from '../../../public/social_enterprises.json';



function FeaturedEnterpriseLink() {
  

    //Currently, it just selects the enterprise by matching index with date of the month
    //In reality, we should not do randomly, but have admin decide which to feature
    const getEnterpriseId = () => {
        const totalNumberOfEnterprises = enterprisesDetails.length;
      
        //Get current date
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate());
        const day = currentDate.getDate();

        // Calculate the selected ID based on the day and total enterprises
        const selectedId = day % totalNumberOfEnterprises;
        return selectedId;
    };
      

   
    return (
        <a href={enterprisesDetails[getEnterpriseId() - 1]?.["URL Param"] ?? "#"} className="w-fit flex flex-col space-y-2 sm:space-y-0 justify-start items-start sm:inline-flex sm:flex-row sm:justify-between sm:items-center py-2 sm:py-3 pe-4 mb-7 text-sm text-good-goods-blue-900 hover:text-sky-700 bg-transparent rounded-full hover:bg-transparent duration-200">
            
            <span className="text-xs bg-good-goods-orange-900 rounded-full text-good-goods-blue-900 font-semibold px-4 py-1.5 me-3">⭐ Featured Enterprise</span>
            <div className='flex flex-row items-center'>
                <span className="text-sm font-medium">Meet { enterprisesDetails[getEnterpriseId() - 1]?.["Enterprise Name"] ?? "Loading..."}</span> 
                <svg className="w-2.5 h-2.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
            </div>
        </a>   
    );
  }

export default FeaturedEnterpriseLink;