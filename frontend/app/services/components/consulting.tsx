import React from 'react';
import { HiOutlineBriefcase } from 'react-icons/hi';
import { MdBusinessCenter } from 'react-icons/md';
import { FaRegChartBar } from 'react-icons/fa';
import { GiMoneyStack } from 'react-icons/gi';
import Image from 'next/image';

const Consulting = () => {
  const consultingServices = [
    {
      title: 'Business Consulting',
      description:
        'Strategic advice for businesses to enhance growth and profitability.',
      image: '/images/global2.png',
      icon: <MdBusinessCenter size={40} className="text-white" />,
    },
    {
      title: 'Financial Advisory',
      description:
        'Expert financial advice to help you navigate complex financial landscapes.',
      image: '/images/global2.png',
      icon: <FaRegChartBar size={40} className="text-white" />,
    },
    {
      title: 'Risk Management',
      description: 'Identifying and managing risks to safeguard your business.',
      image: '/images/global2.png',
      icon: <HiOutlineBriefcase size={40} className="text-white" />,
    },
    {
      title: 'Investment Consulting',
      description:
        'Guidance on investment opportunities to maximize your financial returns.',
      image: '/images/global2.png',
      icon: <GiMoneyStack size={40} className="text-white" />,
    },
  ];

  return (
    <section className="py-16 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="container mx-auto px-6 flex items-center mb-5">
          <div className="relative mr-4 pb-4" data-aos="fade-right">
            <span className="h-[60px] w-[60px] border-4 border-[#187ea3] bg-blue-500 rounded-full flex items-center justify-center">
              <span className="h-[40px] w-[40px] bg-white rounded-full flex items-center justify-center border-4 border-[#187ea3]">
                <span className="text-[#187ea3] font-bold text-[25px]">2</span>
              </span>
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-left underline" data-aos="fade-right">
            Consulting Service
          </h2>
        </div>

        {/* Service Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {consultingServices.map((service, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden`}
              data-aos="fade-right" >
              {/* Image Section */}
              <div className="w-full md:w-1/2">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={500}
                  height={300}
                  className="object-cover"
                  data-aos="fade-right"
                />
              </div>

              {/* Content Section */}
              <div className="p-6 md:w-1/2 text-center md:text-left" data-aos="fade-right">
                <div className="flex justify-center md:justify-start mb-4">
                  <div className="bg-[#1395af] p-3 rounded-full">
                    {service.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Consulting;
