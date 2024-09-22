export default function EnterpriseLocation({ address, openingHours }: { address: string; openingHours: string }) {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

    return (
        <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="block p-4 border border-good-goods-blue-300 rounded-lg hover:bg-blue-50 transition">
            <div className="text-lg font-semibold text-good-goods-blue-800">{address}</div>
            <div className="text-md text-good-goods-blue-600">Opening Hours: {openingHours}</div>
        </a>
    );
}
