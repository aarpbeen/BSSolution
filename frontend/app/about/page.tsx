'use client';

import Image from 'next/image';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { HiMiniPlayCircle } from "react-icons/hi2";

const AboutUs = () => {

  return (
    <div className="bg-white dark:bg-gray-900 py-5 px-4 lg:px-12 mt-8 font-Josefin">
      <div className="max-w-6xl mx-auto space-y-16">

        {/* Overview Section */}
        <section
          id="overview"
          className="flex flex-col lg:flex-row items-center mt-24 mb-24"
          data-aos="fade-up"
        >
          <div className="lg:w-1/2 relative h-96 mt-4">
            <Image
              src="/images/overview.png"
              alt="Company Overview"
              layout="fill"
              objectFit="cover"
              className="transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="lg:w-1/2 space-y-6 mt-8 lg:mt-0 lg:pl-12">
            <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4" data-aos="fade-right">
              Company Overview
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300" data-aos="fade-right">
              Established in [Year], we specialize in delivering world-class financial consulting and educational services. Our mission is centered around innovation, quality, and unparalleled customer satisfaction.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We provide expert financial consulting, in-depth research, and high-quality training to meet the demands of our diverse clientele.
            </p>
          </div>
        </section>

        <hr />

        {/* CEO's Message */}
        <section
          id="ceoMessage"
          className="relative mt-8 flex flex-col lg:flex-row items-center overflow-hidden px-8"
          data-aos="fade-right"
        >
          <div className="lg:w-1/2 flex flex-col items-start space-y-6 lg:pr-8">
            <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">CEO’s Message</h2>
            <p className="text-lg italic text-gray-600 dark:text-gray-300">
              At [Company Name], we empower our clients through top-notch services. Our commitment to excellence drives us to innovate and adapt to the ever-changing market landscape.
            </p>
            <p className="text-lg font-semibold text-gray-600 dark:text-gray-300">— Bishnu Prasad Khanal, CEO</p>
          </div>
          <div className="lg:w-1/2 mt-8 lg:mt-0 flex justify-center">
            <Image
              src="/images/nepal.png"
              alt="CEO's Photo"
              layout="responsive"
              width={250}
              height={400}
              className="transform hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-100 clip-path-custom opacity-30 z-0"></div>
        </section>

        <hr />

        {/* Team Section */}
        <section id="team" className="text-center" data-aos="fade-right">
          <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-8">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {['nepal', 'nepal', 'nepal'].map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl"
              >
                <Image
                  src={`/images/${member}.png`}
                  alt={`Team Member ${index + 1}`}
                  width={150}
                  height={150}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Team Member {index + 1}</h3>
                <p className="text-gray-500 dark:text-gray-400">Position</p>
              </div>
            ))}
          </div>
        </section>

        <hr />

        {/* Partners Section */}
        <section id="partners" className="text-center" data-aos="fade-right">
          <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-8">Our Partners</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            We work with leading organizations to enhance our service offerings globally.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(partner => (
              <div
                key={partner}
                className="bg-white dark:bg-gray-800 rounded-full shadow-lg p-6 hover:scale-105 flex flex-col items-center"
              >
                <Image 
                  src="/images/logo.png" 
                  alt={`Partner ${partner} Logo`} 
                  width={100}
                  height={100}
                  className="h-16 mb-4 rounded-full dark:filter dark:invert dark:brightness-0 dark:contrast-200"
                />
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Partner {partner}</h3>
                <p className="text-gray-600 dark:text-gray-300">Description for Partner {partner}</p>
              </div>
            ))}
          </div>
        </section>

        <hr />

        {/* Timeline Section */}
        <section id="timeline" className="text-center">
          <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-8">Our Journey</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
            {[2020, 2021, 2022].map((year, index) => (
              <div key={index} className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                <div className="absolute left-0 top-1/2 bg-[#1395af] w-8 h-8 rounded-full flex items-center justify-center transform -translate-y-1/2">
                  <HiMiniPlayCircle size={30} className="text-white dark:text-black" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white pl-12">
                  {year} - {year === 2020 ? 'Foundation' : year === 2021 ? 'First Milestone' : 'Expansion'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 pl-12">
                  {year === 2020 ? 'Our company was founded with a vision to innovate and lead in the industry.' : year === 2021 ? 'Achieved our first major milestone, launching our flagship product.' : 'Expanded our services to new markets and enhanced our offerings.'}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
