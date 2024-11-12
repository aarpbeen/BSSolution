import Image from 'next/image';

const MergersAcquisitionsPage = () => {
  const maServices = [
    {
      title: "M&A Case Studies",
      description: "In-depth case studies showcasing successful mergers and acquisitions.",
      image: "/images/ma1.png",
    },
    {
      title: "M&A Processes",
      description: "Detailed insights into the processes involved in mergers and acquisitions.",
      image: "/images/ma2.png",
    },
    {
      title: "Client Success Stories",
      description: "Real-life success stories of clients who have benefited from our M&A services.",
      image: "/images/ma3.png",
    },
  ];

  const creditRatingServices = [
    {
      title: "Comprehensive Credit Rating",
      description: "Detailed analysis and reporting on credit ratings to assist your business decisions.",
      image: "/images/creditrating1.png",
    },
    {
      title: "Rating Advisory Services",
      description: "Expert advisory services for navigating credit ratings and enhancing creditworthiness.",
      image: "/images/creditrating2.png",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-11">
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">Mergers & Acquisitions</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Navigate the complex world of mergers and acquisitions with our expert services.
        </p>
      </header>

      {/* M&A Services Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Our M&A Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {maServices.map((service, i) => (
            <div key={i} className="p-8 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-3xl font-bold text-white mb-4">{service.title}</h3>
              <Image
                src={service.image}
                alt={service.title}
                width={400}
                height={250}
                className="rounded-lg mb-4"
              />
              <p className="text-white">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Credit Rating Services Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Credit Rating Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {creditRatingServices.map((service, i) => (
            <div key={i} className="p-8 bg-gradient-to-r from-teal-600 to-cyan-600 dark:from-teal-900 dark:to-cyan-900 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-3xl font-bold text-white mb-4">{service.title}</h3>
              <Image
                src={service.image}
                alt={service.title}
                width={400}
                height={250}
                className="rounded-lg mb-4"
              />
              <p className="text-white">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Summary Section */}
      <section className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Partner with Us for Success</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Our dedicated M&A and credit rating services empower your business to achieve remarkable success.
          Let us guide you through every step of the process.
        </p>
      </section>
    </div>
  );
};

export default MergersAcquisitionsPage;
