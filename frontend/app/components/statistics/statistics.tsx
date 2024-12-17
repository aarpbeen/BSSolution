// components/Statistics.tsx
'use client'
import { FC, useEffect, useState } from "react";

interface Statistic {
  title: string;
  number: number;
  description: string;
}

const statistics: Statistic[] = [
  { title: "Projects Completed", number: 120, description: "Successful projects delivered on time." },
  { title: "Happy Clients", number: 450, description: "Clients satisfied with our services." },
  { title: "Years of Experience", number: 10, description: "Years of continuous industry excellence." },
  { title: "Awards Won", number: 15, description: "Recognized for outstanding performance." },
];

const Statistics: FC = () => {
  const [counters, setCounters] = useState<{ [key: string]: number }>({});

  const startCounter = (key: string, target: number) => {
    let count = 0;
    const interval = setInterval(() => {
      if (count < target) {
        count += 1;
        setCounters((prev) => ({ ...prev, [key]: count }));
      } else {
        clearInterval(interval);
      }
    }, 30); // Speed of counting
  };

  useEffect(() => {
    statistics.forEach((stat) => {
      startCounter(stat.title, stat.number);
    });
  }, []);

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
       <div className="container mx-auto px-6 text-center">
       <h2 
          className="text-3xl md:text-3xl font-semibold text-gray-900 font-Josefin dark:text-white text-left underline"
          data-aos="fade-right" // AOS animation for title
        >
          Our Key Statistics
        </h2>
        </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mt-12 px-8"  data-aos="zoom-in">
        {statistics.map((stat) => (
          <div
            key={stat.title}
            className="group relative bg-white dark:bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 p-6"
          >
            <div className="flex justify-center items-center w-20 h-20 bg-blue-600 dark:bg-blue-500 rounded-full mx-auto text-white mb-4">
              <span className="text-3xl font-bold">
                {counters[stat.title] ?? 0}
              </span>
            </div>
            <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white">{stat.title}</h3>
            <p className="text-center mt-2 text-gray-600 dark:text-gray-300">{stat.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
