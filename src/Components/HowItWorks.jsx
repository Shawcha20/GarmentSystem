import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Shirt, CalendarCheck, Handshake } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      icon: <Shirt size={42} className="text-pink-500" />,
      title: "Browse Garments",
      description:
        "Explore our wide collection of dresses, ethnic wear, formal outfits, and more.",
    },
    {
      id: 2,
      icon: <ShoppingBag size={42} className="text-pink-500" />,
      title: "Select & Book",
      description:
        "Choose the outfit you love, select your size, and book it for your desired date.",
    },
    {
      id: 3,
      icon: <CalendarCheck size={42} className="text-pink-500" />,
      title: "Wear & Shine",
      description:
        "Pick up or receive delivery, enjoy the outfit, and shine at your event!",
    },
    {
      id: 4,
      icon: <Handshake size={42} className="text-pink-500" />,
      title: "Return Easily",
      description:
        "After use, return the garment hassle-free. We handle all the cleaning!",
    },
  ];

  return (
    <section className="py-20 bg-pink-50">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold text-center mb-4 text-gray-900"
        >
          <span className="bg-gradient-to-r from-pink-500 to-pink-400 bg-clip-text text-transparent">
            How It Works
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center text-gray-600 mb-14 text-lg"
        >
          Renting your favorite outfits has never been this easy.
        </motion.p>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-8 text-center border border-pink-100 hover:shadow-2xl transition"
            >
              <div className="mb-5 flex justify-center">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
