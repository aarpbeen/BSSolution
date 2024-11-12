import Image from 'next/image';

const WorkshopsPage = () => {
  const nationalWorkshops = [
    {
      title: "National Workshop on Financial Literacy",
      description: "Explore essential skills for managing personal finances.",
      date: "January 15-17, 2024",
      image: "/images/national_workshop1.png",
    },
    {
      title: "Innovative Teaching Methods Workshop",
      description: "Learn modern techniques for effective teaching.",
      date: "February 20-22, 2024",
      image: "/images/national_workshop2.png",
    },
    {
      title: "Digital Marketing Strategies",
      description: "Enhance your marketing skills in the digital age.",
      date: "March 10-12, 2024",
      image: "/images/national_workshop3.png",
    },
    
  ];

  const internationalWorkshops = [
    {
      title: "Global Business Strategies",
      description: "Join experts from around the world to discuss effective business strategies.",
      date: "April 5-7, 2024",
      image: "/images/international_workshop1.png",
    },
    {
      title: "International Conference on Education",
      description: "Network with educators globally and share insights.",
      date: "May 15-17, 2024",
      image: "/images/international_workshop2.png",
    },
    {
      title: "Sustainable Practices in Business",
      description: "Learn about sustainability in the global marketplace.",
      date: "June 10-12, 2024",
      image: "/images/international_workshop3.png",
    },
  ];

  const upcomingWorkshops = [
    {
      title: "Upcoming Workshop on AI in Business",
      date: "July 20, 2024",
    },
    {
      title: "Next Workshop on Leadership Skills",
      date: "August 25, 2024",
    },
  ];

  return (
    <div className="relative bg-gradient-to-br from-indigo-200 to-pink-300 dark:from-gray-800 dark:to-gray-900">
      {/* Polygon Background */}
      <div className="absolute inset-0 opacity-30">
        <svg viewBox="0 0 1440 320" className="transform rotate-180">
          <path fill="#ffffff" fillOpacity="0.1" d="M0,128L48,128C96,128,192,128,288,133.3C384,139,480,149,576,160C672,171,768,181,864,170.7C960,160,1056,128,1152,106.7C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8 mt-11 relative z-10">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">Workshops</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Explore our diverse range of workshops designed to enhance your skills and knowledge.
          </p>
        </header>

        {/* National Workshops Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">National Workshops</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {nationalWorkshops.map((workshop, i) => (
              <div key={i} className="relative w-full md:w-1/2 lg:w-1/3 p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg shadow-lg transform transition-transform hover:scale-105"></div>
                <div className="relative z-10 p-6 bg-white dark:bg-gray-800 rounded-lg text-gray-900 dark:text-gray-100">
                  <h3 className="text-2xl font-bold mb-4">{workshop.title}</h3>
                  <Image
                    src={workshop.image}
                    alt={workshop.title}
                    width={400}
                    height={200}
                    className="rounded-lg mb-4"
                  />
                  <p>{workshop.description}</p>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{workshop.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* International Workshops Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">International Workshops</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {internationalWorkshops.map((workshop, i) => (
              <div key={i} className="relative w-full md:w-1/2 lg:w-1/3 p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-500 rounded-lg shadow-lg transform transition-transform hover:scale-105"></div>
                <div className="relative z-10 p-6 bg-white dark:bg-gray-800 rounded-lg text-gray-900 dark:text-gray-100">
                  <h3 className="text-2xl font-bold mb-4">{workshop.title}</h3>
                  <Image
                    src={workshop.image}
                    alt={workshop.title}
                    width={400}
                    height={200}
                    className="rounded-lg mb-4"
                  />
                  <p>{workshop.description}</p>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{workshop.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Workshops Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Upcoming Workshops</h2>
          <div className="flex flex-wrap justify-center gap-10">
            {upcomingWorkshops.map((workshop, i) => (
              <div key={i} className="relative w-full md:w-1/2 lg:w-1/3 p-6">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-red-500 rounded-lg shadow-lg transform transition-transform hover:scale-105"></div>
                <div className="relative z-10 p-6 bg-white dark:bg-gray-800 rounded-lg text-gray-900 dark:text-gray-100">
                  <h3 className="text-2xl font-bold mb-4">{workshop.title}</h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">{workshop.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Summary Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Join Us for Our Workshops</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Our workshops provide a platform to learn, share, and connect with professionals in various fields.
            Don’t miss out on these valuable opportunities!
          </p>
        </section>
      </div>
    </div>
  );
};

export default WorkshopsPage;
