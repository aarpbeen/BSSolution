'use client'
import React, { useState } from 'react';
import AdminHeader from '../components/Header';
import { FaHome, FaInfoCircle, FaTools } from 'react-icons/fa';
import UserProtectedRoute from '@/app/hooks/userProtectedRoute';
import HomePageEdit from '../components/HomePageEdit';


const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('home');

  // Example content for each tab
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <div>
        <HomePageEdit />
        </div>;
      case 'about':
        return <div>About Us content goes here.</div>;
      case 'services':
        return <div>Services content goes here.</div>;
      default:
        return <div>Select a tab to view content</div>;
    }
  };

  return (
    <>
    <UserProtectedRoute requiredRole='admin'>
      <AdminHeader />
    
    <div className="flex flex-1">
    {/* Sidebar */}
  
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg">
      <nav className="h-full">
        <ul className="p-6 space-y-4">
          {[
            { key: 'home', label: 'Home', icon: <FaHome /> },
            { key: 'about', label: 'About Us', icon: <FaInfoCircle /> },
            { key: 'services', label: 'Services', icon: <FaTools /> },
          ].map(({ key, label, icon }) => (
            <li
              key={key}
              className={`flex items-center space-x-4 p-3 rounded-md cursor-pointer font-semibold transition-all dark:text-white ${
                activeTab === key
                  ? 'bg-[#346472]  text-white' // Active tab color (light and dark mode)
                  : 'hover:bg-gray-200 dark:hover:bg-gray-700' // Hover state (light and dark mode)
              }`}
              onClick={() => setActiveTab(key)}
            >
              {icon} {/* Display icon */}
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>

    {/* Main Content */}
    <main className="flex-1 p-10 overflow-y-auto transition-all dark:text-white">
      {renderContent()}
    </main>

  </div>
  </UserProtectedRoute>
  </>
  );
};

export default AdminPage;


