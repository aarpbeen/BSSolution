'use client';

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Image from 'next/image';

const testimonials = [
  {
    name: 'Sarah Williams',
    position: 'CEO, Fintech Innovators',
    feedback:
      'B.S. Global provided exceptional research insights that helped us make informed decisions on our strategic financial moves. Their expertise is unmatched!',
    image: '/images/testimonial-sarah.jpg',
  },
  {
    name: 'James Smith',
    position: 'Head of Business Strategy, FutureCorp',
    feedback:
      'The consultancy services offered by B.S. Global have transformed our approach to business. Their deep knowledge of market trends helped us refine our strategy.',
    image: '/images/testimonial-james.jpg',
  },
  {
    name: 'Alicia Brown',
    position: 'Founder, Global Markets Inc.',
    feedback:
      'Their education and certification programs are top-notch. We were able to upskill our employees and achieve greater results thanks to their courses.',
    image: '/images/testimonial-alicia.jpg',
  },
];

const Testimonials = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      easing: 'ease-in-out', // Type of animation easing
      once: true, // Whether animation should happen only once or every time you scroll
    });
  }, []);

  return (
    <section className="bg-gray-100 py-5 font-Josefin dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <h2
          className="text-3xl font-semibold text-gray-800 dark:text-gray-100 text-left underline"
          data-aos="fade-right" // AOS animation for title
        >
          What Our Clients Say
        </h2>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              data-aos="fade-up" // AOS animation for each testimonial
              className="bg-white dark:bg-gray-800 p-8 shadow-lg rounded-lg transition-colors duration-300"
            >
              <div className="flex items-center space-x-4 mb-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  layout="intrinsic" // Use intrinsic for a contained layout with specified width and height
                  width={64} // Set width explicitly in pixels (16 * 4 = 64px for w-16)
                  height={64} // Set height explicitly in pixels (16 * 4 = 64px for h-16)
                  className="rounded-full object-cover"
                />

                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.position}
                  </p>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                {testimonial.feedback}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
