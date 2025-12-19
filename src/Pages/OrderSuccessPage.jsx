import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-pink-50 flex justify-center items-center px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-md w-full"
      >
        <h1 className="text-4xl font-bold text-pink-600 mb-4">
          Payment Successful! 🎉
        </h1>

        <p className="text-gray-700 mb-6">
          Your order has been placed successfully.
        </p>

        <Link
          to="/dashboard/my-orders"
          className="btn bg-pink-600 hover:bg-pink-500 text-white w-full rounded-lg py-3"
        >
          View My Orders
        </Link>
      </motion.div>
    </div>
  );
}
