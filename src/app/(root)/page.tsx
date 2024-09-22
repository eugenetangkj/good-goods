import { AISearchBar } from "@/components/home/AISearchBar";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { HomeExploreCards } from "@/components/home/HomeExploreCards";

export default function Home() {
  return (
    <div className='bg-good-goods-blue-100 p-8 h-screen flex flex-col justify-between'>
      <div className='flex flex-col justify-start'>
        <Navbar />
        {/* Body */}
        <div className='flex flex-col justify-center p-4 space-y-16 mt-12.5vh'>
          <div className='flex flex-col justify-center space-y-8'>
            <h2 className='text-good-goods-blue-900 font-semibold text-2xl sm:text-3xl lg:text-4xl'>Discover Socially Enterprises</h2>
            <AISearchBar />
          </div>

          {/* Explore */}
          <HomeExploreCards />

        </div> 
      </div>
     

      <Footer />


    </div>
  );
}
