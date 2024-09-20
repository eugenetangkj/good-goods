import { AISearchBar } from "@/components/AISearchBar";
import { Navbar } from "@/components/common/Navbar";

export default function Home() {
  return (
    <div className="bg-good-goods-blue-100 w-screen h-screen p-8">
      <Navbar />
      <div className='flex flex-col justify-center h-screen-4/5 p-8 space-y-8'>
        <h2 className='text-good-goods-blue-900 font-semibold text-4xl'>What kind of good are you looking to do today?</h2>
        <AISearchBar />
      </div> 
    </div>
  );
}
