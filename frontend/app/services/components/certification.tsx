import React from 'react';
import { FaCertificate, FaBook, FaRegClock } from 'react-icons/fa';
import Image from 'next/image';

const CertificationCourses = () => {
  const courses = [
    {
      title: 'Management Certification',
      description:
        'A comprehensive program designed to enhance management skills.',
      image: '/images/finance.png',
      icon: <FaCertificate size={40} className="text-white" />,
      bgStyle: 'bg-blue-100 dark:bg-blue-800',
    },
    {
      title: 'Banking Certification',
      description:
        'Specialized training for banking professionals to excel in their field.',
      image: '/images/finance.png',
      icon: <FaBook size={40} className="text-white" />,
      bgStyle: 'bg-yellow-100 dark:bg-yellow-800',
    },
    {
      title: 'Project Management',
      description:
        'Master the art of project management with our certified course.',
      image: '/images/finance.png',
      icon: <FaRegClock size={40} className="text-white" />,
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
                <span className="text-[#187ea3] font-bold text-[25px]">5</span>
              </span>
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-left underline" data-aos="fade-right">
            Certification Courses
          </h2>
        </div>

        {/* Unique Left-Right Layout for Each Course */}
        <div className="space-y-10">
          {courses.map((course, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105 ${
                course.bgStyle
              } ${index % 2 === 0 ? 'flex-row-reverse' : 'flex-row'}`}
              data-aos="fade-right" >
              {/* Image Section */}
              <div className="flex w-1/2">
                <Image
                  src={course.image}
                  alt={course.title}
                  height={100}
                  width={200}
                  className="object-cover rounded-lg"
                  data-aos="fade-right"
                />
              </div>

              {/* Text Section */}
              <div className="flex-grow space-y-4 text-left w-1/2" data-aos="fade-right">
                <div className="flex items-center">
                  <div className="p-3 bg-gray-700 dark:bg-gray-500 rounded-full" data-aos="fade-right"> 
                    {course.icon}
                  </div>
                  <h3 className="text-2xl font-semibold ml-4 text-gray-900 dark:text-white" data-aos="fade-right">
                    {course.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300" data-aos="fade-right">
                  {course.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationCourses;
