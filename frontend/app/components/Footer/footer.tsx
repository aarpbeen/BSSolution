import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-800 py-6 dark:bg-gray-800 dark:text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <h5 className="text-xl font-bold">B.S. Global Business and Finance Research Pvt. Ltd.</h5>
            <p className="text-sm">Empowering research, consulting, trading, and education.</p>
          </div>
          <div className="flex space-x-6 mb-4 md:mb-0">
            <a href="/about" className="transition duration-200 hover:text-green-500">About Us</a>
            <a href="/courses" className="transition duration-200 hover:text-green-500">Courses</a>
            <a href="/policy" className="transition duration-200 hover:text-green-500">Policy</a>
            <a href="/faq" className="transition duration-200 hover:text-green-500">FAQ</a>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm">&copy; {new Date().getFullYear()} B.S. Global Business and Finance Research Pvt. Ltd. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

