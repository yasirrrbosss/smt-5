'use client';

import { Package, Heart, Github, Twitter, Mail } from 'lucide-react';
import Link from 'next/link';

const Footer = ({ variant = 'dashboard' }) => {
  const currentYear = new Date().getFullYear();

  if (variant === 'landing') {
    return (
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <Package className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-xl font-bold">ItemManager</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-md">
                The simplest way to manage your personal inventory. Keep track of all your belongings with our intuitive and secure platform.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Product
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/features" className="text-gray-400 hover:text-white transition-colors">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-gray-400 hover:text-white transition-colors">
                    Security
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Support
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} ItemManager. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0 flex items-center">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> using Next.js & Firebase
            </p>
          </div>
        </div>
      </footer>
    );
  }

  // Dashboard footer
  return (
    <footer className="bg-white border-t border-gray-200 px-6 py-4">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center text-sm text-gray-600">
          <Package className="h-4 w-4 text-blue-600 mr-2" />
          <span>ItemManager © {currentYear}</span>
        </div>
        <div className="flex items-center space-x-4 mt-2 sm:mt-0">
          <Link 
            href="/help" 
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            Help
          </Link>
          <Link 
            href="/privacy" 
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            Privacy
          </Link>
          <Link 
            href="/terms" 
            className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;