import Image from 'next/image';

const Loader: React.FC = () => {
  return (
    <div className="relative flex flex-col justify-center items-center h-screen bg-transparent dark:bg-transparent">
      {/* Overlay for better visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-80 z-10"></div>

      {/* Spinner Container */}
      <div className="relative flex justify-center items-center">
        {/* Spinning Loader */}
        <div className="animate-spin rounded-full h-24 w-24 border-4 border-t-transparent border-b-transparent border-purple-500 border-opacity-50 z-20"></div>

        {/* Animated Image of a Book */}
        <Image
          src="/images/loader.png"
          alt="Loading Book"
          height={84}
          width={84}
          className="absolute z-30 transition-transform duration-500 ease-in-out transform hover:scale-110 animate-bounce rounded-full opacity-90"
        />
      </div>

      {/* Loading Message */}
      <p className="absolute bottom-16 text-white text-lg font-medium z-30 tracking-wider">
        Empowering Your Knowledge{' '}
        <span className="text-blue-600">through E-Learning</span>
      </p>
    </div>
  );
};

export default Loader;
