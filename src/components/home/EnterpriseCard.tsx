import Link from 'next/link'
import Image from 'next/image'
export const EnterpriseCard = ({ enterprise }) => {
    return (
        // <Link href={`/enterprise/${enterprise.id}`} passHref>
            <div className="cursor-pointer p-6 space-y-4">
                    <div className="flex flex-row space-x-4 items-start">
                        {/* Image */}
                        <Image 
                            src={enterprise.image} 
                            alt={enterprise['store name']} 
                            width={100}
                            height={100}
                            className="rounded-lg"
                        />

                        {/* Store name and Description */}
                        <div className="flex flex-col space-y-4">
                            <h5 className="text-xl md:text-1.5xl font-semibold text-good-goods-blue-900">
                                {enterprise['store name']}
                            </h5>
                            <p className="text-sm sm:text-base line-clamp-4">
                                {enterprise.description}
                            </p>
                        </div>
                    </div>
            </div>
        // </Link>
    );
};
