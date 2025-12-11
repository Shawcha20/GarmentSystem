import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function HeroBanner() {
  return (
    <div className="relative w-full h-[500px] md:h-[650px] overflow-hidden rounded-lg shadow-xl">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=1400&q=80')",
        }}
      >
        <div className="absolute inset-0 bg-pink-200/20 backdrop-blur-[1px]"></div>
      </div>

      {/* Text Content */}
      <div className="relative h-full flex items-center justify-center px-6 z-10">
        <div className="text-center max-w-2xl">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-800 drop-shadow-md"
          >
            Elevate Your Style with Premium Outfits
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="text-lg md:text-2xl text-white  mt-4 mb-8 drop-shadow"
          >
            Rent stunning garments for any occasion — elegant, affordable, and effortlessly stylish.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0 }}
          >
            <Link
              to="/add-car"
              className="px-10 py-3 text-lg font-semibold rounded-full bg-pink-500 text-white shadow-lg hover:bg-pink-600 transition"
            >
              View Products
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
