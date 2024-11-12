import React, { FC, useState } from 'react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { MdPersonAdd } from 'react-icons/md';
import { useRegisterMutation } from '@/app/redux/feature/auth/authApi';
import toast from 'react-hot-toast';
import isErrorWithMessage from '../typeGuardFunction/isErrorWithMessage';
import { HiXCircle } from 'react-icons/hi';

type Props = {
  setRoute: Dispatch<SetStateAction<AuthRoute | null>>;
  setOpen : (open : boolean ) => void;
};

const SignUp: FC<Props> = ({ setRoute,setOpen }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState('client');
  
  const [register, {isLoading}] = useRegisterMutation()

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { name, email, password,role };
  
    try {
      const result = await register(data).unwrap(); 
      toast.success(result?.message || "Registration successful");
      setRoute("verification"); 
    } catch (error: unknown) {
      const errorMessage = isErrorWithMessage(error)
      ? error.data.message
      : "An unexpected error occurred during SignUp";
  
    toast.error(errorMessage || "SignUp Failed!");
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50" >
    <div className="bg-gradient-to-t from-[#bea7a7] h-[360px] to-[#688cc3] bg-opacity-60 dark:bg-gradient-to-t
     dark:from-[#333030] dark:to-[#272b31] rounded-lg shadow-xl p-6 w-[90%] max-w-md relative" data-aos="fade-down-left">
      <button
        className="absolute top-3 right-3 focus:outline-none"
        onClick={() => setOpen(false)}
      >
        <HiXCircle size={28} className="text-black dark:text-white" />
      </button>

      {/* Render the component passed as a prop */}
      
 
    <div className="max-w-sm mx-auto p-1 ">
      <h2 className="text-xl flex items-center justify-center mb-4 text-black dark:text-white font-semibold">
        Register
        <MdPersonAdd size={25} className="ml-2" />
      </h2>

      <form className="space-y-3" onSubmit={handleRegister}>
        <div>
          <input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
            placeholder="Full Name"
            required
          />
        </div>

        <div>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
            placeholder="Email"
            required
          />
        </div>

        <div className="relative">
          <input
            id="password"
            type={passwordVisible ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
            placeholder="Password"
            required
          />
          <div
            className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
            onClick={togglePasswordVisibility}
          >
            {passwordVisible ? (
              <HiEye className="text-gray-500 dark:text-gray-300" size={20} />
            ) : (
              <HiEyeOff className="text-gray-500 dark:text-gray-300" size={20} />
            )}
          </div>
        </div>

        <div>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="block w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-200"
            required
          >
            <option value="client">Client</option>
            <option value="researcher">Researcher</option>
            <option value="student">Student</option>
          </select>
        </div>

        <div className="pt-3">
         <button
            type="submit"
            disabled={isLoading} // Disable button when loading
            className={`w-full text-sm py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 
              ${isLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
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
              'Register'
            )}
          </button>
        </div>
      </form>

      <div className="mt-3 text-center">
        <p className="text-xs font-medium text-gray-700 dark:text-gray-400">
          Already have an account?{' '}
          <span
            className="text-blue-600 hover:underline dark:text-blue-400 cursor-pointer"
            onClick={() => setRoute("login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
    </div>
    </div>
  );
};

export default SignUp;
