import React from "react";
import { motion } from "framer-motion";
import { MapPin, User, Shirt } from "lucide-react";
import { Link } from "react-router-dom";

const GarmentCard = ({ item }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 200 }}
      className="rounded-2xl bg-white dark:bg-gray-800 shadow-lg overflow-hidden hover:shadow-2xl transition-all border border-pink-100 dark:border-gray-700"
    >
      <figure className="relative h-52 overflow-hidden">
        <img
          src={item.images}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
        />
      </figure>

      <div className="p-6">

        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">{item.name}</h2>

        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">{item.category}</p>
        </div>

    

        <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm mb-4 gap-2">
          <User size={16} className="text-pink-500" />
          <span>Provider: {item.created_by}</span>
        </div>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
          <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 flex gap-1">
            <Shirt size={18} className="text-pink-500" />
            <span>${item.price}</span>
          </div>
        </div>

        <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4">
          <Link
            to={`/product/${item._id}`}
            className="w-full block text-center bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default GarmentCard;
