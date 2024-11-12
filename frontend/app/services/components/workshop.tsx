import React from 'react';
import { FaChalkboardTeacher, FaRegComments } from 'react-icons/fa';
import Image from 'next/image';

const Workshop = () => {
  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6 text-center">
        <div className="container mx-auto px-6 flex items-center mb-5">
          <div className="relative mr-4 pb-4" data-aos="fade-right">
            <span className="h-[60px] w-[60px] border-4 border-[#187ea3] bg-blue-500 rounded-full flex items-center justify-center">
              <span className="h-[40px] w-[40px] bg-white rounded-full flex items-center justify-center border-4 border-[#187ea3]">
                <span className="text-[#187ea3] font-bold text-[25px]">7</span>
              </span>
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-left underline" data-aos="fade-right">
            Workshops
          </h2>
        </div>

        {/* Icon Section */}
        <div className="flex justify-center mb-4" data-aos="fade-right">
          <FaChalkboardTeacher
            size={60}
            className="text-purple-600 dark:text-purple-400"
          />
        </div>

        {/* Description Section */}
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6" data-aos="fade-right">
          Our workshops are designed to equip participants with essential skills
          and knowledge in their respective fields.
        </p>

        {/* Workshop Offerings */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-3xl rounded-tl-full rounded-tr-none shadow-lg bg-white dark:bg-gray-800 transition-transform transform hover:scale-105" data-aos="fade-right">
            <Image
              src="/images/global2.png"
              alt="Workshop 1"
              width={300}
              height={200}
              className="rounded-lg"
              data-aos="fade-right"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4" data-aos="fade-right">
              Leadership Workshop
            </h3>
            <p className="text-gray-600 dark:text-gray-400" data-aos="fade-right">
              Enhance your leadership skills with our comprehensive workshop.
            </p>
          </div>

          <div className="p-6 rounded-tl-full rounded-tr-none rounded-br-3xl rounded-bl-3xl shadow-lg bg-white dark:bg-gray-800 transition-transform transform hover:scale-105" data-aos="fade-right">
            <Image
              src="/images/global2.png"
              alt="Workshop 2"
              width={300}
              height={200}
              className="rounded-lg"
              data-aos="fade-right"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4" data-aos="fade-right">
              Financial Literacy Workshop
            </h3>
            <p className="text-gray-600 dark:text-gray-400" data-aos="fade-right">
              Learn the essentials of personal finance and investment
              strategies.
            </p>
          </div>

          <div className="p-6 rounded-3xl shadow-lg rounded-tl-full rounded-tr-none bg-white dark:bg-gray-800 transition-transform transform hover:scale-105" data-aos="fade-right">
            <Image
              src="/images/global2.png"
              alt="Workshop 3"
              width={300}
              height={200}
              className="rounded-lg"
              data-aos="fade-right"
            />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-4" data-aos="fade-right">
              Business Strategy Workshop
            </h3>
            <p className="text-gray-600 dark:text-gray-400" data-aos="fade-right">
              Develop effective business strategies to enhance growth and
              profitability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workshop;
