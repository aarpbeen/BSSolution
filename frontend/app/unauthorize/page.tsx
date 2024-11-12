// pages/unauthorized.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';


const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center
     min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white px-6 text-center" data-aos="fade-right">
      <div className="max-w-lg w-full  dark:bg-gray-900  p-8">
        <Image
          src='/images/404.svg'
          alt="Unauthorized Access"
          width={200}
          height={200}
          className="mx-auto mb-4"
        />
        <h1 className="text-4xl font-bold mb-2 text-red-600 font-Josefin">
          You are not authorized
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          You tried to access a page you did not have prior authorization for.
        </p>
        <Link href="/">
          <div className="inline-block mt-6 px-9 py-3 text-white bg-[#187187] rounded-2xl hover:bg-blue-700 transition">
            Go to Home
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;
