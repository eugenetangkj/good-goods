import { EnterpriseCard } from "./EnterpriseCard";
export const Enterprises = ({enterpises})=>{
    return(
        <div className='flex flex-col justify-center items-start space-y-12'>
            <h2 className='text-good-goods-blue-900 font-semibold text-xl sm:text-2xl lg:text-3xl'>Stores</h2>
            <div className='flex flex-wrap justify-start'>
            {enterpises.map((ent) => {
                return (
                    <div 
                        key={ent.KEY} // 
                        className=' card bg-good-goods-white-500 border rounded-xl p-6 h-70 sm:h-60 w-full sm:w-72 lg:w-1/4 flex flex-row space-y-8 mb-4 mx-12 last:mb-0'
                    >
                        <EnterpriseCard enterprise={ent} />
                    </div>
                );
            })}
            </div>

        </div>
    )
}