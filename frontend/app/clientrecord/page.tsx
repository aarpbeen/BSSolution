import Image from 'next/image';

const ClientRecordsPage = () => {
  const testimonials = [
    {
      name: "John Doe",
      feedback: "The consultancy services provided were exceptional and tailored to our needs.",
      image: "/images/client1.jpg",
    },
    {
      name: "Jane Smith",
      feedback: "Their research projects are thorough and have greatly benefited our organization.",
      image: "/images/client2.jpg",
    },
    {
      name: "Michael Johnson",
      feedback: "A trustworthy partner in all aspects of our business strategy.",
      image: "/images/client3.jpg",
    },
  ];

  const caseStudies = [
    {
      title: "Case Study: Market Analysis for XYZ Corp",
      description: "In-depth market analysis that led to a 25% increase in market share.",
      image: "/images/case_study1.jpg",
    },
    {
      title: "Case Study: Financial Restructuring for ABC Inc.",
      description: "Implemented a successful financial restructuring plan that saved the company $1M annually.",
      image: "/images/case_study2.jpg",
    },
    {
      title: "Case Study: Product Development for LMN Ltd.",
      description: "Guided LMN Ltd. through the product development lifecycle, resulting in a successful launch.",
      image: "/images/case_study3.jpg",
    },
    {
      title: "Case Study: Strategic Planning for DEF Group",
      description: "Developed a strategic plan that enhanced operational efficiency by 40%.",
      image: "/images/case_study4.jpg",
    },
    {
      title: "Case Study: Risk Assessment for GHI Corp",
      description: "Conducted a comprehensive risk assessment that informed the client’s risk management strategy.",
      image: "/images/case_study5.jpg",
    },
  ];

  const clientPortalInfo = {
    description: "Log in to access your project records, reports, and other confidential materials.",
    image: "/images/client_portal.jpg",
  };

  return (
    <div className="relative bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 mt-11 relative z-10">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">Client Records</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Explore our client testimonials, case studies, and access your client portal.
          </p>
        </header>

        {/* Client Testimonials Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Client Testimonials</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 bg-gradient-to-r from-purple-400 to-blue-400 dark:from-purple-800 dark:to-blue-800 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={150}
                  height={150}
                  className="rounded-full mb-4"
                />
                <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                <p className="text-gray-200 dark:text-gray-300 mt-2">{testimonial.feedback}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Case Studies Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy, index) => (
              <div key={index} className="p-6 bg-gradient-to-r from-teal-400 to-green-400 dark:from-teal-800 dark:to-green-800 rounded-lg shadow-lg transform transition-transform hover:scale-105">
                <h3 className="text-xl font-bold text-white mb-2">{caseStudy.title}</h3>
                <Image
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  width={400}
                  height={200}
                  className="rounded-lg mb-4"
                />
                <p className="text-gray-200 dark:text-gray-300">{caseStudy.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Client Portal Section */}
        <section className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">Client Portal</h2>
          <div className="p-6 bg-gradient-to-r from-orange-400 to-red-400 dark:from-orange-800 dark:to-red-800 rounded-lg shadow-lg transform transition-transform hover:scale-105 inline-block">
            <Image
              src={clientPortalInfo.image}
              alt="Client Portal"
              width={400}
              height={200}
              className="rounded-lg mb-4"
            />
            <p className="text-gray-600 dark:text-gray-300">{clientPortalInfo.description}</p>
            <button className="mt-4 px-4 py-2 bg-white text-gray-900 rounded shadow hover:bg-gray-200 transition">Log In</button>
          </div>
        </section>

        {/* Summary Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Your Success is Our Priority</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We value our clients and are dedicated to providing exceptional service. Explore our resources and testimonials to see how we can help you succeed.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ClientRecordsPage;
