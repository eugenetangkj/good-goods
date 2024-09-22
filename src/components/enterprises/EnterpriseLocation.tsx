export default function EnterpriseLocation({ address, openingHours }: { address: string, openingHours: string }) {
    return (
        <div className="space-y-2 p-4 border border-good-goods-blue-300 rounded-lg">
            <div className="text-lg font-semibold text-good-goods-blue-800">{address}</div>
            <div className="text-md text-good-goods-blue-600">Opening Hours: {openingHours}</div>
        </div>
    );
}