import Image from 'next/image';

// Sample data for each section, replace with dynamic data as needed
const researchAreas = [
  { title: 'Public Economics', description: 'Studies the government’s role in economic welfare...', image: '/images/research.png' },
  { title: 'Public Enterprises', description: 'Explores management of government corporations...', image: '/images/research.png' },
  { title: 'Econometrics', description: 'Applies statistics to economic data and trends...', image: '/images/research.png' },
];

const ongoingResearch = [
  { project: 'Impact of Taxation on Small Businesses', summary: 'Examines how taxes affect small business growth...', image: '/images/research.png' },
  // More projects...
];

const pastResearch = [
  { project: 'Analysis of Government Subsidies', summary: 'Study of subsidies in agriculture...', image: '/images/research.png' },
  // More past research projects...
];

const publications = [
  { title: 'Economic Review 2024', description: 'Review of economic trends and forecasts...', image: '/images/research.png' },
  // More publications...
];

const collaborations = [
  { institution: 'University of Economics', description: 'Collaborations on fiscal policies...', image: '/images/research.png' },
  // More collaborations...
];

// Reusable section component with a distinct shape and style
const Section = ({ title, children }) => (
  <section className="mb-12 px-4 py-6 rounded-lg bg-gradient-to-r from-[#3b7183] to-[#3c5a64] shadow-lg transform transition duration-300 hover:scale-105 text-white text-center" data-aos='fade-right'>
    <h2 className="text-2xl font-semibold mb-6">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{children}</div>
  </section>
);

// Individual content card with concise styling and circular image
const ContentCard = ({ title, description, image }) => (
  <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md transform transition duration-300 hover:shadow-lg hover:scale-105" data-aos='fade-right'>
    <div className="flex justify-center mb-4">
      <Image src={image} alt={title} width={80} height={80} className="rounded-full" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
    <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{description}</p>
  </div>
);

const ResearchPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-6 mt-[120px] bg-gray-50 dark:bg-gray-800 rounded-xl">
      <header className="text-center mb-12" data-aos='fade-right'>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Research Initiatives</h1>
        <p className="text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
          Discover our contributions to advancing economic and public policy knowledge.
        </p>
      </header>

      {/* Research Areas */}
      <Section title="Research Areas">
        {researchAreas.map((area) => (
          <ContentCard key={area.title} title={area.title} description={area.description} image={area.image}  />
        ))}
      </Section>

      {/* Ongoing Research */}
      <Section title="Ongoing Research">
        {ongoingResearch.map((research) => (
          <ContentCard key={research.project} title={research.project} description={research.summary} image={research.image} />
        ))}
      </Section>

      {/* Past Research */}
      <Section title="Past Research">
        {pastResearch.map((project) => (
          <ContentCard key={project.project} title={project.project} description={project.summary} image={project.image} />
        ))}
      </Section>

      {/* Publications & Reports */}
      <Section title="Publications & Reports">
        {publications.map((publication) => (
          <ContentCard key={publication.title} title={publication.title} description={publication.description} image={publication.image} />
        ))}
      </Section>

      {/* Research Collaborations */}
      <Section title="Research Collaborations">
        {collaborations.map((collaboration) => (
          <ContentCard key={collaboration.institution} title={collaboration.institution} description={collaboration.description} image={collaboration.image} />
        ))}
      </Section>
    </div>
  );
};

export default ResearchPage;
