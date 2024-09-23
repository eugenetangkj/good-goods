import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import { tasteOfGoodnessBrands, tasteOfGoodnessInstructions } from "@/constants/challenges";

export default function TasteOfGoodness() {
  return (
    <div className='bg-good-goods-blue-100 p-8 h-screen flex flex-col justify-between'>
      <div className='flex flex-col justify-start'>
        <Navbar />
        {/* Body */}
        <div className='flex flex-col justify-center p-4 space-y-16 mt-12.5vh'>
          {/* Header */}
          <div className='flex flex-row justify-between items-center sm:w-4/5 space-x-8'>
            {/* Header */}
            <div className='space-y-2'>
              <h5 className='font-bold text-sm text-sky-700'>Challenge</h5>
              <h2 className='text-good-goods-blue-900 font-semibold text-2xl sm:text-3xl lg:text-4xl'>Taste of Goodness</h2>
              <div className='bg-sky-200 rounded-full p-2 px-4 w-fit h-fit'>
                  <h6 className="font-semibold text-sm tracking-tight text-good-goods-blue-900">Upcoming</h6> 
              </div>
            </div>

            {/* Image */}
            <Image
                  src= '/assets/challenges/graphic.png'
                  alt='Taste of Goodness'
                  width={ 200 }
                  height= { 200 }
                  className='self-center w-[150px] h-[150px] lg:w-[250px] lg:h-[250px]'
            />
          </div>
          

          {/* Description */}
          <p className='text-gray-700'>
          Singapore is home to a growing number of F&B social enterprises—businesses that use food and beverage services as a platform to create positive social impact. By supporting these social enterprises, you can enjoy delicious food while contributing to meaningful causes.<br/><br/>
          With the <span className='font-semibold'>Taste of Goodness</span> challenge, we invite you to embark on a journey to discover the incredible work of these F&B social enterprises. It&apos;s not just about dining; it&apos;s about making a difference with every bite.
          </p>


          {/* Instructions */}
          <div className='flex flex-col space-y-4'>
            <h5 className='text-good-goods-blue-900 font-semibold text-xl sm:text-2xl lg:text-3xl'>How It Works</h5>
            <div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 2.5xl:grid-cols-4 w-fit gap-x-8 gap-y-8'>
              {
                  tasteOfGoodnessInstructions.map((instruction, index) => {
                      return (
                        <div key={ index } className="bg-white border border-gray-200 rounded-2xl shadow w-64 xs:w-full sm:h-56 md:w-80 lg:w-96 md:h-48 px-4 py-8 flex flex-row space-x-6 items-center">
                          <Image src={ instruction.imageLink } alt={ instruction.step } width={ 200 } height= { 200 } className='self-center w-[100px] h-[100px]'/>
                          <div className='flex flex-col space-y-4'>
                            <h6 className='text-good-goods-blue-900 font-semibold text-lg sm:text-xl lg:text-2xl'>{ instruction.step }</h6>
                            <p className='text-sm text-gray-600'>{ instruction.content }</p>
                          </div>
                        </div>
                      );
                  })
              }
            </div>
          </div>

          {/* Examples of Social Enterprises */}
          <div className='flex flex-col space-y-4'>
            <h5 className='text-good-goods-blue-900 font-semibold text-xl sm:text-2xl lg:text-3xl'>Examples of F&B Social Enterprises</h5>
            <div className='bg-white rounded-xl grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 w-full sm:w-fit gap-x-16 md:gap-x-32 gap-y-4 px-8 justify-items-center'>
              {/* Iterate through brand images*/}
              {
                tasteOfGoodnessBrands.map((brand, index) => {
                  return (
                      <Image key={ index } src={ brand.imageLink } alt={ brand.title } width={ 150 } height= { 96 } className='self-center w-[100px] h-[100px]' />
                  );
                })
              }
            
          </div>

            
          </div>


        </div> 

      </div>

      <Footer />


    </div>
  );
}
