import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();
  const is404Page = location.pathname === "/404" || location.pathname === "*";

  if (is404Page) {
    return null;
  }

  return (
    <footer className="bg-pink-50 text-gray-700 pt-14 pb-10 border-t border-pink-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <Link
              to="/"
              className="text-2xl font-extrabold text-pink-500 mb-3 flex items-center gap-2"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#EC4899"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 17c0-1.1-.9-2-2-2h-5V9.5c1.7-.2 3-1.7 3-3.5a3 3 0 0 0-6 0" />
                <path d="M4 17c0-1.1.9-2 2-2h5" />
                <path d="M2 17h20" />
              </svg>
              GarmentsGear
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              A stylish and elegant clothing rental platform offering premium
              outfits for every occasion.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-pink-600 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-pink-500 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/add-car" className="hover:text-pink-500 transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/my-listings"
                  className="hover:text-pink-500 transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/my-bookings"
                  className="hover:text-pink-500 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-pink-600 mb-4">
              Contact Info
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>📞 +880 1234 567 890</li>
              <li>📧 support@garmentsgear.com</li>
              <li>📍 Dhaka, Bangladesh</li>
              <li>🕐 Mon - Sat: 9 AM – 8 PM</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-pink-600 mb-4">
              Follow Us
            </h3>
            <div className="flex gap-4 text-2xl items-center">
              {/* Instagram */}
              <a href="#" className="hover:text-pink-500 transition">
                📸
              </a>

              {/* Facebook */}
              <a href="#" className="hover:text-pink-500 transition">
                📘
              </a>

              {/* LinkedIn */}
              <a href="#" className="hover:text-pink-500 transition">
                💼
              </a>

              {/* X (Twitter) */}
              <a
                href="#"
                aria-label="X (Twitter)"
                className="hover:text-pink-500 transition"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path d="M18.901 1.153h3.68l-8.04 9.19L23.999 22.847h-7.406l-5.8-7.582-6.64 7.582H.471l8.59-9.83L.999 1.153h7.594l5.243 6.932 6.065-6.932zm-1.29 19.49h2.04L6.27 3.259H4.087L17.61 20.643z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-pink-200 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <p>&copy; 2024 GarmentsGear. All rights reserved.</p>

            <div className="flex gap-4 md:justify-end">
              <Link className="hover:text-pink-500 transition">
                Privacy Policy
              </Link>
              <Link className="hover:text-pink-500 transition">
                Terms of Service
              </Link>
              <Link className="hover:text-pink-500 transition">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
