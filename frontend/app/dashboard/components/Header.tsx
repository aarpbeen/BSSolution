
'use client'
import { FiBell, FiSettings } from 'react-icons/fi';
import { HiOutlineUserCircle } from 'react-icons/hi';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

const Header = ({ userName, profileImage }: { userName: string; profileImage?: string }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="flex justify-between items-center mx-2 p-4 bg-white dark:bg-gray-900 shadow mt-[80px] rounded-xl border-x-2 border-y-2 transition-colors duration-300">
      {/* Greeting and Date */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Welcome, {userName}</h1>
        
      </div>

      {/* Icons and Profile Section */}
      <div className="flex items-center gap-6">
        <FiBell className="text-gray-600 dark:text-gray-300 text-xl cursor-pointer hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200" />
        <FiSettings className="text-gray-600 dark:text-gray-300 text-xl cursor-pointer hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors duration-200" />
        
        {/* Profile Image and Dropdown */}
        <div className="relative">
          <div
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="cursor-pointer w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600"
          >
            {profileImage ? (
              <Image
                src={profileImage}
                alt="Profile"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            ) : (
              <HiOutlineUserCircle className="text-gray-600 dark:text-gray-300 text-3xl" />
            )}
          </div>
          
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-10">
              <Link href="/dashboard/profile" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                Profile
              </Link>
              <Link href="/dashboard/settings" className="block px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                Settings
              </Link>
              <button className="block w-full text-left px-4 py-2 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
