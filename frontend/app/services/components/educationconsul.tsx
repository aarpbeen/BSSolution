import React from 'react';
import {
  FaRegFileAlt,
  FaChalkboardTeacher,
  FaGraduationCap,
  FaUserGraduate,
  FaBriefcase,
} from 'react-icons/fa';
import Image from 'next/image';

const EducationConsultancy = () => {
  const consultancyServices = [
    {
      title: 'Academic Guidance',
      description:
        'Providing expert advice on course selection, university admissions, and career paths.',
      image: '/images/global2.png',
      icon: <FaChalkboardTeacher size={50} className="text-[#1395af]" />,
    },
    {
      title: 'Course Development',
      description:
        'Tailoring programs to meet the specific needs of educational institutions.',
      image: '/images/global2.png',
      icon: <FaRegFileAlt size={50} className="text-[#1395af]" />,
    },
    {
      title: 'Scholarship Assistance',
      description:
        'Helping students find and apply for scholarships and financial aid.',
      image: '/images/global2.png',
      icon: <FaGraduationCap size={50} className="text-[#1395af]" />,
    },
    {
      title: 'Career Counseling',
      description:
        'Guiding students on career choices, internships, and job placements.',
      image: '/images/global2.png',
      icon: <FaUserGraduate size={50} className="text-[#1395af]" />,
    },
    {
      title: 'Study Abroad Consulting',
      description:
        'Assisting students with the process of studying overseas, including visa applications.',
      image: '/images/global2.png',
      icon: <FaBriefcase size={50} className="text-[#1395af]" />,
    },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-6">
        <div className="container mx-auto px-6 flex items-center mb-5">
          <div className="relative mr-4 pb-4" data-aos="fade-right">
            <span className="h-[60px] w-[60px] border-4 border-[#187ea3] bg-blue-500 rounded-full flex items-center justify-center">
              <span className="h-[40px] w-[40px] bg-white rounded-full flex items-center justify-center border-4 border-[#187ea3]">
                <span className="text-[#187ea3] font-bold text-[25px]">4</span>
              </span>
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-left underline" data-aos="fade-right">
            Education Consultancy
          </h2>
        </div>

        {/* Unique Layout for Consultancy Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {consultancyServices.map((service, index) => (
            <div
              key={index}
              className="flex items-start bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              data-aos="fade-right">
              {/* Icon Section */}
              <div className="mr-4" data-aos="fade-right">{service.icon}</div>

              {/* Content Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2" data-aos="fade-right">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400" data-aos="fade-right">
                  {service.description}
                </p>
              </div>

              {/* Image Section */}
              <Image
                src={service.image}
                alt={service.title}
                width={150}
                height={150}
                className="rounded-lg ml-auto"
                data-aos="fade-right"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationConsultancy;
