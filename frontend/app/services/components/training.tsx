import React from 'react';
import { GiTeacher, GiBrain, GiChart } from 'react-icons/gi';
import Image from 'next/image';

const Training = () => {
  const trainingSolutions = [
    {
      title: 'Professional Training Programs',
      description:
        'Enhance your skills with expert-led training programs in various fields.',
      image: '/images/global2.png',
      icon: <GiTeacher size={40} className="text-white" />,
    },
    {
      title: 'Leadership Development',
      description:
        'Courses designed to develop leadership skills for organizational success.',
      image: '/images/global2.png',
      icon: <GiBrain size={40} className="text-white" />,
    },
    {
      title: 'Business Solutions',
      description:
        'Tailored business solutions to optimize operations and drive growth.',
      image: '/images/global2.png',
      icon: <GiChart size={40} className="text-white" />,
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6" data-aos="fade-right">
        <div className="container mx-auto px-6 flex items-center mb-5">
          <div className="relative mr-4 pb-4">
            <span className="h-[60px] w-[60px] border-4 border-[#187ea3] bg-blue-500 rounded-full flex items-center justify-center">
              <span className="h-[40px] w-[40px] bg-white rounded-full flex items-center justify-center border-4 border-[#187ea3]">
                <span className="text-[#187ea3] font-bold text-[25px]">3</span>
              </span>
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-left underline" data-aos="fade-right">
            Training & Solutions
          </h2>
        </div>

        {/* Grid Layout for Training Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {trainingSolutions.map((solution, index) => (
            <div
              key={index}
              className="relative bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-transform duration-300 ease-in-out"
              data-aos="fade-right" >
              {/* Image Section */}
              <Image
                src={solution.image}
                alt={solution.title}
                width={400}
                height={250}
                className="w-full h-48 object-cover rounded-t-lg mb-6"
                data-aos="fade-right"
              />

              {/* Icon and Title */}
              <div className="flex justify-center mb-4">
                <div className="bg-[#1395af] p-4 rounded-full" data-aos="fade-right">
                  {solution.icon}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 text-center" data-aos="fade-right">
                {solution.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 text-center" data-aos="fade-right">
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Training;
