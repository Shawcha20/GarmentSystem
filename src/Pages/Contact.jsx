import React, { useState } from "react";
import { showSuccess } from "../Utils/Notification";

export default function Contact() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      showSuccess("Your message has been sent successfully!");
      e.target.reset();
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow dark:shadow-gray-900 p-8">
        <h1 className="text-4xl font-bold text-pink-600 dark:text-pink-400 mb-6 text-center">
          Contact Us
        </h1>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
          Have questions, feedback, or need support?  
          We’d love to hear from you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Your Name"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
            />
            <input
              type="email"
              required
              placeholder="Your Email"
              className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
            />
          </div>

          <input
            type="text"
            required
            placeholder="Subject"
            className="input input-bordered w-full dark:bg-gray-700 dark:text-white"
          />

          <textarea
            required
            placeholder="Your Message"
            rows={5}
            className="textarea textarea-bordered w-full dark:bg-gray-700 dark:text-white"
          ></textarea>

          <button
            disabled={loading}
            className="btn bg-pink-500 hover:bg-pink-600 dark:bg-pink-600 dark:hover:bg-pink-700 text-white w-full"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-6 text-center text-gray-600 dark:text-gray-300">
          <p>📍 Bangladesh</p>
          <p>📧 support@clothrent.com</p>
          <p>📞 +880 1XXXXXXXXX</p>
        </div>
      </div>
    </div>
  );
}
