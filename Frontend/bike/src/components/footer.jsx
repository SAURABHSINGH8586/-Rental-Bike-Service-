import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        <div>
          <h2 className="text-xl font-bold text-orange-500">BikeRental</h2>
          <p className="mt-2 text-gray-300">
            Rent bikes hourly, effortlessly. Your journey begins with us.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-orange-400">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-orange-500">Home</a></li>
            <li><a href="#" className="hover:text-orange-500">Bikes</a></li>
            <li><a href="#" className="hover:text-orange-500">Pricing</a></li>
            <li><a href="#" className="hover:text-orange-500">Contact</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-orange-400">Support</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-orange-500">Help Center</a></li>
            <li><a href="#" className="hover:text-orange-500">Terms of Service</a></li>
            <li><a href="#" className="hover:text-orange-500">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3 text-orange-400">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-orange-500"><FaFacebookF /></a>
            <a href="#" className="hover:text-orange-500"><FaInstagram /></a>
            <a href="#" className="hover:text-orange-500"><FaTwitter /></a>
            <a href="#" className="hover:text-orange-500"><FaYoutube /></a>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        © {new Date().getFullYear()} BikeRental. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
