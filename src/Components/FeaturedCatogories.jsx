import React from "react";
import { motion } from "framer-motion";

export default function FeaturedCategories() {
  const categories = [
    {
      id: 1,
      name: "Women's Wear",
      img: "https://images.unsplash.com/photo-1520975940657-7f6fd1b55c05?w=800&q=80",
    },
    {
      id: 2,
      name: "Men's Wear",
      img: "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=800&q=80",
    },
    {
      id: 3,
      name: "Bridal Collection",
      img: "https://images.unsplash.com/photo-1609856869229-4b60e06d9ba8?w=800&q=80",
    },
    {
      id: 4,
      name: "Kids Wear",
      img: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        
        <h2 className="text-4xl font-extrabold text-center mb-4 bg-gradient-to-r from-pink-500 to-pink-400 text-transparent bg-clip-text">
          Featured Categories
        </h2>

        <p className="text-center text-gray-600 mb-12 text-lg">
          Browse outfits tailored for every occasion and personality.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <motion.div
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="rounded-2xl overflow-hidden shadow-lg border border-pink-100 bg-pink-50"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800">
                  {cat.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
