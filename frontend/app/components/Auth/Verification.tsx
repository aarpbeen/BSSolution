import React, { FC, useRef, useState } from 'react';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useActivationMutation } from '@/app/redux/feature/auth/authApi';

type Props = {
  setRoute: (route: string) => void;
  setOpen : (open : string) => void;
};

const Verification: FC<Props> = ({ setRoute,setOpen }) => {
  const [invalidError, setInvalidError] = useState<boolean>(false);
  const [verifyNumber, setVerifyNumber] = useState<string[]>(['', '', '', '']); // Initialized as an array of strings

  const inputRefs = useRef<HTMLInputElement[]>([]); // Array to store input refs


  const [activation, {isLoading}] = useActivationMutation();

  const { token } = useSelector((state: any) => state.auth);

  const verificationHandler = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Join the OTP inputs into a single string
    const verificationNumber = verifyNumber.join('');
  
    // Check if the OTP is exactly 4 digits
    if (verificationNumber.length !== 4) {
      toast.error('Invalid OTP code');
      return;
    }
  
    try {
      // Call the activation mutation with the token and the OTP code
      const activate_result = await activation({
        activation_token: token,
        activation_code: verificationNumber,
      }).unwrap();
  
      // Notify the user of a successful activation
      toast.success(activate_result?.message || "User activated successfully!");
      setRoute('login')
      
    } catch (error: any) {
      // Handle any errors during activation
      const errorMessage = error?.data?.message || "An unexpected error occurred during activation";
      toast.error(`Activation failed: ${errorMessage}`);
    }
  };
  

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);

    const newVerifyNumber = [...verifyNumber];
    newVerifyNumber[index] = value;
    setVerifyNumber(newVerifyNumber);

    // Focus logic: move to the next input or previous one
    if (value === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (value.length === 1 && index < verifyNumber.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-[20px] text-black dark:text-white font-Poppins font-[500] py-2">
        Verify Your Account
      </h1>
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[60px] h-[60px] rounded-full bg-[#0b81ab] flex items-center justify-center">
          <VscWorkspaceTrusted size={40} className="text-white" />
        </div>
      </div>

      <div className="w-full flex items-center justify-center mt-6">
        <div className="flex space-x-4">
          {verifyNumber.map((value, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el!)} // Assign ref for each input dynamically
              type="text"
              maxLength={1}
              required
              value={value}
              onChange={(e) =>
                handleInputChange(index, e.target.value.replace(/[^0-9]/g, ''))
              } // Allow only digits
              className="w-[50px] h-[50px] text-center text-xl dark:text-white border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
      </div>

      {invalidError && (
        <p className="text-red-500 text-center mt-4">
          Invalid verification code. Please try again.
        </p>
      )}

      <button
        type="submit"
        onClick={(e) => verificationHandler(e)}
        disabled={isLoading} // Disable button when loading
        className={`w-[40%] mt-8 text-sm py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${
                isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
      >
        {isLoading ? (
          <div className="flex justify-center items-center">
            {/* Simple loading spinner */}
            <svg
              className="animate-spin h-5 w-5 mr-3 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            Loading...
          </div>
        ) : (
          'Verify'
        )}
      </button>

      <div className="mt-5 text-center">
        <p className="text-xs font-medium text-gray-700 dark:text-gray-400">
          Go to back to sign In?{' '}
          <span
            className="text-blue-600 hover:underline dark:text-blue-400 cursor-pointer"
            onClick={() => setRoute('login')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Verification;
