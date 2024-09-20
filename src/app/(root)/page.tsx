import { AISearchBar } from "@/components/AISearchBar";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";

export default function Home() {
  return (
    <div className='bg-good-goods-blue-100 w-screen h-screen p-8'>
      <Navbar />
        <div className='flex flex-col justify-center h-screen-4/5 p-4 space-y-8 mt-10vh'>
          <h2 className='text-good-goods-blue-900 font-semibold text-2xl sm:text-3xl lg:text-4xl'>What kind of good are you looking to do today?</h2>
          <AISearchBar />
        </div> 
      <Footer />
    </div>
  );
}
