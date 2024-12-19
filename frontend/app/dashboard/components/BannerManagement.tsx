import React, { useState } from 'react';
import { FaImage, FaTimesCircle,FaPlusCircle  } from 'react-icons/fa';

const BannerManagement = () => {
  // State for the list of banners
  const [banners, setBanners] = useState([
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
  const [banner, setBanner] = useState({
    id: null,
    title: '',
    description: '',
    imageUrl: '',
  });

  // Modal visibility state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle form submit for add/edit
  const handleSubmitBanner = (e) => {
    e.preventDefault();

    if (banner.id) {
      // Edit existing banner
      setBanners(banners.map((b) => (b.id === banner.id ? banner : b)));
    } else {
      // Add new banner
      setBanners([...banners, { ...banner, id: Date.now() }]);
    }

    setIsModalOpen(false); // Close modal
    setBanner({ id: null, title: '', description: '', imageUrl: '' }); // Reset form
  };

  // Handle banner edit
  const handleEdit = (bannerId) => {
    const bannerToEdit = banners.find((b) => b.id === bannerId);
    setBanner(bannerToEdit);
    setIsModalOpen(true); // Open modal to edit
  };

  // Handle banner delete
  const handleDelete = (bannerId) => {
    setBanners(banners.filter((b) => b.id !== bannerId));
  };

  // Handle modal open for adding new banner
  const handleAddNew = () => {
    setBanner({ id: null, title: '', description: '', imageUrl: '' }); // Clear form for new banner
    setIsModalOpen(true); // Open modal for new banner
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      {/* Button to open modal for adding a new banner, positioned at the top-right */}
      <div className="absolute top-[200px] right-9">
        <button
          onClick={handleAddNew}
          className="bg-[#126579] text-white px-3 flex justify-between items-center py-2 rounded-xl shadow-md hover:bg-[#67882b] transition duration-200"
        >
          Add <FaPlusCircle size={20} className='mx-[10px]'/>
        </button>
      </div>

      {/* List of existing banners */}
      <div className="mt-10 space-y-3">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-between p-2"
          >
            {/* Banner Image and Info */}
            <div className="flex items-center space-x-6">
              {/* Banner Image */}
              {banner.imageUrl ? (
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className="w-20 h-20 object-cover rounded-lg shadow-md"
                />
              ) : (
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400 text-2xl">
                  <FaImage />
                </div>
              )}

              {/* Banner Details */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {banner.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                  {banner.description}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => handleEdit(banner.id)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(banner.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for adding/editing banner */}
      {isModalOpen && (
     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
     <div className="relative bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full dark:border-[#138966] border-4 border-[#499d84] hover:border-[#1f473b] dark:hover:border-[#1f473b] transition-all duration-300">
       <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
         {banner.id ? 'Edit Banner' : 'Add New Banner'}
       </h3>
       <form onSubmit={handleSubmitBanner} className="space-y-6">
         {/* Title Input */}
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
   
         {/* Description Textarea */}
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
   
         {/* Image Upload */}
         <div className="flex flex-col">
           <label
             htmlFor="image"
             className="text-sm font-medium text-gray-700 dark:text-gray-300"
           >
             Banner Image
           </label>
           <div className="flex items-center space-x-3">
             <FaImage className="text-lg text-gray-500 dark:text-gray-400" />
             <input
               type="file"
               id="image"
               onChange={(e) =>
                 setBanner({
                   ...banner,
                   imageUrl: URL.createObjectURL(e.target.files[0]),
                 })
               }
               className="p-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f473b] dark:bg-gray-900 dark:text-white"
             />
           </div>
           {banner.imageUrl && (
             <div className="mt-4">
               <img
                 src={banner.imageUrl}
                 alt="Banner Preview"
                 className="rounded-md shadow-md max-h-40 object-cover border-4 border-blue-500 dark:border-blue-600"
               />
             </div>
           )}
         </div>
   
         {/* Submit Button */}
         <div className="flex justify-center">
           <button
             type="submit"
             className="bg-[#2e7c65] text-white px-6 py-3 rounded-lg shadow-md hover:bg-[#1f473b] transition duration-200 text-sm font-medium"
           >
             {banner.id ? 'Update Banner' : 'Save Banner'}
           </button>
         </div>
       </form>
   
       {/* Close Button */}
       <div
         onClick={() => setIsModalOpen(false)}
         className="absolute top-3 right-3 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl cursor-pointer"
       >
         <FaTimesCircle />
       </div>
     </div>
   </div>
   
      )}
    </div>
  );
};

export default BannerManagement;
