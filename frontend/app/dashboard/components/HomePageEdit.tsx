import React, { useState } from 'react';
import { FaImage } from 'react-icons/fa';
import BannerManagement from './BannerManagement';

const HomePageEdit = () => {
  // State for the sections to manage form inputs
  const [banner, setBanner] = useState({ title: '', description: '', imageUrl: '' });
  const [coreServices, setCoreServices] = useState([
    { name: '', imageUrl: '', description: '' },
   
  ]);
  const [processes, setProcesses] = useState([
    { name: '', imageUrl: '', description: '' },
   
  ]);
  const [statistics, setStatistics] = useState([
    { number: 0, heading: '', description: '' },
   
  ]);

  // State to handle dropdown selection
  const [selectedSection, setSelectedSection] = useState<string>('banner');

  // Handle form submission
  const handleSubmitBanner = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to update banner (e.g., API call)
  };

  const handleSubmitCoreServices = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to update core services
  };

  const handleSubmitProcesses = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to update processes
  };

  const handleSubmitStatistics = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to update statistics
  };

  return (
    <div className="space-y-12">
      {/* Dropdown to select section */}
      <div className="mb-4 ">
        <label htmlFor="section" className="block text-lg font-bold">Section Section</label>
        <select
          id="section"
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="w-60 p-2 border-b-2 rounded-lg dark:bg-[#167663] cursor-pointer"
        >
          <option value="banner">Banner</option>
          <option value="coreServices" disabled>Core Services</option>
          <option value="processes" disabled>Our Processes</option>
          <option value="statistics" disabled>Key Statistics</option>
        </select>
      </div>

      {/* Render section based on dropdown selection */}
      {selectedSection === 'banner' && (
        <BannerManagement />
      
      )}

      {selectedSection === 'coreServices' && (
        <section>
          <h2 className="text-3xl font-bold mb-4">Core Services</h2>
          <form onSubmit={handleSubmitCoreServices} className="space-y-4">
            {coreServices.map((service, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="text"
                  value={service.name}
                  onChange={(e) => {
                    const updatedServices = [...coreServices];
                    updatedServices[index].name = e.target.value;
                    setCoreServices(updatedServices);
                  }}
                  placeholder="Service Name"
                  className="w-full p-2 border rounded-md"
                />
                <textarea
                  value={service.description}
                  onChange={(e) => {
                    const updatedServices = [...coreServices];
                    updatedServices[index].description = e.target.value;
                    setCoreServices(updatedServices);
                  }}
                  placeholder="Service Description"
                  className="w-full p-2 border rounded-md"
                />
                <div className="flex items-center space-x-2">
                  <FaImage className="text-xl" />
                  <input
                    type="file"
                    onChange={(e) => {
                      const updatedServices = [...coreServices];
                      updatedServices[index].imageUrl = URL.createObjectURL(e.target.files[0]);
                      setCoreServices(updatedServices);
                    }}
                    className="p-2 border rounded-md"
                  />
                </div>
              </div>
            ))}
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
              Save Core Services
            </button>
          </form>
        </section>
      )}

      {selectedSection === 'processes' && (
        <section>
          <h2 className="text-3xl font-bold mb-4">Our Processes</h2>
          <form onSubmit={handleSubmitProcesses} className="space-y-4">
            {processes.map((process, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="text"
                  value={process.name}
                  onChange={(e) => {
                    const updatedProcesses = [...processes];
                    updatedProcesses[index].name = e.target.value;
                    setProcesses(updatedProcesses);
                  }}
                  placeholder="Process Name"
                  className="w-full p-2 border rounded-md"
                />
                <textarea
                  value={process.description}
                  onChange={(e) => {
                    const updatedProcesses = [...processes];
                    updatedProcesses[index].description = e.target.value;
                    setProcesses(updatedProcesses);
                  }}
                  placeholder="Process Description"
                  className="w-full p-2 border rounded-md"
                />
                <div className="flex items-center space-x-2">
                  <FaImage className="text-xl" />
                  <input
                    type="file"
                    onChange={(e) => {
                      const updatedProcesses = [...processes];
                      updatedProcesses[index].imageUrl = URL.createObjectURL(e.target.files[0]);
                      setProcesses(updatedProcesses);
                    }}
                    className="p-2 border rounded-md"
                  />
                </div>
              </div>
            ))}
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
              Save Processes
            </button>
          </form>
        </section>
      )}

      {selectedSection === 'statistics' && (
        <section>
          <h2 className="text-3xl font-bold mb-4">Key Statistics</h2>
          <form onSubmit={handleSubmitStatistics} className="space-y-4">
            {statistics.map((stat, index) => (
              <div key={index} className="space-y-2">
                <input
                  type="number"
                  value={stat.number}
                  onChange={(e) => {
                    const updatedStats = [...statistics];
                    updatedStats[index].number = Number(e.target.value);
                    setStatistics(updatedStats);
                  }}
                  placeholder="Statistic Number"
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="text"
                  value={stat.heading}
                  onChange={(e) => {
                    const updatedStats = [...statistics];
                    updatedStats[index].heading = e.target.value;
                    setStatistics(updatedStats);
                  }}
                  placeholder="Statistic Heading"
                  className="w-full p-2 border rounded-md"
                />
                <textarea
                  value={stat.description}
                  onChange={(e) => {
                    const updatedStats = [...statistics];
                    updatedStats[index].description = e.target.value;
                    setStatistics(updatedStats);
                  }}
                  placeholder="Statistic Description"
                  className="w-full p-2 border rounded-md"
                />
              </div>
            ))}
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
              Save Statistics
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default HomePageEdit;
