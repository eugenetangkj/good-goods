import { RxOpenInNewWindow } from "react-icons/rx";

export default function EnterpriseLocation({ name, address, openingHours }: { name: string, address: string; openingHours: string }) {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + " " + address)}`;

    return (
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col space-y-2 p-4 border text-black rounded-xl bg-white hover:bg-sky-200 duration-200 w-fit">
            <div className="text-base lg:text-md font-semibold text-good-goods-blue-800">{address}</div>
            <div className="text-sm lg:text-base text-black flex flex-row justify-start items-center space-x-4">
                <h6>Opening Hours: {openingHours}</h6>
                {<RxOpenInNewWindow className='text-black'/>  }
            </div>
        </a>
    );
}