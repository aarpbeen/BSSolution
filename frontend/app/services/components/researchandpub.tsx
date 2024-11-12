'use client';

import Image from 'next/image';

import { GiImpactPoint } from 'react-icons/gi';
import { MdPolicy } from 'react-icons/md';
import { GiArchiveResearch } from 'react-icons/gi';
import { PiMapPinSimpleAreaBold } from 'react-icons/pi';
import { LuDatabaseBackup } from 'react-icons/lu';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Researchandpub = () => {
  const researchAreas = [
    {
      title: 'Market Research and Analysis',
      description:
        'In-depth analysis of market trends, customer behaviors, and competitor strategies.',
      image: '/images/nepal.png',
      icon: (
        <GiArchiveResearch size={40} className="text-[#1395af] mx-auto mb-4" />
      ),
    },
    {
      title: 'Impact Assessment Studies',
      description:
        'Evaluating the effects of policies and programs on various sectors.',
      image: '/images/nepal.png',
      icon: <GiImpactPoint size={40} className="text-[#1395af] mx-auto mb-4" />,
    },
    {
      title: 'Policy Development and Evaluation',
      description: 'Assisting in formulating and assessing effective policies.',
      image: '/images/nepal.png',
      icon: <MdPolicy size={40} className="text-[#1395af] mx-auto mb-4" />,
    },
    {
      title: 'Sector-Specific Research',
      description:
        'Research tailored for specific sectors like finance, education, and health.',
      image: '/images/nepal.png',
      icon: (
        <PiMapPinSimpleAreaBold
          size={40}
          className="text-[#1395af] mx-auto mb-4"
        />
      ),
    },
    {
      title: 'Data Collection and Analysis',
      description:
        'Comprehensive data gathering and analytical services to inform decision-making.',
      image: '/images/nepal.png',
      icon: (
        <LuDatabaseBackup size={40} className="text-[#1395af] mx-auto mb-4" />
      ),
    },
  ];

  // Slider settings for the images
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 mb-4 flex items-center">
        <div className="relative mr-4 pb-4" data-aos="fade-right">
          <span className="h-[60px] w-[60px] border-4 border-[#187ea3] bg-blue-500 rounded-full flex items-center justify-center">
            <span className="h-[40px] w-[40px] bg-white rounded-full flex items-center justify-center border-4 border-[#187ea3]">
              <span className="text-[#187ea3] font-bold text-[25px]">1</span>
            </span>
          </span>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 text-left underline"
        data-aos="fade-right"
        >
          Research & Publications
        </h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between">
        <div className="md:w-1/2 p-6">
          <div className="flex justify-center">
            <div className="relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12" data-aos="fade-right">
                {/* Timeline events */}
                {researchAreas &&
                  researchAreas.map((res, index) => (
                    <div
                      className="relative bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out"
                      key={index} data-aos="fade-right"
                    >
                      {/* Centered Icon at the top */}
                      <div className="absolute left-1/2 top-0 transform -translate-x-1/2 -translate-y-1/2  w-12 h-12 rounded-full flex items-center justify-center shadow-md" >
                        {/* <div className="text-white dark:text-gray-800">{res.icon} </div> */}
                        {res.icon}
                      </div>

                      {/* Content section */}
                      <div className="pt-8">
                        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white text-center">
                          {res.title}
                        </h3>
                        <p className="mt-4 text-gray-600 dark:text-gray-400 text-center leading-relaxed">
                          {res.description}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          {/* You can add more text or elements here */}
        </div>

        <div className="md:w-1/2 p-6" data-aos="fade-up-left">
          <Slider {...settings}>
            {researchAreas.map((res, index) => (
              <div key={index}>
                <Image
                  src={res.image}
                  height={600}
                  width={600}
                  alt={res.title}
                  className="rounded-lg shadow-lg"
                  data-aos="fade-up-left"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Researchandpub;
