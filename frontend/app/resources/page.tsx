'use client';


import { HiOutlineDownload } from 'react-icons/hi';

const Resources = () => {
  return (
    <div className="bg-white dark:bg-gray-900 py-5 px-4 lg:px-12 mt-[100px] font-Josefin ">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Downloadable Reports Section */}
        <section id="reports" className="space-y-8">
          <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Downloadable Reports</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Annual Financial Report 2023', link: '/downloads/annual-report-2023.pdf' },
              { title: 'Market Analysis Q1 2023', link: '/downloads/market-analysis-q1-2023.pdf' },
              { title: 'Investment Strategies Overview', link: '/downloads/investment-strategies.pdf' },
              { title: 'Consulting Services Proposal', link: '/downloads/consulting-proposal.pdf' },
              { title: 'Research Trends in 2023', link: '/downloads/research-trends-2023.pdf' },
              { title: 'Financial Planning Guide', link: '/downloads/financial-planning-guide.pdf' },
              { title: 'Taxation Updates 2023', link: '/downloads/taxation-updates-2023.pdf' },
              { title: 'Risk Management Strategies', link: '/downloads/risk-management-strategies.pdf' },
            ].map((report, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center">
                <HiOutlineDownload size={24} className="text-gray-600 dark:text-gray-300 mr-2" />
                <a href={report.link} className="text-lg font-semibold text-gray-900 dark:text-white">{report.title}</a>
              </div>
            ))}
          </div>
        </section>

        <hr />

        {/* FAQ Section */}
        <section id="faq" className="space-y-8">
          <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { question: 'What services do you offer?', answer: 'We provide financial consulting, research, training, and educational services.' },
              { question: 'How can I contact support?', answer: 'You can contact our support team via email at support@company.com.' },
              { question: 'What is your refund policy?', answer: 'We offer a full refund within 30 days of purchase.' },
              { question: 'Do you offer online courses?', answer: 'Yes, we offer a variety of online courses in finance and consulting.' },
              { question: 'How can I access the reports?', answer: 'You can download the reports from the resources section on our website.' },
              { question: 'Do you provide personalized consulting?', answer: 'Yes, we provide tailored consulting services to meet your needs.' },
              { question: 'Where can I find your latest publications?', answer: 'Our latest publications are available in the reports section.' },
              { question: 'Is there a subscription fee?', answer: 'No, all our resources are free to access.' },
            ].map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <hr />

        {/* Glossary Section */}
        <section id="glossary" className="space-y-8">
          <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">Glossary</h2>
          <div className="space-y-4">
            {[
              { term: 'Consulting', definition: 'The practice of providing expert advice to businesses.' },
              { term: 'Investment', definition: 'The action of allocating resources, usually money, in order to generate income or profit.' },
              { term: 'Market Analysis', definition: 'A study to understand market trends, dynamics, and conditions.' },
              { term: 'Financial Planning', definition: 'The process of creating a plan to manage financial resources effectively.' },
              { term: 'Risk Management', definition: 'The identification, assessment, and prioritization of risks.' },
              { term: 'ROI', definition: 'Return on Investment; a measure of the profitability of an investment.' },
              { term: 'Stakeholder', definition: 'Any party that has an interest in an organization.' },
              { term: 'Compliance', definition: 'Conforming to laws, regulations, and policies.' },
            ].map((glossaryItem, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{glossaryItem.term}</h3>
                <p className="text-gray-600 dark:text-gray-300">{glossaryItem.definition}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Resources;
