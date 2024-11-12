'use client';

import { Poppins, Josefin_Sans } from 'next/font/google';
import './globals.css';
import Header from './components/header/Header';
import NextThemeProvider from './theme/ThemeProvider';
import { store } from './redux/store';
import { Providers } from './provider';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer/footer';
import { useEffect } from 'react';
import { apiSlice } from './redux/feature/api/apiSlice';
import { useLoadUserQuery } from './redux/feature/api/apiSlice';


import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import Loader from './components/Loader/Loader';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-Poppins',
});

const Josefin = Josefin_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-Josefin',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Initialize AOS on mount
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duration of animations in ms
      once: true, // Whether animation should happen only once - while scrolling down
    });
  }, []);

  // initialize STORE

  useEffect(()=>{
  const initializeApp = async () => {
    await store.dispatch(
      apiSlice.endpoints.refreshToken.initiate({}, {forceRefetch : true})
    )
    await store.dispatch(
      apiSlice.endpoints.loadUser.initiate({},{forceRefetch : true})
    )
  }
  initializeApp(); // Call the function on page load
  },[])

  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${Josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-900 dark:to-black duration-300`}
      >
        <Providers store={store}>
          <NextThemeProvider>
            <Header />
            <Custom>{children}</Custom>
            <Footer />
            <Toaster position="top-center" reverseOrder={false} />
          </NextThemeProvider>
        </Providers>
      </body>
    </html>
  );
}

const Custom: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading, data: user } = useLoadUserQuery({});
  
  return <>{isLoading ? <Loader /> : <>{children}</>}</>;
};
