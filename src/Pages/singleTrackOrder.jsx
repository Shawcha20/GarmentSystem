import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";


const TRACK_STEPS = [
  "Cutting Completed",
  "Sewing Started",
  "Finishing",
  "QC Checked",
  "Packed",
  "Shipped / Out for Delivery",
];

const STATUS_INDEX = {
  pending: 1,
  approved: 3,
  shipped: 5,
  delivered: 6,
};

export default function SingleTrackOrder() {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await axiosSecure.get(`/order/${id}`);
      setOrder(res.data);
      setLoading(false);
    };
    fetchOrder();
  }, [id, axiosSecure]);

  if (loading) return <LoadingSpinner />;
  if (!order) return <p className="p-6">Order not found</p>;

  const completedSteps = TRACK_STEPS.slice(
    0,
    STATUS_INDEX[order.status] || 1
  );

  return (
    <div className="p-6 w-full">
      <h2 className="text-3xl font-bold text-pink-600 mb-4">
        Order Tracking
      </h2>

      <p className="mb-6 text-gray-600">
        <strong>Order ID:</strong> {order._id} <br />
        <strong>Product:</strong> {order.productName} <br />
        <strong>Status:</strong> {order.status}
      </p>

      <div className="space-y-6">
        {completedSteps.map((step, index) => {
          const isLatest = index === completedSteps.length - 1;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-xl border-l-4 shadow ${
                isLatest
                  ? "border-pink-500 bg-pink-50"
                  : "border-gray-300 bg-white"
              }`}
            >
              <h4 className="font-bold text-lg">{step}</h4>
              <p className="text-sm text-gray-500">
                🕒 {new Date(order.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-500">
                📍 Dhaka Factory
              </p>

              {isLatest && (
                <span className="badge badge-success mt-3">
                  Latest Update
                </span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
