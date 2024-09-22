import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import Image from "next/image";
import { tasteOfGoodnessBrands } from "@/constants/challenges";

export default function TasteOfGoodness() {
  return (
    <div className='bg-good-goods-blue-100 p-8 h-screen flex flex-col justify-between'>
      <div className='flex flex-col justify-start'>
        <Navbar />
        {/* Body */}
        <div className='flex flex-col justify-center p-4 space-y-16 mt-12.5vh'>
          {/* Header */}
          <div className='space-y-2'>
            <h2 className='text-good-goods-blue-900 font-semibold text-2xl sm:text-3xl lg:text-4xl'>Taste of Goodness Challenge</h2>
            <div className='bg-sky-200 rounded-full p-2 px-4 w-fit h-fit'>
                <h6 className="font-semibold text-sm tracking-tight text-good-goods-blue-900">Upcoming</h6> 
            </div>
          </div>

          {/* Image */}
          <Image
                src= '/assets/challenges/graphic.png'
                alt='Taste of Goodness'
                width={ 150 }
                height= { 96 }
                className='self-center w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]'
          />

          {/* Description */}
          <p className='text-good-goods-blue-900'>
          Singapore is home to a growing number of F&B social enterprises—businesses that use food and beverage services as a platform to create positive social impact. By supporting these social enterprises, you can enjoy delicious food while contributing to meaningful causes.<br/><br/>
          With the <span className='font-semibold'>Taste of Goodness</span> challenge, we invite you to embark on a journey to discover the incredible work of these F&B social enterprises. It&apos;s not just about dining; it&apos;s about making a difference with every bite.
          </p>


          {/* Instructions */}
          <div className='flex flex-col space-y-2'>
            <h5 className='text-good-goods-blue-900 font-semibold text-xl sm:text-2xl lg:text-3xl'>How It Works</h5>
            <ol className='list-decimal pl-4 leading-8'>
              <li>Use Good Goods to explore and choose from a wide range of F&B social enterprises across Singapore.</li>
              <li>Head to your chosen social enterprise and make any purchase.</li>
              <li>Take an image of your purchase and add a caption describing your experience.</li>
              <li>Upload the image and caption to our challenge board.</li>
              <li>If your entry is selected, we will get in touch with you for a chance to win rewards!</li>
            </ol>
          </div>

          {/* Examples of Social Enterprises */}
          <div className='flex flex-col space-y-2'>
            <h5 className='text-good-goods-blue-900 font-semibold text-xl sm:text-2xl lg:text-3xl'>Examples of F&B Social Enterprises</h5>
            <div className='bg-white rounded-xl grid grid-cols-2 sm:grid-cols-3 w-fit gap-x-16 md:gap-x-32 px-8'>
              {/* Iterate through brand images*/}
              {
                tasteOfGoodnessBrands.map((brand, index) => {
                  return (
                      <Image key={ index } src={ brand.imageLink } alt={ brand.title } width={ 150 } height= { 96 } className='self-center w-[100px] h-[100px] md:w-[150px] md:h-[150px]' />
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
