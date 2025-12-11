import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

export default function CustomerFeedbackCarousel() {
  const [index, setIndex] = useState(0);

  // -------- Static Customer Reviews --------
  const reviews = [
    {
      id: 1,
      name: "Ayesha Rahman",
      image:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&q=80",
      rating: 5,
      review:
        "Absolutely loved the outfit! Perfect fit and amazing quality. I received compliments the entire event!",
    },
    {
      id: 2,
      name: "Sadia Hasan",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80",
      rating: 4,
      review:
        "Great service and timely delivery. The dress was exactly as shown in the pictures!",
    },
    {
      id: 3,
      name: "Nusrat Jahan",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80",
      rating: 5,
      review:
        "Loved how easy the booking process was. The bridal lehenga I rented looked stunning!",
    },
  ];

  // Auto-slide every 5s
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [reviews.length]);

  const nextReview = () => setIndex((prev) => (prev + 1) % reviews.length);
  const prevReview = () =>
    setIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  const active = reviews[index];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-extrabold mb-6"
        >
          <span className="bg-gradient-to-r from-pink-500 to-pink-400 bg-clip-text text-transparent">
            Customer Feedback
          </span>
        </motion.h2>

        <p className="text-gray-600 mb-10 text-lg">
          Hear what our lovely customers say about their experience.
        </p>

        {/* Carousel Container */}
        <div className="relative max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="bg-pink-50 p-10 rounded-2xl shadow-lg border border-pink-200"
            >
              {/* Customer Image */}
              <img
                src={active.image}
                alt={active.name}
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-pink-300 shadow-md"
              />

              {/* Customer Name */}
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {active.name}
              </h3>

              {/* Rating */}
              <div className="flex justify-center gap-1 mb-4">
                {Array(active.rating)
                  .fill(0)
                  .map((_, i) => (
                    <Star key={i} size={20} className="text-pink-500 fill-pink-500" />
                  ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-700 text-sm leading-relaxed max-w-xl mx-auto">
                “{active.review}”
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevReview}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full hover:bg-pink-100 transition"
          >
            ❮
          </button>

          <button
            onClick={nextReview}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-3 rounded-full hover:bg-pink-100 transition"
          >
            ❯
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i === index ? "bg-pink-500 w-6" : "bg-pink-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </section>
  );
}
