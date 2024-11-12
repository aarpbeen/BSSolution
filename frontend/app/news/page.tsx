import Image from 'next/image';

const NewsUpdatesPage = () => {
  const blogPosts = [
    {
      title: "Understanding Financial Markets: Trends & Predictions",
      excerpt: "An in-depth analysis of current trends in the financial markets and future predictions.",
      date: "October 5, 2024",
      image: "/images/blog1.jpg",
      link: "#",
    },
    {
      title: "The Future of Business: Innovations to Watch",
      excerpt: "Explore the latest innovations shaping the future of business.",
      date: "September 20, 2024",
      image: "/images/blog2.jpg",
      link: "#",
    },
    {
      title: "Research Insights: Key Findings from Our Latest Study",
      excerpt: "Discover the key findings from our recent research study on market dynamics.",
      date: "September 15, 2024",
      image: "/images/blog3.jpg",
      link: "#",
    },
    {
      title: "Financial Strategies for a Changing Economy",
      excerpt: "Learn effective financial strategies to navigate economic uncertainties.",
      date: "September 1, 2024",
      image: "/images/blog4.jpg",
      link: "#",
    },
    {
      title: "Business Development: Best Practices for Growth",
      excerpt: "Insights into best practices for sustainable business development.",
      date: "August 25, 2024",
      image: "/images/blog5.jpg",
      link: "#",
    },
  ];

  const pressReleases = [
    {
      title: "Company Launches New Financial Product",
      date: "October 1, 2024",
      link: "#",
    },
    {
      title: "Annual Report 2024 Released",
      date: "September 28, 2024",
      link: "#",
    },
    {
      title: "Partnership with XYZ Corp Announced",
      date: "September 15, 2024",
      link: "#",
    },
    {
      title: "New Office Opening in Downtown",
      date: "August 30, 2024",
      link: "#",
    },
    {
      title: "Sustainability Initiative Launched",
      date: "August 15, 2024",
      link: "#",
    },
  ];

  const mediaCoverage = [
    {
      title: "ABC News Covers Our Recent Innovations",
      date: "September 10, 2024",
      link: "#",
    },
    {
      title: "Finance Today Features Our Research",
      date: "September 5, 2024",
      link: "#",
    },
    {
      title: "Business Week Highlights Our Success Stories",
      date: "August 28, 2024",
      link: "#",
    },
  ];

  return (
    <div className="relative bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8 mt-11 relative z-10">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white">News & Updates</h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Stay updated with our latest blog posts, press releases, and media coverage.
          </p>
        </header>

        {/* Blog Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogPosts.map((post, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={500}
                  height={300}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{post.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.excerpt}</p>
                <span className="text-gray-500 dark:text-gray-400">{post.date}</span>
                <div className="mt-4">
                  <a href={post.link} className="text-blue-500 hover:underline">Read More</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Press Releases Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">Press Releases</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
            {pressReleases.map((release, index) => (
              <li key={index} className="mb-4">
                <a href={release.link} className="text-blue-500 hover:underline">{release.title}</a>
                <span className="text-gray-500 dark:text-gray-400"> - {release.date}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Media Coverage Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">Media Coverage</h2>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
            {mediaCoverage.map((coverage, index) => (
              <li key={index} className="mb-4">
                <a href={coverage.link} className="text-blue-500 hover:underline">{coverage.title}</a>
                <span className="text-gray-500 dark:text-gray-400"> - {coverage.date}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Summary Section */}
        <section className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Stay Informed</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Subscribe to our newsletter to receive the latest news and insights directly to your inbox.
          </p>
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition">Subscribe Now</button>
        </section>
      </div>
    </div>
  );
};

export default NewsUpdatesPage;
