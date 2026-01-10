import React from "react";
import { motion } from "framer-motion";

export default function FeaturedBrands() {
  const brands = [
    {
      id: 1,
      name: "Luxury Couture",
      image: "https://via.placeholder.com/150?text=Couture",
      description: "High-end designer collections",
    },
    {
      id: 2,
      name: "Urban Style",
      image: "https://via.placeholder.com/150?text=Urban",
      description: "Contemporary fashion",
    },
    {
      id: 3,
      name: "Elegant Wear",
      image: "https://via.placeholder.com/150?text=Elegant",
      description: "Sophisticated elegance",
    },
    {
      id: 4,
      name: "Casual Chic",
      image: "https://via.placeholder.com/150?text=Casual",
      description: "Comfortable everyday wear",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-800">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4">
            Featured Brands
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our curated collection from premium brands and designers around the world
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center shadow-lg hover:shadow-2xl transition-all cursor-pointer"
            >
              <div className="w-24 h-24 mx-auto mb-4 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                {brand.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {brand.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
