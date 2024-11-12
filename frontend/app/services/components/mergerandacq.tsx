import React from 'react';
import { FaExchangeAlt, FaHandshake, FaChartLine } from 'react-icons/fa';
import Image from 'next/image';

const MergersAndAcquisitions = () => {
  const services = [
    {
      title: 'Strategic Advisory',
      description: 'Expert guidance on mergers and acquisitions strategies.',
      image: '/images/nepal.png',
      icon: <FaExchangeAlt size={40} className="text-white" />,
      bgStyle: 'bg-purple-100 dark:bg-purple-800',
    },
    {
      title: 'Due Diligence',
      description: 'Comprehensive due diligence processes to assess risks.',
      image: '/images/nepal.png',
      icon: <FaHandshake size={40} className="text-white" />,
      bgStyle: 'bg-red-100 dark:bg-red-800',
    },
    {
      title: 'Post-Merger Integration',
      description:
        'Helping organizations successfully integrate after a merger.',
      image: '/images/nepal.png',
      icon: <FaChartLine size={40} className="text-white" />,
      bgStyle: 'bg-green-100 dark:bg-green-800',
    },
  ];

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="container mx-auto px-6 flex items-center mb-5">
          <div className="relative mr-4 pb-4" data-aos="fade-right">
            <span className="h-[60px] w-[60px] border-4 border-[#187ea3] bg-blue-500 rounded-full flex items-center justify-center">
              <span className="h-[40px] w-[40px] bg-white rounded-full flex items-center justify-center border-4 border-[#187ea3]">
                <span className="text-[#187ea3] font-bold text-[25px]">6</span>
              </span>
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-left underline" data-aos="fade-right">
            Mergers and Acquisitions
          </h2>
        </div>

        {/* Unique Layout for Each Service */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className={`relative p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 ${service.bgStyle}`}
              data-aos="fade-right" >
              {/* Background Circle for Icon */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gray-700 dark:bg-gray-500 p-4 rounded-full" data-aos="fade-right">
                {service.icon}
              </div>

              {/* Image Section */}
              <Image
                src={service.image}
                alt={service.title}
                height={100}
                width={200}
                className="object-cover rounded-lg mb-4"
                data-aos="fade-right"
              />

              {/* Text Section */}
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white" data-aos="fade-right">
                {service.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2" data-aos="fade-right">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MergersAndAcquisitions;
