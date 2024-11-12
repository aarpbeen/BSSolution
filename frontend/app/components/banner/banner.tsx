'use client';

import { FC, useEffect, useState } from 'react';
import Image from 'next/image';
import { HiOutlineSearch } from 'react-icons/hi';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles



const images = [
  '/images/nepal.png',
  '/images/finance.png',
  '/images/global2.png',
  '/images/global3.png'
];

const Banner: FC<Props> = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Initialize AOS
    AOS.init({ duration: 1000, once: true });

    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex: number) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative w-full h-full bg-white dark:bg-gray-900 flex items-center mt-12 p-12">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center h-full px-6 lg:px-8">
        {/* Left side with image inside a circle */}
        <div
          className="relative w-full lg:w-1/2 h-full flex justify-center items-center mt-8 lg:mt-12 md:mt-9"
          data-aos="fade-right" // Apply AOS animation to the image side
        >
          <div className="relative w-[80%] sm:w-[65%] aspect-square rounded-full overflow-hidden shadow-sm">
            {/* Background Animation Layer */}
            <div className="absolute inset-0 hero_animation rounded-full dark:bg-gray-800"></div>
            <Image
              src={images[currentIndex]}
              alt={`Image ${currentIndex + 1}`}
              layout="fill"
              objectFit="contain"
              className="rounded-full z-10 object-contain"
            />
          </div>
        </div>

        {/* Right side with text and search box */}
        <div
          className="w-full lg:w-1/2 flex flex-col justify-center lg:items-start text-center lg:text-left mt-8 md:mt-9 sm:items-center"
          data-aos="fade-left" // Apply AOS animation to the text side
        >
          <h1
            className="text-4xl sm:text-4xl font-bold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 transform hover:scale-105 transition-transform duration-300"
            data-aos="fade-up" // Add AOS animation for the title
          >
            Empowering Business <br />
            through Research, Consulting, <br />
            Training, and Education
          </h1>

          <p
            className="text-base sm:text-lg dark:text-white text-gray-900 mb-4"
            data-aos="fade-up" // Animate the paragraph text
            data-aos-delay="200"
          >
            We have <span className="font-bold text-yellow-400">40+</span>{' '}
            Partners &{' '}
            <span className="font-bold text-yellow-400">10+</span> Financial institutions linked with us. Find your requirement from here.
          </p>

          {/* Search box */}
          <div
            className="1500:w-[55%] 1100px:w-[78%] w-[90%] flex flex-col sm:flex-row mb-4"
            data-aos="fade-up" // Apply AOS to the search box
            data-aos-delay="300"
          >
            <input
              type="text"
              placeholder="Search Courses"
              className="flex-grow p-3 rounded-t-md sm:rounded-l-md sm:rounded-t-none focus:outline-none mb-2 sm:mb-0 
  bg-gray-100 bg-opacity-75 text-gray-900 border border-gray-300 shadow-sm 
  dark:bg-gray-800 dark:bg-opacity-75 dark:text-white dark:border-gray-600"
            />
            <button className="bg-yellow-400 text-black p-3 rounded-b-md sm:rounded-r-md sm:rounded-b-none flex items-center justify-center">
              <HiOutlineSearch size={25} />
            </button>
          </div>

          {/* Trust statement */}
          <div
            className="flex justify-center lg:justify-start items-center"
            data-aos="fade-up" // Animate the trust section
            data-aos-delay="400"
          >
            <div className="flex -space-x-2">
              {/* Sample user avatars */}
              <Image
                src="/images/avatar.png"
                alt="User"
                width={45}
                height={45}
                className="rounded-full border-2 border-white dark:border-gray-700"
              />
              <Image
                src="/images/avatar.png"
                alt="User"
                width={45}
                height={45}
                className="rounded-full border-2 border-white dark:border-gray-700"
              />
              <Image
                src="/images/avatar.png"
                alt="User"
                width={45}
                height={45}
                className="rounded-full border-2 border-white dark:border-gray-700"
              />
            </div>
            <p className="text-gray-900 dark:text-white ml-4 text-sm sm:text-base">
              <span className="font-bold">100+</span> People already trusted us.{' '}
              <a href="/courses" className="underline text-yellow-400">
                View Our Partners
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
