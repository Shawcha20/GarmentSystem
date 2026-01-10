import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaCheckCircle } from "react-icons/fa";
import { showSuccess, showError } from "../Utils/Notification";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();

    if (!email) {
      showError("Please enter your email");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubscribed(true);
      setEmail("");
      showSuccess("Successfully subscribed to our newsletter!");
      
      setTimeout(() => setIsSubscribed(false), 3000);
    } catch {
      showError("Failed to subscribe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-16 px-6 bg-gradient-to-r from-pink-500 to-pink-600 dark:from-pink-900 dark:to-pink-800">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <FaEnvelope className="text-5xl text-white" />
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Stay Updated With Our Latest Trends
          </h2>

          <p className="text-lg text-pink-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and get exclusive offers, fashion tips, and new collection updates delivered to your inbox.
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading || isSubscribed}
              className="flex-1 px-6 py-3 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none disabled:opacity-75"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading || isSubscribed}
              className="px-8 py-3 bg-white text-pink-600 font-bold rounded-lg hover:bg-pink-50 transition-colors disabled:opacity-75 flex items-center justify-center gap-2"
            >
              {isSubscribed ? (
                <>
                  <FaCheckCircle /> Subscribed!
                </>
              ) : (
                "Subscribe"
              )}
            </motion.button>
          </form>

          <p className="text-pink-100 text-sm mt-6">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
