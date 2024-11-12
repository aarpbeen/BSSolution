import Image from 'next/image';

const EducationPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mt-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Education Services</h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          Explore our wide range of educational services, from tuition to online learning and workshops.
        </p>
      </header>

      {/* Tuition Services Section */}
      <section className="mb-16">
  <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Tuition Services</h2>

  {/* Flex container with image on the right and sections on the left */}
  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
    {/* Left: Tuition Service Cards */}
    <div className="flex flex-wrap gap-8 w-full lg:w-1/2">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="w-full md:w-full p-6 shadow-lg rounded-xl bg-gradient-to-r from-green-200 to-blue-300 dark:from-green-800 dark:to-blue-800"
        >
          <h3 className="text-2xl font-bold mb-4">Class {i + 10} to Ph.D. Guidance</h3>
          <p className="mt-4 text-gray-900 dark:text-gray-300">
            Offering comprehensive guidance for students across various levels, ensuring success.
          </p>
        </div>
      ))}
    </div>

    {/* Right: Larger Single Image */}
    <div className="w-full lg:w-1/2 flex justify-center items-center">
      <Image
        src="/images/education.png"
        alt="Tuition Services"
        width={700}  // Increased width
        height={500} // Increased height
        className="rounded-lg shadow-2xl"
      />
    </div>
  </div>
</section>



      {/* Courses Offered Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Courses Offered</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            'Bridge Courses',
            'Management Courses',
            'Accounting Courses',
            'IT Courses',
            'Finance Specialization',
          ].map((course) => (
            <div key={course} className="p-6 shadow-xl bg-blue-50 dark:bg-blue-900 rounded-xl">
              <Image
                src="/images/education.png"
                alt={course}
                width={400}
                height={200}
                className="rounded-b-xl"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{course}</h3>
              <p className="text-gray-700 dark:text-gray-400">
                Explore our detailed {course} offerings tailored to enhance your skills and career.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Online Learning Section */}
      <section className="mb-16 bg-gradient-to-r from-purple-200 to-pink-300 dark:from-purple-800 dark:to-pink-800 py-8 rounded-2xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Online Learning</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Access our virtual classrooms, student tools, and lecture recordings anywhere, anytime.
          </p>
        </div>
        <div className="flex flex-wrap justify-center mt-8">
          <Image
            src="/images/education.png"
            alt="Virtual Classroom"
            width={400}
            height={250}
            className="rounded-full shadow-2xl"
          />
        </div>
      </section>

      {/* Workshops & Training Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Workshops & Training</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            'Leadership Training',
            'Personal Finance Workshop',
            'Team Building Activities',
            'Digital Marketing Workshop',
            'Entrepreneurship Bootcamp',
          ].map((workshop) => (
            <div key={workshop} className="p-6 bg-gradient-to-r from-yellow-200 to-red-200 dark:from-yellow-800 dark:to-red-800 rounded-3xl shadow-lg">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">{workshop}</h3>
              <Image
                src="/images/education.png"
                alt={workshop}
                width={400}
                height={200}
                className="rounded-lg"
              />
              <p className="mt-4 text-gray-800 dark:text-gray-300">
                Learn essential skills from professionals through our in-depth {workshop}.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Additional Educational Services */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6">Additional Educational Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            'Career Counseling',
            'Academic Mentorship',
            'Scholarship Programs',
            'Certifications',
            'Research Opportunities',
          ].map((service) => (
            <div key={service} className="p-6 bg-gradient-to-br from-teal-300 to-lime-300 dark:from-teal-700 dark:to-lime-700 rounded-xl shadow-2xl">
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{service}</h3>
              <p className="mt-4 text-gray-800 dark:text-gray-300">
                Our {service} offerings are tailored to support your educational and career goals.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Student Success Stories */}
      <section className="py-12 bg-gray-100 dark:bg-gray-900 rounded-2xl">
        <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-6 text-center">Success Stories</h2>
        <div className="flex flex-wrap justify-center">
          {[
            { name: 'John Doe', story: 'Achieved top scores with our tuition services.' },
            { name: 'Jane Smith', story: 'Secured a scholarship after attending our workshops.' },
            { name: 'Chris Brown', story: 'Started a business with skills learned in our management courses.' },
          ].map((student, i) => (
            <div key={i} className="p-6 max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-lg mx-4 mb-6">
              <Image
                src="/images/education.png"
                alt={student.name}
                width={150}
                height={150}
                className="rounded-full mx-auto"
              />
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">{student.name}</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{student.story}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EducationPage;
