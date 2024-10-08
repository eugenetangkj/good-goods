import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { RecommendForm } from "@/components/recommend/RecommendForm";


export default function Recommend() {
  return (
    <div className='bg-good-goods-blue-100 p-8 h-screen flex flex-col justify-between'>
      <div className='flex flex-col justify-start'>
        <Navbar />
        {/* Body */}
        <div className='flex flex-col justify-center p-4 space-y-16 mt-12.5vh'>
          <div className='flex flex-col justify-center space-y-8'>
            <h2 className='text-good-goods-blue-900 font-semibold text-2xl sm:text-3xl lg:text-4xl sm:w-3/4'>Know of a social enterprise not found in Good Goods? Let us know!</h2>
            <RecommendForm />
            
          </div>
      </div> 

      </div>
     

      <Footer />


    </div>
  );
}
