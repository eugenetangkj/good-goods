import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import teamImage from "./team.png";
import Image from "next/image";

export default function About() {
  return (
    <div className="bg-good-goods-blue-100 p-8 h-screen flex flex-col justify-between">
      <Navbar />
      {/* Body */}
      <div className="flex flex-col justify-center p-4 space-y-16 mt-12.5vh sm:mt-15vh">
          {/* Title  */}
          <h2 className='text-good-goods-blue-900 font-semibold text-2xl sm:text-3xl lg:text-4xl'>Here at Good Goods, we aim to build an ecosystem of social enterprises. 🩵</h2>


          {/* What are social enterprises? */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-good-goods-blue-900 mb-4">
              What are social enterprises?
            </h2>
            <p className="text-gray-700">
              Social enterprises are business entities set up with clear social
              goals. Such social goals include provision of employment
              opportunities to the less advantaged and promoting environmental
              conservation.
            </p>
          </div>

          {/* What is Good Goods? */}
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold text-good-goods-blue-900 mb-4">
              What is Good Goods?
            </h2>
            <p className="text-gray-700">
              Good Goods makes it easy for you to discover social enterprises.
              It provides a platform for social enterprises to be known,
              allowing you to find social enterprises that offer your desired
              products.
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-wrap justify-start gap-4">
            <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow ">
              <p className="font-normal text-gray-700 dark:text-gray-400">
                🔍Find social enterprises that offer your desired products using
                our AI-powered search bar.
              </p>
            </a>
            <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow ">
              <p className="font-normal text-gray-700 dark:text-gray-400">
                🎉 Participate in challenges to show support for social
                enterprises while getting rewarded.
              </p>
            </a>
            <a className="block max-w-sm p-6 bg-white border border-gray-200 rounded-xl shadow">
              <p className="font-normal text-gray-700 dark:text-gray-400 ">
                📝 Suggest social enterprises that are not found within Good Goods.
              </p>
            </a>
          </div>
          {/* Team Section */}
          <div className="mb-10">
            <h2 className="text-xl sm:text-2xl font-semibold text-good-goods-blue-900 mb-4">
              Team behind Good Goods
            </h2>
            <p className="text-gray-700">
              We are a team participating in Open Government Product&apos;s Build for
              Good Hackathon. We are hoping through Good Goods, we can raise
              awareness for social enterprises and provide support by making it
              easier for consumers to discover them.
            </p>
            <div className="flex mt-7">
              <Image
                src={teamImage}
                alt="Team behind Good Goods"
                className="rounded-lg shadow-md"
                width={500}
                height={300}
              />
            </div>
          </div>




      </div>
      <Footer />
    </div>
  );
}
