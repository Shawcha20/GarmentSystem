import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { motion } from "framer-motion";

import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";

export default function SingleTrackOrder() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosSecure.get(`/product-order/${id}`).then(res => {
        console.log(res);
      setOrder(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!order) return <p>Order not found</p>;

  const tracking = order.tracking || [];
  const lastIndex = tracking.length - 1;

  return (
    <div className="p-6 w-full">
      <h2 className="text-3xl font-bold text-pink-600 dark:text-pink-400 mb-4">
        Order Tracking
      </h2>

      {tracking.length === 0 ? (
        <p className="dark:text-gray-300">No tracking updates yet.</p>
      ) : (
        <div className="space-y-6">
          {tracking.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`p-6 rounded-xl border-l-4 shadow ${
                index === lastIndex
                  ? "border-pink-500 bg-pink-50 dark:bg-pink-900/20"
                  : "border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
              } dark:text-white`}
            >
              <h4 className="font-bold">{step.status}</h4>
              <p className="dark:text-gray-300">🕒 {new Date(step.time).toLocaleString()}</p>
              <p className="dark:text-gray-300">📍 {step.location}</p>
              {step.note && <p className="dark:text-gray-300">📝 {step.note}</p>}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}