'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiFolder, FiFileText, FiUser } from 'react-icons/fi';
import Image from 'next/image';

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 w-64 min-h-screen py-8 px-4 mt-[70px] transition-colors duration-300 shadow-lg border-r border-gray-300 dark:border-gray-700">
 
      {/* Navigation Links */}
      <nav className="space-y-4">
        <Link
          href="/dashboard/researcher"
          className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 ${
            pathname === '/dashboard/researcher'
              ? 'bg-indigo-600 text-white dark:bg-indigo-500 dark:text-white'
              : 'bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800'
          }`}
        >
          <FiHome className="text-lg" /> Dashboard Overview
        </Link>
        <Link
          href="/dashboard/files"
          className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 ${
            pathname === '/dashboard/files'
              ? 'bg-indigo-600 text-white dark:bg-indigo-500 dark:text-white'
              : 'bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800'
          }`}
        >
          <FiFolder className="text-lg" /> Files
        </Link>
        <Link
          href="/dashboard/reports"
          className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 ${
            pathname === '/dashboard/reports'
              ? 'bg-indigo-600 text-white dark:bg-indigo-500 dark:text-white'
              : 'bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800'
          }`}
        >
          <FiFileText className="text-lg" /> Reports
        </Link>
        <Link
          href="/dashboard/profile"
          className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-colors duration-200 ${
            pathname === '/dashboard/profile'
              ? 'bg-indigo-600 text-white dark:bg-indigo-500 dark:text-white'
              : 'bg-transparent text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-800'
          }`}
        >
          <FiUser className="text-lg" /> Profile
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;
