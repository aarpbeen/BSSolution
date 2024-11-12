import Image from 'next/image';

const CertificationsPage = () => {
  const managementCertifications = [
    {
      title: "Leadership Essentials",
      description: "Develop your leadership style and learn to manage teams effectively.",
      image: "/images/management1.png",
    },
    {
      title: "Strategic Management",
      description: "Learn to make strategic decisions that drive organizational success.",
      image: "/images/management2.png",
    },
    {
      title: "Project Management",
      description: "Master the skills required to manage projects efficiently.",
      image: "/images/management3.png",
    },
  ];

  const bankingCertifications = [
    {
      title: "Financial Analysis",
      description: "Acquire skills for analyzing financial statements and making data-driven decisions.",
      image: "/images/banking1.png",
    },
    {
      title: "Risk Management",
      description: "Understand risk factors in banking and learn to mitigate them effectively.",
      image: "/images/banking2.png",
    },
    {
      title: "Credit Analysis",
      description: "Learn the process of evaluating the creditworthiness of potential clients.",
      image: "/images/banking3.png",
    },
  ];

  const accountingCertifications = [
    {
      title: "Advanced Accounting",
      description: "Deepen your understanding of complex accounting topics and practices.",
      image: "/images/accounting1.png",
    },
    {
      title: "Taxation Essentials",
      description: "Get up to date with tax laws and best practices for compliance.",
      image: "/images/accounting2.png",
    },
  ];

  const additionalCertifications = [
    {
      title: "Digital Marketing",
      description: "Master the skills required to market products and services online.",
      image: "/images/digitalmarketing.png",
    },
    {
      title: "Data Analytics",
      description: "Learn how to analyze data to drive business decisions.",
      image: "/images/dataanalytics.png",
    },
    {
      title: "Cybersecurity Fundamentals",
      description: "Understand the basics of cybersecurity and protect your organization.",
      image: "/images/cybersecurity.png",
    },
    {
      title: "Public Speaking",
      description: "Enhance your communication skills and gain confidence in public speaking.",
      image: "/images/publicspeaking.png",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-11">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Certifications</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Explore our diverse range of certifications designed to elevate your professional skills and career prospects.
        </p>
      </header>

      {/* Management Certification Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Management Certification</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {managementCertifications.map((certification, i) => (
            <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-l-4 border-l-green-500">
              <h3 className="text-2xl font-bold mb-4 text-green-700 dark:text-green-300">{certification.title}</h3>
              <Image
                src={certification.image}
                alt={certification.title}
                width={400}
                height={250}
                className="rounded-lg mb-4 transform transition-transform duration-300 hover:scale-105"
              />
              <p className="text-gray-700 dark:text-gray-300">{certification.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Banking Certification Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Banking Certification</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {bankingCertifications.map((certification, i) => (
            <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-l-4 border-l-blue-500">
              <h3 className="text-2xl font-bold mb-4 text-blue-700 dark:text-blue-300">{certification.title}</h3>
              <Image
                src={certification.image}
                alt={certification.title}
                width={400}
                height={250}
                className="rounded-lg mb-4 transform transition-transform duration-300 hover:scale-105"
              />
              <p className="text-gray-700 dark:text-gray-300">{certification.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Accounting Certification Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Accounting Certification</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {accountingCertifications.map((certification, i) => (
            <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-l-4 border-l-purple-500">
              <h3 className="text-2xl font-bold mb-4 text-purple-700 dark:text-purple-300">{certification.title}</h3>
              <Image
                src={certification.image}
                alt={certification.title}
                width={400}
                height={250}
                className="rounded-lg mb-4 transform transition-transform duration-300 hover:scale-105"
              />
              <p className="text-gray-700 dark:text-gray-300">{certification.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Certifications Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Additional Certifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {additionalCertifications.map((certification, i) => (
            <div key={i} className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 border-l-4 border-l-teal-500">
              <h3 className="text-2xl font-bold mb-4 text-teal-700 dark:text-teal-300">{certification.title}</h3>
              <Image
                src={certification.image}
                alt={certification.title}
                width={400}
                height={250}
                className="rounded-lg mb-4 transform transition-transform duration-300 hover:scale-105"
              />
              <p className="text-gray-700 dark:text-gray-300">{certification.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Summary Section */}
      <section className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Elevate Your Career with Our Certifications</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Our diverse certification programs are designed to provide you with the skills and knowledge needed to excel in your career.
          Whether you’re seeking management, banking, or accounting expertise, we have a program tailored for you.
        </p>
      </section>
    </div>
  );
};

export default CertificationsPage;
