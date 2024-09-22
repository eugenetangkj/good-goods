export function HomeExploreCards() {

   
    return (
        <div className='flex flex-col justify-center items-start space-y-4'>
            <h2 className='text-good-goods-blue-900 font-semibold text-xl sm:text-2xl lg:text-3xl'>Explore</h2>
            
            {/* Business of the Day */}
            <div className='flex flex-col space-y-8 sm:flex-row sm:space-x-8 sm:space-y-0'>
                {/* Business of the Day */}
                <div className='bg-good-goods-blue-500 rounded-xl p-6 h-70 sm:h-60 sm:w-72 lg:h-56 lg:w-112 flex flex-col space-y-8'>
                    <div className='flex flex-col space-y-4'>
                        <h5 className='text-xl md:text-2xl font-semibold text-good-goods-blue-900'>⭐ Business of the Day</h5>
                        <p className='text-sm sm:text-base'>Discover a new socially conscious business every day</p>
                    </div>
                    <a href='#' className='w-full'>
                        <button className='rounded-full w-full text-sm sm:text-base text-semibold text-white bg-good-goods-blue-900 hover:bg-sky-700 py-2 px-4 duration-200'>Let&apos;s go</button>
                    </a>
                </div>

                {/* Challenges */}
                <div className='bg-good-goods-orange-900 rounded-xl p-6 h-70 sm:h-60 sm:w-72 lg:h-56 lg:w-112 flex flex-col space-y-8'>
                    <div className='flex flex-col space-y-4'>
                        <h5 className='text-xl md:text-2xl font-semibold text-good-goods-blue-900 '>🫶 Challenges</h5>
                        <p className='text-sm sm:text-base'>Join exciting challenges to support socially conscious businesses and earn rewards</p>
                    </div>
                    <a href='#' className='w-full'>
                        <button className='rounded-full w-full text-semibold text-white bg-good-goods-blue-900 hover:bg-sky-700 py-2 px-4 duration-200'>Let&apos;s go</button>
                    </a>
                </div>


             


                


                

            </div>

            
        </div>
        
    );
  }