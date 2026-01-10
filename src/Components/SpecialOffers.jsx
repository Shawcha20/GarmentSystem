import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaTag, FaGift, FaClock } from "react-icons/fa";

export default function SpecialOffers() {
  const offers = [
    {
      id: 1,
      title: "New Customer Bonus",
      description: "Get 20% off on your first rental",
      icon: <FaGift className="text-4xl" />,
      color: "from-blue-500 to-blue-600",
      code: "FIRST20",
      validUntil: "Dec 31, 2024",
    },
    {
      id: 2,
      title: "Weekend Special",
      description: "Rent for 2+ days and save 15%",
      icon: <FaTag className="text-4xl" />,
      color: "from-purple-500 to-purple-600",
      code: "WEEKEND15",
      validUntil: "Every Weekend",
    },
    {
      id: 3,
      title: "Flash Deal",
      description: "50% off selected premium items today only",
      icon: <FaClock className="text-4xl" />,
      color: "from-red-500 to-red-600",
      code: "FLASH50",
      validUntil: "Today Only",
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
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-16 px-6 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4">
            Special Offers & Promotions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Enjoy exclusive deals and save big on your favorite outfits
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {offers.map((offer) => (
            <motion.div
              key={offer.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className={`bg-linear-to-br ${offer.color} rounded-xl p-8 text-white shadow-lg hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden`}
            >
              {/* Decorative Background */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="opacity-90">{offer.icon}</div>
                  <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-semibold">
                    {offer.validUntil}
                  </span>
                </div>

                <h3 className="text-2xl font-bold mb-2">{offer.title}</h3>
                <p className="text-white/90 mb-6">{offer.description}</p>

                <div className="bg-white/20 rounded-lg p-4 mb-6 text-center">
                  <p className="text-sm opacity-80 mb-1">Coupon Code</p>
                  <p className="text-2xl font-bold font-mono">{offer.code}</p>
                </div>

                <Link
                  to="/all-products"
                  className="inline-block w-full py-3 bg-white text-center font-bold rounded-lg text-gray-800 hover:bg-gray-100 transition-colors"
                >
                  Shop Now
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
