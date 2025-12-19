import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { showError, showSuccess } from "../Utils/Notification";


// 🔹 Fake product data (use backend later)
const demoProducts = [
  { _id: "1", name: "Elegant Bridal Lehenga", price: 2500 },
  { _id: "2", name: "Men’s Premium Blazer", price: 1200 },
];

export default function PaymentPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const found = demoProducts.find((p) => p._id === id);
    if (!found) return showError("Product not found");
    setProduct(found);
  }, [id]);

  if (!product) return null;

  const handlePayment = (e) => {
    e.preventDefault();

    showSuccess("Payment Successful 🎉");

    // 🔥 Save order - backend code commented for future use
    /*
    await axiosSecure.post("/order", {
      productId: product._id,
      totalPrice: product.price,
      email: user.email,
      paid: true
    });
    */

    navigate("/order-success");
  };

  return (
    <div className="min-h-screen bg-pink-50 py-16 px-4 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Secure Payment
        </h2>

        <p className="text-center text-gray-600 mb-6">
          Pay for <strong>{product.name}</strong>
        </p>

        {/* Payment Form */}
        <form onSubmit={handlePayment} className="space-y-5">
          <div>
            <label className="font-semibold">Card Holder Name</label>
            <input
              type="text"
              required
              placeholder="John Doe"
              className="input input-bordered w-full"
            />
          </div>

          <div>
            <label className="font-semibold">Card Number</label>
            <input
              type="text"
              required
              placeholder="4242 4242 4242 4242"
              className="input input-bordered w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Expiry</label>
              <input
                type="text"
                required
                placeholder="MM/YY"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="font-semibold">CVC</label>
              <input
                type="text"
                required
                placeholder="123"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* Amount */}
          <div className="bg-pink-100 p-4 rounded-lg text-center">
            <p className="text-gray-700">Amount to Pay:</p>
            <p className="text-3xl font-bold text-pink-600 mt-1">
              ৳{product.price}
            </p>
          </div>

          {/* Pay Button */}
          <button
            type="submit"
            className="btn bg-pink-600 hover:bg-pink-500 text-white w-full py-3 text-lg rounded-lg"
          >
            Pay Now
          </button>
        </form>
      </motion.div>
    </div>
  );
}
