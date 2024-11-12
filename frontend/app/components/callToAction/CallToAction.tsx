'use client'
import React, { useEffect } from 'react';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CallToAction = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,  // Animation duration in milliseconds
      easing: 'ease-in-out',
      once: true // Only animate once per scroll
    });
  }, []);

  return (
    <section 
      data-aos="fade-up" // AOS animation for the section
      className="bg-gradient-to-r from-gray-400 to-gray-200 dark:from-gray-800 dark:to-gray-900 py-16 text-gray-900 dark:text-white mb-4"
    >
      <div 
        className="container mx-auto text-center px-6"
        data-aos="zoom-in" // AOS animation for the container
      >
        <h2 className="text-4xl font-extrabold mb-4 dark:text-gray-100">
          Partner with Us for Expert Solutions
        </h2>
        <p className="text-lg mb-6 dark:text-gray-300">
          Whether you need financial insights, research support, or expert consulting, we are here to help your business succeed. Get in touch today to explore our tailored solutions.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            href="/contact"
            className="bg-white dark:bg-gray-700 text-blue-600 dark:text-gray-300 px-8 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300 transform hover:scale-105"
            data-aos="fade-right" // AOS animation for the first button
            data-aos-delay="200"   // Delay for the first button animation
          >
            Schedule a Consultation
          </Link>
          <Link
            href="/services"
            className="bg-blue-600 dark:bg-blue-700 text-white dark:text-gray-300 px-8 py-3 rounded-full font-semibold shadow-md hover:bg-blue-700 dark:hover:bg-blue-600 transition duration-300 transform hover:scale-105"
            data-aos="fade-left" // AOS animation for the second button
            data-aos-delay="400" // Delay for the second button animation
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
