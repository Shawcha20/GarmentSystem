import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaBox, FaGlobeAmericas, FaStar } from "react-icons/fa";

export default function StatisticsSection() {
  const stats = [
    {
      id: 1,
      icon: <FaUsers className="text-4xl" />,
      number: "10K+",
      label: "Happy Customers",
      color: "text-pink-500",
    },
    {
      id: 2,
      icon: <FaBox className="text-4xl" />,
      number: "5000+",
      label: "Dress Collection",
      color: "text-blue-500",
    },
    {
      id: 3,
      icon: <FaGlobeAmericas className="text-4xl" />,
      number: "50+",
      label: "Cities Served",
      color: "text-green-500",
    },
    {
      id: 4,
      icon: <FaStar className="text-4xl" />,
      number: "4.8★",
      label: "Average Rating",
      color: "text-yellow-500",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-br from-pink-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 border-y border-pink-200 dark:border-gray-700">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4">
            Why We're The Best Choice
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Join thousands of satisfied customers who trust us for their fashion needs
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="bg-white dark:bg-gray-700 rounded-xl p-8 text-center shadow-lg hover:shadow-2xl transition-all"
            >
              <div className={`flex justify-center mb-4 ${stat.color}`}>
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {stat.number}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-lg font-semibold">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
