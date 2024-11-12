import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/images/logo.png';
import Login from '../Auth/Login';
import SignUp from '../Auth/SignUp';
import Verification from '../Auth/Verification';
import Slider from 'react-slick';
import { useSelector} from 'react-redux';

import { HiOutlineUserCircle } from 'react-icons/hi';
import { ThemeSwitcher } from '@/app/theme/ThemeSwitcher';
import { IoIosArrowDropdown } from 'react-icons/io';

enum AuthRoute {
  LOGIN = 'LOGIN',
  SIGN_UP = 'SIGN_UP',
  VERIFICATION = 'VERIFICATION',
}

interface User {
  role: string;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
}

interface RootState {
  auth: AuthState;  
  
}

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [isModalOpen, setModalOpen] = useState(false);

  const [authRoute, setAuthRoute] = useState<AuthRoute | null>(null);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null); // Ref for the button

  const { user } = useSelector((state: RootState) => state.auth);

  // -----------------SAMPLE DATA
  const servicesImages = [
    '/images/services1.png',
    '/images/services2.png',
    '/images/services3.png',
  ];

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
  // ---------------------

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the dropdown and the button
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false); // Close the dropdown if clicked outside
      }
    };

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      // Unbind the event listener on cleanup
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // ---------------------

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsDropdownOpen(false);
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
    <div className="relative font-Josefin">
      <div className="fixed top-0 right-0 w-full z-10">
        <div className="bg-white border-gray-200 dark:text-gray-300 dark:border-gray-600 dark:bg-gray-900">
          <div className="flex flex-wrap justify-between border-t-4 text-gray-700 dark:text-white border-x-4 bg-[#f5f8f8] dark:bg-gray-800 shadow-md rounded-xl items-center mx-auto w-[98%] p-1 px-2 z-100">
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
                      height={60}
                      alt="Logo"
                    />
                    {/* Dark mode logo */}
                    <Image
                      src={logo}
                      className="hidden dark:inline filter invert brightness-0 contrast-200"
                      height={60}
                      alt="Logo"
                    />
                  </div>
                </Link>
              </div>
            </div>
            <button
              data-collapse-toggle="mega-menu-full"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mega-menu-full"
              aria-expanded={isMenuOpen}
              onClick={toggleMenu}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              id="mega-menu-full"
              className={`${
                isMenuOpen ? 'block' : 'hidden'
              } items-center justify-between w-full md:flex md:w-auto md:order-1 pr-4`}
            >
              <ul className="flex flex-col mt-4 font-medium md:flex-row md:mt-0 md:space-x-8 rtl:space-x-reverse md:mr-8">
                <li>
                  <Link
                    href="/"
                    className="block py-2 px-3 text-gray-700 border-b border-gray-200 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-200 dark:border-gray-700"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="block py-2 px-3 text-gray-700 border-b border-gray-200 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-200 dark:border-gray-700"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <button
                    ref={buttonRef}
                    id="mega-menu-full-dropdown-button"
                    className="flex items-center justify-between w-full py-2 px-3 font-medium text-gray-700 border-b border-gray-200 md:w-auto hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-gray-200 dark:border-gray-700 "
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    Services
                    <IoIosArrowDropdown size={27} className="pl-2" />
                  </button>
                </li>
                <li>
                  <Link
                    href="/marketplace"
                    className="block py-2 px-3 text-gray-700 border-b border-gray-200 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-200 dark:border-gray-700 "
                  >
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link
                    href="/resources"
                    className="block py-2 px-3 text-gray-700 border-b border-gray-200 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-200 dark:border-gray-700 "
                  >
                    Resources
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="block py-2 px-3 text-gray-700 border-b border-gray-200 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-200 dark:border-gray-700 "
                  >
                    Contact
                  </Link>
                </li>
              </ul>

              {/* --------------------- */}

              <div className="hidden md:block">
                <div className="ml-4 flex items-center space-x-[70px]">
                  <div className="pl-4 flex items-center justify-end space-x-7">
                    <ThemeSwitcher />
                    {user ? (
                      <Link href={`/dashboard/${user.role}`}>
                      <Image
                        src={`/images/avatar.png`}
                        alt="Profile"
                        height={40} // Set to a larger size for better visibility
                        width={40} // Adjust width to match height
                        className="rounded-full object-cover" // Optional: round the image and make it cover the frame
                      />
                      </Link>
                    ) : (
                      <HiOutlineUserCircle
                        size={25}
                        onClick={() => openAuthModal(AuthRoute.LOGIN)}
                        className="dark:text-white text-black cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-center md:hidden py-3">
                <div className="ml-4 flex items-center space-x-[70px]">
                  <div className="pl-4 flex items-center justify-end space-x-7">
                    <ThemeSwitcher />
                    {user ? (
                      <Link href={`/dashboard/${user.role}`}>
                      <Image
                        src={`/images/avatar.png`}
                        alt="Profile"
                        height={40} // Set to a larger size for better visibility
                        width={40} // Adjust width to match height
                        className="rounded-full object-cover" // Optional: round the image and make it cover the frame
                      />
                      </Link>
                    ) : (
                      <HiOutlineUserCircle
                        size={25}
                        onClick={() => openAuthModal(AuthRoute.LOGIN)}
                        className="dark:text-white text-black cursor-pointer"
                      />
                    )}
                  </div>
                </div>
              </div>

              {/* -------------------- */}
            </div>
          </div>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              id="mega-menu-full-dropdown"
              className="mt-1 lg:w-[88%] border-t-4 text-gray-700 border-x-4 sm:w-full mx-auto bg-[#ffffff] border-gray-300 shadow-lg border-y  dark:bg-gray-800 dark:border-gray-600 sm:overflow-y-scroll max-h-[300px] md:overflow-hidden overflow-y-auto rounded-lg transition-all duration-500 ease-in-out"
              data-aos="fade-right"
            >
              <div className="grid max-w-screen-xl px-4 py-5 mx-auto text-gray-900 dark:text-white sm:grid-cols-2 md:grid-cols-4 md:px-6">
                {/* First UL with images instead of text */}
                <div className=" bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
                  <div className="container mx-auto text-center">
                    {/* Section Title */}

                    {/* Image Slider */}
                    <div className="mx-auto w-full">
                      <Slider {...settings}>
                        {servicesImages.map((res, index) => (
                          <div key={index} className="p-4">
                            <div className="relative w-full h-40 mx-auto overflow-hidden">
                              <Image
                                src={res}
                                fill={true}
                                objectFit="contain"
                                alt="Service Image"
                                className="hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </div>
                    <div className="mt-10">
                      {' '}
                      {/* Optional padding for spacing */}
                      <Link href={'/services'}>
                        <h5
                          className="text-lg font-semibold text-gray-800 dark:text-white bg-[#eaf0f2] dark:bg-gray-800 rounded-xl py-1 w-4/5 mx-auto hover:bg-[#a2bdce]
        dark:hover:bg-gray-700 cursor-pointer shadow-lg border border-gray-400 uppercase text-center"
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                          Our Services
                        </h5>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Other columns with text */}
                <ul className="border-r border-gray-200 dark:border-gray-700 px-4">
                  <li>
                    <Link
                      href="/research"
                      className="block p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <div className="font-semibold">
                        Research & Publications
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Unlock insights with research publications.
                      </span>
                    </Link>
                    <hr className="border-gray-200 dark:border-gray-700 " />
                  </li>
                  <li>
                    <Link
                      href="/consulting"
                      className="block p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <div className="font-semibold">Consulting Service</div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Expert guidance for strategic business growth solutions.
                      </span>
                    </Link>
                    <hr className="border-gray-200 dark:border-gray-700 " />
                  </li>
                  <li>
                    <Link
                      href="/trading"
                      className="block p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <div className="font-semibold">Training & Solutions</div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Enhancing skills with tailored solutions.
                      </span>
                    </Link>
                    <hr className="border-gray-200 dark:border-gray-700 " />
                  </li>
                </ul>

                {/* Other columns with text */}
                <ul className="border-r border-gray-200 dark:border-gray-700 px-4">
                  <li>
                    <Link
                      href="/education"
                      className="block p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <div className="font-semibold">Education Consultancy</div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Guiding academic success through expertise.
                      </span>
                    </Link>
                    <hr className="border-gray-200 dark:border-gray-700 " />
                  </li>
                  <li>
                    <Link
                      href="/certifications"
                      className="block p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <div className="font-semibold">Certification Courses</div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Empowering careers with accredited certifications.
                      </span>
                    </Link>
                    <hr className="border-gray-200 dark:border-gray-700 " />
                  </li>
                  <li>
                    <Link
                      href="/mergerandacq"
                      className="block p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <div className="font-semibold">
                        Mergers and Acquisitions
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Strategic guidance for business transitions.
                      </span>
                    </Link>
                    <hr className="border-gray-200 dark:border-gray-700 " />
                  </li>
                </ul>

                <ul className="px-4">
                  <li>
                    <Link
                      href="/education"
                      className="block p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                      <div className="font-semibold">Workshops</div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        Interactive learning for professional growth.
                      </span>
                    </Link>
                    <hr className="border-gray-200 dark:border-gray-700 " />
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* --------------Authentication Models------------- */}

      {isModalOpen && authRoute === AuthRoute.LOGIN && (
        <Login
          setOpen={closeAuthModal}
          setRoute={setAuthRoute}
        />
      )}
      {isModalOpen && authRoute === AuthRoute.SIGN_UP && (
        <SignUp
          setOpen={closeAuthModal}
          setRoute={setAuthRoute}
        />
      )}
      {isModalOpen && authRoute === AuthRoute.VERIFICATION && (
        <Verification
          setOpen={closeAuthModal}     
          setRoute={setAuthRoute}
        />
      )}

      {/* --------------Authentication Models------------- */}
    </div>
  );
}
