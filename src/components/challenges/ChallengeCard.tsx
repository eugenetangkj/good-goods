import Image from "next/image"

//Card to display challenge information


interface ChallengeCardProps {
    imageLink: string,
    period: string,
    title: string,
    description: string
    route: string
}

function ChallengeCard(challenge: ChallengeCardProps) {
    return (
        <div className="bg-white border border-gray-200 rounded-2xl shadow w-full md:w-80 md:h-112 lg:w-72 lg:h-112 xl:w-128 xl:h-72 px-4 py-4 xl:py-2 flex flex-col sm:flex-row md:flex-col xl:flex-row items-center xl:space-x-2">
            <Image
                src={ challenge.imageLink }
                alt={ challenge.title }
                width={ 150 }
                height= { 96 }
                className='self-center w-[100px] h-[100px] sm:w-[125px] sm:h-[125px] xl:w-[150px] xl:h-[150px]'
            />
            <div className="p-2 flex flex-col space-y-4">
                <div>
                    <h5 className="mb-2 text-xl sm:text-2xl font-semibold text-good-goods-blue-900">{ challenge.title }</h5>
                    <div className='bg-sky-200 rounded-full p-2 w-fit h-fit'>
                        <h6 className="font-semibold text-sm tracking-tight text-good-goods-blue-900">{ challenge.period }</h6> 
                    </div>
                </div>
 
                <p className="text-sm text-gray-600 ">{ challenge.description }</p>
                <a href={ challenge.route } className='w-full'>
                    <button className='rounded-full w-full text-sm xl:text-base text-semibold text-white bg-good-goods-blue-900 hover:bg-sky-800 py-2 px-4 duration-200'>Learn more</button>
                </a>
            </div>
        </div>

    );
           
}

export default ChallengeCard;