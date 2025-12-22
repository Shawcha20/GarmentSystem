import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";

import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import { showError } from "../Utils/Notification";
import useAxiosSecure from "../hooks/useAxiosSecure";


export default function ProductDetails() {
  const { id } = useParams();
  const { user, role ,status} = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductFromDB = async () => {
      try {
        const response = await axiosSecure.get(`/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        showError("Failed to fetch product details");
      }
    };

    fetchProductFromDB();
  }, [id]);

  if (!product) return <LoadingSpinner />;

  const handleOrder = () => {
    if (!user) return navigate("/login");

    if (role === "manager" || role == "admin" ||status=="suspended" ) {
      return showError("Managers or admins or suspended users cannot place orders.");
    }

    navigate(`/order/${product._id}`);
  };

  return (
    <div className="min-h-screen bg-pink-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white p-8 rounded-2xl shadow-lg"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* PRODUCT IMAGE */}
            <motion.img
              src={product.images}
              className="w-full rounded-xl shadow-md object-cover max-h-[500px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />

            {/* PRODUCT INFO */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <p className="text-pink-500 font-semibold text-lg mb-4">
                {product.category}
              </p>

              <p className="text-gray-700 mb-6">{product.description}</p>

              {/* DETAILS */}
              <div className="space-y-4">
                <p>
                  <strong className="text-gray-800">Price:</strong>{" "}
                  <span className="text-pink-600 font-bold">
                    ৳{product.price}
                  </span>
                </p>

                <p>
                  <strong className="text-gray-800">Available Quantity:</strong>{" "}
                  {product.quantity}
                </p>

                <p>
                  <strong className="text-gray-800">Minimum Order:</strong>{" "}
                  {product.minOrder}
                </p>

                <p>
                  <strong className="text-gray-800">Payment Options:</strong>{" "}
                  {product.paymentOption}
                </p>
              </div>

              {/* ORDER BUTTON */}
              <button
                onClick={handleOrder}
                className="btn bg-pink-500 hover:bg-pink-400 text-white font-bold mt-6 w-full py-3 rounded-lg"
              >
                Place Order
              </button>
              {/* 
              <p className="text-xs text-gray-400 text-center mt-2">
                *Only logged-in users can place orders
              </p> */}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
