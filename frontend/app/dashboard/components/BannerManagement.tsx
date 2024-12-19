import { FaImage, FaTimesCircle, FaPlusCircle } from 'react-icons/fa';
import Image from 'next/image';
import React, { useState } from 'react';

interface Banner {
  id: number | null;
  title: string;
  description: string;
  imageUrl: string;
}

const BannerManagement = () => {
  // State for the list of banners
  const [banners, setBanners] = useState<Banner[]>([
    {
      id: 1,
      title: 'Welcome Banner',
      description: 'Welcome to our platform',
      imageUrl: '',
    },
    {
      id: 2,
      title: 'Course Offer Banner',
      description: 'Check out our new courses',
      imageUrl: '',
    },
    {
      id: 3,
      title: 'Course Offer Banner',
      description: 'Check out our new courses',
      imageUrl: '',
    },
    {
      id: 4,
      title: 'Course Offer Banner',
      description: 'Check out our new courses',
      imageUrl: '',
    },
    {
      id: 5,
      title: 'Course Offer Banner',
      description: 'Check out our new courses',
      imageUrl: '',
    },
  ]);

  // State for the current banner form (for add/edit)
  const [banner, setBanner] = useState<Banner>({
    id: null,
    title: '',
    description: '',
    imageUrl: '',
  });

  // Modal visibility state
  const [isModalOpen, setIsModalOpen] = useState(false);

  const resetForm = () => {
    setBanner({ id: null, title: '', description: '', imageUrl: '' });
  };

  // Handle form submit for add/edit
  const handleSubmitBanner = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (banner.id) {
      // Edit existing banner
      setBanners(banners.map((b) => (b.id === banner.id ? banner : b)));
    } else {
      // Add new banner
      setBanners([...banners, { ...banner, id: Date.now() }]);
    }

    setIsModalOpen(false); // Close modal
    resetForm(); // Reset form
  };

  // Handle banner edit
  const handleEdit = (bannerId: number) => {
    const bannerToEdit = banners.find((b) => b.id === bannerId);
    setBanner(bannerToEdit!); // Force non-null assertion (since we know it exists)
    setIsModalOpen(true); // Open modal to edit
  };

  // Handle banner delete
  const handleDelete = (bannerId: number) => {
    setBanners(banners.filter((b) => b.id !== bannerId));
  };

  // Handle modal open for adding new banner
  const handleAddNew = () => {
    resetForm(); // Clear form for new banner
    setIsModalOpen(true); // Open modal for new banner
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="absolute top-[200px] right-9">
        <button
          onClick={handleAddNew}
          className="bg-[#126579] text-white px-3 flex justify-between items-center py-2 rounded-xl shadow-md hover:bg-[#67882b] transition duration-200"
        >
          Add <FaPlusCircle size={20} className="mx-[10px]" />
        </button>
      </div>

      {/* List of existing banners */}
      <div className="mt-10 space-y-3">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-between p-2"
          >
            <div className="flex items-center space-x-6">
              {banner.imageUrl ? (
                <Image
                  src={banner.imageUrl}
                  alt={banner.title}
                  width={80}
                  height={80}
                  className="object-cover rounded-lg shadow-md"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 text-2xl">
                  <FaImage />
                </div>
              )}

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {banner.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  {banner.description}
                </p>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  if (banner.id !== null) {
                    handleEdit(banner.id);
                  }
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (banner.id !== null) {
                    handleDelete(banner.id);
                  }
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
              {banner.id ? 'Edit Banner' : 'Add New Banner'}
            </h3>
            <form onSubmit={handleSubmitBanner} className="space-y-6">
              <div className="flex flex-col">
                <label
                  htmlFor="title"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Banner Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={banner.title}
                  onChange={(e) =>
                    setBanner({ ...banner, title: e.target.value })
                  }
                  placeholder="Enter the banner title"
                  className="p-3 text-sm border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f473b] dark:bg-gray-900 dark:text-white transition duration-200"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="description"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Banner Description
                </label>
                <textarea
                  id="description"
                  value={banner.description}
                  onChange={(e) =>
                    setBanner({ ...banner, description: e.target.value })
                  }
                  placeholder="Write a description for the banner"
                  rows={4}
                  className="p-3 text-sm border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f473b] dark:bg-gray-900 dark:text-white transition duration-200"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="image"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Banner Image
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files) {
                      setBanner({
                        ...banner,
                        imageUrl: URL.createObjectURL(e.target.files[0]),
                      });
                    }
                  }}
                  className="p-3 text-sm border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f473b] dark:bg-gray-900 dark:text-white transition duration-200"
                />
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-700 transition"
                >
                  {banner.id ? 'Update Banner' : 'Add Banner'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-2 right-2 text-white rounded-md shadow-md transition"
                >
                  <FaTimesCircle size={22} />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BannerManagement;
