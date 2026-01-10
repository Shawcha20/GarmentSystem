import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How does the rental process work?",
      answer:
        "Browse our collection, select your outfit, choose rental dates, and proceed to checkout. We'll deliver to your doorstep, and you can return it before your rental period ends.",
    },
    {
      id: 2,
      question: "What is the rental duration and pricing?",
      answer:
        "We offer flexible rental periods from 1 day to 30 days. Prices vary based on the outfit and duration. Check individual product pages for detailed pricing.",
    },
    {
      id: 3,
      question: "Is there a damage fee?",
      answer:
        "We offer damage protection for a small additional fee. Normal wear is covered. Significant damages are assessed separately. Check our terms for more details.",
    },
    {
      id: 4,
      question: "How do I track my order?",
      answer:
        "Log in to your account and navigate to 'Track Orders' to see real-time delivery and return status. You'll also receive email notifications at each step.",
    },
    {
      id: 5,
      question: "Can I extend my rental?",
      answer:
        "Yes! You can extend your rental through your account dashboard if the outfit is available. Additional charges will apply for the extended period.",
    },
    {
      id: 6,
      question: "What's your return policy?",
      answer:
        "Items must be returned by the rental end date. We provide prepaid return labels for convenience. Late returns incur additional charges per day.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-6 bg-white dark:bg-gray-800">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Find answers to common questions about our rental service
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-700 hover:bg-pink-50 dark:hover:bg-gray-600 transition-colors flex items-center justify-between"
              >
                <span className="text-left font-semibold text-gray-800 dark:text-white">
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-pink-500 flex-shrink-0 ml-4"
                >
                  <FaChevronDown />
                </motion.div>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 py-4 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 border-t border-gray-200 dark:border-gray-700">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
