import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { upcomingOngoingChallengesData, pastChallengesData } from "@/constants/challenges";
import ChallengeCard from "@/components/challenges/ChallengeCard";


export default function Challenges() {
  return (
    <div className='bg-good-goods-blue-100 p-8 h-screen flex flex-col justify-between'>
      <div className='flex flex-col justify-start'>
        <Navbar />
        {/* Body */}
        <div className='flex flex-col justify-center p-4 space-y-16 mt-12.5vh'>
          <div className='flex flex-col justify-center space-y-16'>
            <div className='flex flex-col space-y-8'>
              {/* Upcoming and ongoing challenges  */}
              <h2 className='text-good-goods-blue-900 font-semibold text-2xl sm:text-3xl lg:text-4xl'>Upcoming and Ongoing Challenges 🎯</h2>
              <div className='grid w-full 2xl:w-3/4 2.5xl:w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2.5xl:grid-cols-3 gap-y-8'>
                {/* Iterate through upcoming and ongoing challenges*/}
                {
                  upcomingOngoingChallengesData.map((challenge, index) => {
                      return (
                        <ChallengeCard key={ index }  imageLink={ challenge.imageLink } period={ challenge.period } title={ challenge.title } description={ challenge.description } route={ challenge.route } />
                      );
                  })
                }
              </div>
            </div>
            
            {/* Past Challenges */}
            <div className='flex flex-col space-y-8'>
              <h2 className='text-good-goods-blue-900 font-semibold text-2xl sm:text-3xl lg:text-4xl'>Past Challenges 💯</h2>
              <div className='grid w-full 2xl:w-3/4 2.5xl:w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2.5xl:grid-cols-3 gap-y-8'>
                {/* Iterate through upcoming and ongoing challenges*/}
                {
                  pastChallengesData.length === 0
                  ? (<h6 className='text-good-goods-blue-900'>There are no past challenges yet.</h6>)
                  : (
                    pastChallengesData.map((challenge, index) => (
                      <ChallengeCard
                        key={ index }
                        imageLink={challenge.imageLink}
                        period={challenge.period}
                        title={challenge.title}
                        description={challenge.description}
                        route={challenge.route}
                      />
                    ))
                  )
                }
              </div>
            </div>
            
          </div>

        

        </div> 

      </div>

      <Footer />


    </div>
  );
}
