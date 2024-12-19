
import React, { useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const AdminHeader = () => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const router = useRouter();



  const handleNavigation = (route: string) => {
    router.push(route);
    setProfileMenuOpen(false);
  };

  return (
    <div className=" flex flex-col bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 mt-[80px] ">
      <header className="bg-[#346472] dark:bg-gray-800 text-white p-4 shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        <div className="relative">
          <button
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            className="flex items-center space-x-2 pr-9  dark:text-white hover:text-gray-500 dark:hover:text-gray-300"
          >
            <FaCog className="text-xl" />
            <span>Setting</span>
          </button>

          {profileMenuOpen && (
            <ul className="absolute right-0 mt-2 w-48 bg-white pt-4 dark:bg-gray-800 rounded-xl text-gray-800 dark:text-gray-100 shadow-lg ring-1 ring-black ring-opacity-5">
              <li
                onClick={() => handleNavigation('/profile')}
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                Change Avatar
              </li>
              <li
                onClick={() => handleNavigation('/change-password')}
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                Change Password
              </li>
              <li
                onClick={() => handleNavigation('/logout')}
                className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                Logout
              </li>
            </ul>
          )}
        </div>
      </header>    
    </div>
  );
};

export default AdminHeader;
