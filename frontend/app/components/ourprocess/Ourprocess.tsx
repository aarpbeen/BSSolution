import { FC } from "react";
import { FaSearch, FaChartLine, FaCogs, FaRegCheckCircle } from "react-icons/fa";

interface Step {
  title: string;
  description: string;
  Icon: FC<{ className?: string }>;  // Ensure Icon accepts className
}

const steps: Step[] = [
  { title: "Research", description: "In-depth market research to understand needs.", Icon: FaSearch },
  { title: "Planning", description: "Strategic planning for maximum impact.", Icon: FaChartLine },
  { title: "Execution", description: "Delivering projects on time with precision.", Icon: FaCogs },
  { title: "Evaluation", description: "Reviewing outcomes to ensure client success.", Icon: FaRegCheckCircle },
];

const OurProcess: FC = () => {
  return (
    <section className="py-16 bg-white dark:bg-gray-900 font-Josefin">
      <div className="container mx-auto px-6 text-center">
        <h2
          className="text-3xl md:text-3xl font-semibold text-gray-900 font-Josefin dark:text-white text-left underline"
          data-aos="fade-right"
        >
          Our Processes
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mt-12 px-8" data-aos="zoom-in">
        {steps.map((step, index) => (
          <div
            key={index}
            className="group text-center p-8 rounded-full shadow-lg bg-white dark:bg-gray-800 hover:bg-[#247684] dark:hover:bg-[#175f67] transition-all duration-300 transform hover:scale-105"
          >
            <div className="flex justify-center items-center w-32 h-32 mx-auto bg-blue-100 dark:bg-[#175a6c] text-blue-600 dark:text-white rounded-full group-hover:bg-white group-hover:text-blue-500 dark:group-hover:bg-blue-500 dark:group-hover:text-white transition-all duration-300 relative">
              <step.Icon className="text-3xl" />
            </div>
            <h3 className="text-2xl font-semibold mt-6 group-hover:text-white dark:text-gray-200 transition-all duration-300">
              {step.title}
            </h3>
            <p className="mt-4 text-gray-600 dark:text-gray-300 group-hover:text-white transition-all duration-300">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default OurProcess;
