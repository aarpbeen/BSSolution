import Image from 'next/image';

const TradingPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-12">
      {/* Page Header */}
      <header className="mb-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Trading Solutions</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
          Discover our range of trading services to help you stay ahead in the financial markets.
        </p>
      </header>

      {/* Market Research Section */}
      <section className="relative mb-20 p-10 rounded-xl shadow-lg transition bg-gradient-to-br from-green-200 to-blue-200 dark:from-gray-800 dark:to-gray-900">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="max-w-lg">
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Market Research</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              We provide in-depth market research and trading strategies tailored to your needs.
            </p>
            <button className="px-6 py-3 bg-green-500 text-white rounded-full shadow-lg hover:bg-green-400 transition">
              Learn More
            </button>
          </div>
          <div className="mt-8 lg:mt-0">
            <Image
              src="/images/consulting.png"
              alt="Market Research"
              width={400}
              height={300}
              className="rounded-full shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Trade Analytics Section */}
      <section className="relative mb-20 bg-gray-50 dark:bg-gray-800 p-12 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8 transition">
        <div className="flex flex-col justify-center">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Trade Analytics</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
            Our analytics offer actionable insights, helping you make informed decisions in the markets.
          </p>
          <button className="px-6 py-3 bg-yellow-500 text-white rounded-full shadow-lg hover:bg-yellow-400 transition">
            Explore Analytics
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tl from-yellow-100 to-yellow-300 dark:from-yellow-700 dark:to-yellow-500 opacity-60 rounded-full"></div>
          <Image
            src="/images/consulting.png"
            alt="Trade Analytics"
            width={400}
            height={300}
            className="relative z-10 rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Investment Advisory Section */}
      <section className="relative mb-20 p-12 bg-gradient-to-b from-purple-200 via-pink-200 to-red-200 dark:from-purple-800 dark:via-pink-800 dark:to-red-800 rounded-3xl shadow-xl text-center transition">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Investment Advisory</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 max-w-xl mx-auto">
          Our advisors provide guidance on the best investment strategies, ensuring you maximize returns while managing risk.
        </p>
        <Image
          src="/images/consulting.png"
          alt="Investment Advisory"
          width={400}
          height={300}
          className="mx-auto rounded-full shadow-lg"
        />
      </section>

      {/* Market Reports Section */}
      <section className="relative p-12 mb-16 bg-gray-100 dark:bg-gray-900 rounded-lg shadow-xl transition">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4 text-center">Market Reports</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6 text-center">
          Stay updated with the latest market trends and opportunities through our comprehensive market reports.
        </p>
        <div className="flex justify-center">
          <Image
            src="/images/consulting.png"
            alt="Market Reports"
            width={400}
            height={300}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>
    </div>
  );
};

export default TradingPage;
