import React, { FC } from 'react';
import { HiXCircle } from 'react-icons/hi';


type Props = {
  component: React.ComponentType<any>; // Accept any component type
  setOpen: (open: boolean) => void;
};

const CustomModal: FC<Props> = ({ setOpen, component: Component, setAuthRoute : setAuthRoute}) => {
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
        <Component setOpen={setOpen} setRoute = {setAuthRoute} />
      </div>
    </div>
  );
};

export default CustomModal;
