// import Link from 'next/link';
// import { FC, useState } from 'react';

// export const navItemsData = [
//   { name: 'Home', url: '/' },
//   { name: 'About Us', url: '/about' },
//   {
//     name: 'Services', 
//     subItems: [ // Add sub-items for the Services mega menu
//       { name: 'Research & Publications', url: '/services/research' },
//       { name: 'Consulting', url: '/services/consulting' },
//       { name: 'Trading Solutions', url: '/services/trading' },
//       { name: 'Education Consultancy', url: '/services/education' },
//       { name: 'Certification Courses', url: '/services/certifications' },
//     ],
//   },
//   { name: 'Policy', url: '/policy' },
//   { name: 'FAQ', url: '/faq' },
// ];

// interface Props {
//   activeItem: number;
//   setActive: (index: number) => void;
//   mobile?: boolean;
// }

// const NavItems: FC<Props> = ({ activeItem, setActive, mobile = false }) => {
//   const [dropdownOpen, setDropdownOpen] = useState<number | null>(null); // Handle dropdown open/close

//   const renderNavItem = (item: { name: string; url?: string; subItems?: { name: string; url: string }[] }, index: number) => {
//     const hasSubItems = item.subItems && item.subItems.length > 0;
    
//     return (
//       <div key={index} className="relative">
//         {/* If the item has sub-items, show as a dropdown/mega menu */}
//         {hasSubItems ? (
//           <div
//             onMouseEnter={() => setDropdownOpen(index)} // Open mega menu on hover
//             onMouseLeave={() => setDropdownOpen(null)}  // Close mega menu on hover leave
//           >
//             <span
//               className={`cursor-pointer transition-colors duration-200 ease-in-out ${
//                 activeItem === index
//                   ? 'dark:text-[#37a39a] text-[crimson] font-bold'
//                   : 'dark:text-white text-black'
//               } font-Poppins font-[400] hover:underline`}
//               onClick={() => setActive(index)}
//             >
//               {item.name}
//             </span>

//             {/* Mega menu dropdown */}
//             {dropdownOpen === index && (
//               <div className="absolute left-0 mt-2 w-[500px] bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg z-20">
//                 <div className="grid grid-cols-2 gap-4">
//                   {item.subItems?.map((subItem, subIndex) => (
//                     <Link href={subItem.url} key={subIndex} passHref>
//                       <span
//                         className="block cursor-pointer text-gray-700 dark:text-gray-200 hover:text-[crimson] transition-colors"
//                         onClick={() => setDropdownOpen(null)} // Close dropdown on click
//                       >
//                         {subItem.name}
//                       </span>
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         ) : (
//           <Link href={item.url!} key={index} passHref>
//             <span
//               className={`cursor-pointer transition-colors duration-200 ease-in-out ${
//                 activeItem === index
//                   ? 'dark:text-[#37a39a] text-[crimson] font-bold'
//                   : 'dark:text-white text-black'
//               } font-Poppins font-[400] hover:underline`}
//               onClick={() => setActive(index)}
//               aria-current={activeItem === index ? 'page' : undefined}
//             >
//               {item.name}
//             </span>
//           </Link>
//         )}
//       </div>
//     );
//   };

//   return (
//     <nav className={`flex ${mobile ? 'flex-col space-y-4 p-4' : 'space-x-8'}`}>
//       {navItemsData.map(renderNavItem)}
//     </nav>
//   );
// };

// export default NavItems;


'use client';

import React, { FC, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import {
  HiOutlineUserCircle,
  HiOutlineMenuAlt3,
  HiOutlineX,
} from 'react-icons/hi';
import { ThemeSwitcher } from '@/app/theme/ThemeSwitcher';
import CustomModal from './CustomAuthModal';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';
import Verification from '../Auth/Verification';
import logo from '../../../public/images/logo.png';

enum AuthRoute {
  LOGIN = 'login',
  SIGN_UP = 'sign-up',
  VERIFICATION = 'verification',
}

const Header: FC = () => {
  const [activeItem, setActiveItem] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [authRoute, setAuthRoute] = useState<AuthRoute | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const openAuthModal = (route: AuthRoute) => {
    setAuthRoute(route);
    setModalOpen(true);
  };

  const closeAuthModal = () => {
    setModalOpen(false);
    setAuthRoute(null);
  };

  return (
    <div className="relative w-full">
      <div className="dark:bg-opacity-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black bg-white border-b dark:border-[#ffffff1c] z-[80] fixed top-0 left-0 w-full flex items-center justify-center">
        <div className="w-full mx-auto px-auto sm:px-6 lg:px-8 shadow-xl">
          <div className="flex items-center justify-between h-16 w-[98%] mx-auto">
            <div className="flex items-center pl-4">
              <div className="flex-shrink-0">
                <Link
                  href="/"
                  className="uppercase text-[25px] font-Poppins font-[500] text-black dark:text-white"
                >
                  <div>
                    {/* Light mode logo */}
                    <Image
                      src={logo}
                      className="dark:hidden"
                      height={70}
                      alt="Logo"
                    />

                    {/* Dark mode logo */}
                    <Image
                      src={logo}
                      className="hidden dark:inline filter invert brightness-0 contrast-200"
                      height={70}
                      alt="Logo"
                    />
                  </div>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="text-black dark:text-white focus:outline-none"
              >
                {isMobileMenuOpen ? (
                  <HiOutlineX size={25} />
                ) : (
                  <HiOutlineMenuAlt3 size={25} />
                )}
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-4 flex items-center space-x-[70px]">
                <NavItems activeItem={activeItem} setActive={setActiveItem} />
                <div className="pl-4 flex items-center justify-end space-x-7">
                  <ThemeSwitcher />
                  <HiOutlineUserCircle
                    size={25}
                    onClick={() => openAuthModal(AuthRoute.LOGIN)}
                    className="dark:text-white text-black cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation (shown when the menu is toggled) */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-2 left-0 w-full bg-white dark:bg-gray-900 shadow-lg z-[70] rounded-b-lg ">
          <div className="p-6 space-y-4">
            <NavItems
              activeItem={activeItem}
              setActive={setActiveItem}
              mobile
            />

            {/* Divider */}
            <div className="border-t dark:border-gray-700 border-gray-200 my-4"></div>

            {/* Theme Switcher and User Icon */}
            <div className="flex items-center justify-around">
              <ThemeSwitcher />
              <HiOutlineUserCircle
                size={30}
                onClick={() => openAuthModal(AuthRoute.LOGIN)}
                className="dark:text-white text-black cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* --------------Authentication Models------------- */}

      {isModalOpen && authRoute === AuthRoute.LOGIN && (
        <CustomModal
          setOpen={closeAuthModal}
          component={Login}
          setAuthRoute={setAuthRoute}
        />
      )}
      {isModalOpen && authRoute === AuthRoute.SIGN_UP && (
        <CustomModal
          setOpen={closeAuthModal}
          component={SignUp}
          setAuthRoute={setAuthRoute}
        />
      )}
      {isModalOpen && authRoute === AuthRoute.VERIFICATION && (
        <CustomModal
          setOpen={closeAuthModal}
          component={Verification}
          setAuthRoute={setAuthRoute}
        />
      )}

      {/* --------------Authentication Models------------- */}
    </div>
  );
};

export default Header;


const navItemsData = [
  { name: 'Home', url: '/' },
  { name: 'About Us', url: '/about' },
  {
    name: 'Services', 
    subItems: [ // Add sub-items for the Services mega menu
      { name: 'Research & Publications', url: '/services/research' },
      { name: 'Consulting', url: '/services/consulting' },
      { name: 'Trading Solutions', url: '/services/trading' },
      { name: 'Education Consultancy', url: '/services/education' },
      { name: 'Certification Courses', url: '/services/certifications' },
    ],
  },
  { name: 'Policy', url: '/policy' },
  { name: 'FAQ', url: '/faq' },
];

interface Props {
  activeItem: number;
  setActive: (index: number) => void;
  mobile?: boolean;
}

const NavItems: FC<Props> = ({ activeItem, setActive, mobile = false }) => {
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null); // Handle dropdown open/close

  const renderNavItem = (item: { name: string; url?: string; subItems?: { name: string; url: string }[] }, index: number) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    
    return (
      <div key={index} className="relative">
        {/* If the item has sub-items, show as a dropdown/mega menu */}
        {hasSubItems ? (
          <div
            onMouseEnter={() => setDropdownOpen(index)} // Open mega menu on hover
            onMouseLeave={() => setDropdownOpen(null)}  // Close mega menu on hover leave
          >
            <span
              className={`cursor-pointer transition-colors duration-200 ease-in-out ${
                activeItem === index
                  ? 'dark:text-[#37a39a] text-[crimson] font-bold'
                  : 'dark:text-white text-black'
              } font-Poppins font-[400] hover:underline`}
              onClick={() => setActive(index)}
            >
              {item.name}
            </span>

            {/* Mega menu dropdown */}
            {dropdownOpen === index && (
              <div className="absolute left-0 mt-2 w-[500px] bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg z-20">
                <div className="grid grid-cols-2 gap-4">
                  {item.subItems?.map((subItem, subIndex) => (
                    <Link href={subItem.url} key={subIndex} passHref>
                      <span
                        className="block cursor-pointer text-gray-700 dark:text-gray-200 hover:text-[crimson] transition-colors"
                        onClick={() => setDropdownOpen(null)} // Close dropdown on click
                      >
                        {subItem.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link href={item.url!} key={index} passHref>
            <span
              className={`cursor-pointer transition-colors duration-200 ease-in-out ${
                activeItem === index
                  ? 'dark:text-[#37a39a] text-[crimson] font-bold'
                  : 'dark:text-white text-black'
              } font-Poppins font-[400] hover:underline`}
              onClick={() => setActive(index)}
              aria-current={activeItem === index ? 'page' : undefined}
            >
              {item.name}
            </span>
          </Link>
        )}
      </div>
    );
  };

  return (
    <nav className={`flex ${mobile ? 'flex-col space-y-4 p-4' : 'space-x-8'}`}>
      {navItemsData.map(renderNavItem)}
    </nav>
  );
};


