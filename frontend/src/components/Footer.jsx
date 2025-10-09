import React from "react";
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-500 py-12 px-8">
     
      <div className="border-t border-gray-300 mb-8"></div>

      <div className="max-w-6xl mx-auto flex justify-between items-start">
        <div className="flex flex-row space-x-12">
       
          <div className="space-y-2 text-left">
            <h3 className="text-black text-sl font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-white transition-colors duration-200">
                  About Us
                </a>
              </li>
              <li>
                <a href="#careers" className="hover:text-white transition-colors duration-200">
                  Careers
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-2 text-left">
            <h3 className="text-black text-sl font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#help" className="hover:text-white transition-colors duration-200">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#safety" className="hover:text-white transition-colors duration-200">
                  Safety
                </a>
              </li>
              <li>
                <a href="#guidelines" className="hover:text-white transition-colors duration-200">
                  Guidelines
                </a>
              </li>
            </ul>
          </div>

        
          <div className="space-y-2 text-left">
            <h3 className="text-black text-sl font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#privacy" className="hover:text-white transition-colors duration-200">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#terms" className="hover:text-white transition-colors duration-200">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        
        <div className="flex flex-col items-end space-y-4">
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
              <FaFacebookF />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
              <FaLinkedinIn />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

   
      <div className="mt-10 text-xs text-gray-500 border-t border-gray-300 pt-6 text-center">
        © {new Date().getFullYear()} TravelGo Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
