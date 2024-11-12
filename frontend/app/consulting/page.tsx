import Image from 'next/image';

const ConsultingPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-12 font-Josefin">
      <header className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Consulting Services</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Explore our comprehensive consulting services tailored to meet your business needs.
        </p>
      </header>

      {/* Business Consulting Services Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Business Consulting Services</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Our business consulting services are designed to help organizations improve performance and efficiency. Below is a breakdown of our key services:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Strategic Planning',
              description: 'We assist businesses in defining their vision, mission, and long-term goals through effective strategic planning.',
              image: '/images/consulting.png',
            },
            {
              title: 'Operational Excellence',
              description: 'Our consultants work with organizations to enhance their operations through process improvement and efficiency strategies.',
              image: '/images/consulting.png',
            },
            {
              title: 'Market Analysis',
              description: 'Conducting thorough market analysis to identify opportunities, threats, and competitive positioning.',
              image: '/images/consulting.png',
            },
          ].map((service, index) => (
            <div key={service.title} className={`p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 ${index % 2 === 0 ? 'md:col-span-2' : 'md:col-span-1'} hover:shadow-2xl`}>
              <div className="relative mb-4 h-48 w-full">
                <Image
                  src={service.image}
                  alt={service.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{service.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Financial Solutions Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Financial Solutions</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Our financial consulting services provide clients with the necessary tools and strategies for effective financial planning and management.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Investment Strategies',
              description: 'Tailored investment strategies to meet the unique goals of our clients, focusing on risk management and growth.',
              image: '/images/consulting.png',
            },
            {
              title: 'Financial Planning',
              description: 'Comprehensive financial planning services, including retirement, education, and estate planning.',
              image: '/images/consulting.png',
            },
            {
              title: 'Cash Flow Management',
              description: 'Assisting businesses in managing their cash flow effectively to ensure liquidity and operational efficiency.',
              image: '/images/consulting.png',
            },
          ].map((solution, index) => (
            <div key={solution.title} className={`p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 ${index % 2 === 0 ? 'clip-path-polygon-md' : 'md:col-span-2'} hover:shadow-2xl`}>
              <div className="relative mb-4 h-48 w-full">
                <Image
                  src={solution.image}
                  alt={solution.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{solution.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{solution.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cost-Benefit Analysis Section */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Cost-Benefit Analysis</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Our cost-benefit analysis services help clients evaluate the financial implications of their projects and decisions. Here are examples of our work:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              caseStudy: 'Project A: New Product Launch',
              summary: 'A comprehensive analysis of the costs and expected benefits associated with the launch of a new product.',
              image: '/images/consulting.png',
            },
            {
              caseStudy: 'Project B: Facility Upgrade',
              summary: 'Evaluating the costs versus benefits of upgrading facilities to improve operational efficiency and capacity.',
              image: '/images/consulting.png',
            },
          ].map((caseStudy) => (
            <div key={caseStudy.caseStudy} className="p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 hover:shadow-2xl">
              <div className="relative mb-4 h-48 w-full">
                <Image
                  src={caseStudy.image}
                  alt={caseStudy.caseStudy}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{caseStudy.caseStudy}</h3>
              <p className="text-gray-600 dark:text-gray-400">{caseStudy.summary}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Proposal & Report Writing Section */}
      <section>
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Proposal & Report Writing</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Our expert team provides proposal and report writing services to ensure your ideas and projects are clearly communicated.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'Successful Business Proposals',
              description: 'A collection of winning business proposals that led to successful partnerships and projects.',
              image: '/images/consulting.png',
            },
            {
              title: 'Impactful Research Reports',
              description: 'Research reports that provide insights and recommendations for decision-makers.',
              image: '/images/consulting.png',
            },
          ].map((report, index) => (
            <div key={report.title} className={`p-6 rounded-lg shadow-lg bg-white dark:bg-gray-800 hover:shadow-2xl ${index % 2 === 0 ? 'clip-path-hexagon-md' : 'md:col-span-2'}`}>
              <div className="relative mb-4 h-48 w-full">
                <Image
                  src={report.image}
                  alt={report.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{report.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{report.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ConsultingPage;
