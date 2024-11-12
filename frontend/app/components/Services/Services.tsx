'use client'

import React, { useEffect } from 'react';
import { FaChartLine, FaBusinessTime, FaUniversity, FaExchangeAlt } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles

const services = [
  { 
    title: 'Research', 
    description: 'In-depth financial and economic research solutions.',
    icon: <FaChartLine className="text-blue-500 w-9 h-9 mb-4" />
  },
  { 
    title: 'Consulting', 
    description: 'Expert consulting for business and finance sectors.',
    icon: <FaBusinessTime className="text-green-500 w-9 h-9 mb-4" />
  },
  { 
    title: 'Training', 
    description: 'Comprehensive training programs to enhance your skills in finance and business management.',
    icon: <FaExchangeAlt className="text-purple-500 w-9 h-9 mb-4" />
  },
  { 
    title: 'Education', 
    description: 'Courses and certifications in finance and management.',
    icon: <FaUniversity className="text-red-500 w-9 h-9 mb-4" />
  }
];

const Services = () => {
  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="py-5 bg-white dark:bg-gray-900 font-Josefin">
      <div className="container mx-auto px-6 text-center">
        <h2 
          className="text-3xl md:text-3xl font-semibold text-gray-900 font-Josefin dark:text-white text-left underline"
          data-aos="fade-right" // AOS animation for title
        >
          Our Core Services
        </h2>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center border-l border-r border-b border-gray-300 dark:border-gray-700"
              data-aos="zoom-in" // AOS animation for each service card
            >
              <div data-aos="flip-left" data-aos-delay="100">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{service.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 text-center">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
