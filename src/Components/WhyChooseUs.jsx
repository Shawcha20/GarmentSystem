import React from "react";
import { motion } from "framer-motion";
import { Star, Heart, Sparkles, ShieldCheck } from "lucide-react";

export default function WhyChooseUs() {
  const benefits = [
    {
      id: 1,
      icon: <Sparkles size={42} className="text-pink-500" />,
      title: "Premium Quality Outfits",
      desc: "We offer carefully curated garments for any event or celebration.",
    },
    {
      id: 2,
      icon: <Heart size={42} className="text-pink-500" />,
      title: "Affordable Rentals",
      desc: "Enjoy stunning dresses and suits at a fraction of the retail price.",
    },
    {
      id: 3,
      icon: <ShieldCheck size={42} className="text-pink-500" />,
      title: "Clean & Hygienic",
      desc: "All outfits are professionally cleaned and delivered fresh.",
    },
    {
      id: 4,
      icon: <Star size={42} className="text-pink-500" />,
      title: "Trusted by Thousands",
      desc: "We are loved by customers all over Bangladesh.",
    },
  ];

  return (
    <section className="py-20 bg-pink-50">
      <div className="container mx-auto px-6">
        
        <h2 className="text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-pink-500 to-pink-400 text-transparent bg-clip-text">
          Why Choose Us?
        </h2>

        <p className="text-center text-gray-600 mb-14 text-lg">
          We make outfit renting effortless, stylish, and affordable.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {benefits.map((b) => (
            <motion.div
              key={b.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="bg-white p-8 rounded-2xl text-center shadow-lg border border-pink-100"
            >
              <div className="flex justify-center mb-4">{b.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {b.title}
              </h3>
              <p className="text-gray-600 text-sm">{b.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
