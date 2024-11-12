'use client'
import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import { FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { IoCloseCircle } from "react-icons/io5";

const ContactUs = () => {
  const [isInquiryOpen, setInquiryOpen] = useState(false);
  const [isAppointmentOpen, setAppointmentOpen] = useState(false);
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    message: '',
  });
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleAppointmentChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const handleAppointmentSubmit = (e) => {
    e.preventDefault();
    console.log('Appointment Data:', appointmentData);
    setAppointmentOpen(false); 
  };

  const handleContactFormChange = (e) => {
    const { name, value } = e.target;
    setContactFormData({ ...contactFormData, [name]: value });
  };

  const handleContactFormSubmit = (e) => {
    e.preventDefault();
    console.log('Contact Form Data:', contactFormData);
    setContactFormData({ name: '', email: '', message: '' }); 
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8 font-Josefin">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white text-center mb-6">Contact Us</h1>

      {/* Contact Information */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">Get in Touch</h2>
          <div className="flex items-center space-x-4">
            <MdEmail className="text-2xl text-green-600" />
            <span className="text-lg text-gray-700 dark:text-gray-300">email@example.com</span>
          </div>
          <div className="flex items-center space-x-4">
            <MdPhone className="text-2xl text-green-600" />
            <span className="text-lg text-gray-700 dark:text-gray-300">+1 234 567 890</span>
          </div>
          <div className="flex items-center space-x-4">
            <MdLocationOn className="text-2xl text-green-600" />
            <span className="text-lg text-gray-700 dark:text-gray-300">123 Main St, City, Country</span>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">Send Us a Message</h2>
          <form onSubmit={handleContactFormSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={contactFormData.name}
              onChange={handleContactFormChange}
              placeholder="Your Name"
              required
              className="w-full p-2 border border-gray-300 rounded-lg dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              name="email"
              value={contactFormData.email}
              onChange={handleContactFormChange}
              placeholder="Your Email"
              required
              className="w-full p-2 border border-gray-300 rounded-lg dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="message"
              value={contactFormData.message}
              onChange={handleContactFormChange}
              placeholder="Your Message"
              required
              rows="4"
              className="w-full p-2 border border-gray-300 rounded-lg dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Google Map */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 p-6">Our Location</h2>
        <iframe
          className="w-full h-64 rounded-lg"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509358!2d144.95373631531845!3d-37.81720997975172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f0b1b75%3A0xf569b800ba0c2c3c!2sVictoria%20University!5e0!3m2!1sen!2sau!4v1637255829513!5m2!1sen!2sau"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

      {/* Buttons for Inquiry and Appointment */}
      <div className="flex justify-between mt-8">

        <button
          onClick={() => setAppointmentOpen(true)}
          className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow hover:bg-green-700 transition transform hover:scale-105"
        >
          Book an Appointment
        </button>
      </div>

   

      {/* Appointment Modal */}
      <Dialog open={isAppointmentOpen} onClose={() => setAppointmentOpen(false)} className="relative z-10">
        <div className="fixed inset-0 bg-black bg-opacity-30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 max-w-xs w-full relative">
            <button 
              onClick={() => setAppointmentOpen(false)} 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              <IoCloseCircle size={24} />
            </button>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Book an Appointment</h2>
            <form onSubmit={handleAppointmentSubmit} className="space-y-2">
              <input
                type="text"
                name="name"
                value={appointmentData.name}
                onChange={handleAppointmentChange}
                placeholder="Your Name"
                required
                className="w-full p-2 border border-gray-300 rounded-lg dark:border-gray-600"
              />
              <input
                type="email"
                name="email"
                value={appointmentData.email}
                onChange={handleAppointmentChange}
                placeholder="Your Email"
                required
                className="w-full p-2 border border-gray-300 rounded-lg dark:border-gray-600"
              />
              <input
                type="date"
                name="date"
                value={appointmentData.date}
                onChange={handleAppointmentChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg dark:border-gray-600"
              />
              <input
                type="time"
                name="time"
                value={appointmentData.time}
                onChange={handleAppointmentChange}
                required
                className="w-full p-2 border border-gray-300 rounded-lg dark:border-gray-600"
              />
              <textarea
                name="message"
                value={appointmentData.message}
                onChange={handleAppointmentChange}
                placeholder="Additional Message"
                rows="2"
                className="w-full p-2 border border-gray-300 rounded-lg dark:border-gray-600"
              />
              <button
                type="submit"
                className="w-full bg-green-600 text-white font-bold py-2 rounded-lg hover:bg-green-700 transition"
              >
                Confirm Appointment
              </button>
            </form>
          </div>
        </div>
      </Dialog>

      {/* Social Media Icons */}
      <div className="flex justify-center space-x-6">
        <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-600 transition">
          <FaFacebookF size={24} />
        </a>
        <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-400 transition">
          <FaTwitter size={24} />
        </a>
        <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-blue-700 transition">
          <FaLinkedinIn size={24} />
        </a>
      </div>
    </div>
  );
};

export default ContactUs;
