import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import useAxiosSecure from "../hooks/useAxiosSecure";
// import useAxiosSecure from "../hooks/useAxiosSecure"; 


export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const axiosSecure= useAxiosSecure();
 

  // Load data
  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      const res = await axiosSecure.get("/products");
      console.log(res.data.data);
      setProducts(res.data.data);
      setLoading(false);
    };
    fetchProducts();
  
  }, []);

  if (loading) return <LoadingSpinner></LoadingSpinner>

  //  PAGINATION CALCULATIONS
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-pink-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">
            All Products
          </h1>
          <p className="text-gray-600 text-lg mt-2">
            Explore beautiful garments and outfits for every occasion
          </p>
        </motion.div>

        {/* PRODUCT GRID (PAGINATED LIST) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentProducts.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="rounded-2xl bg-white border border-pink-200 shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <figure className="h-56 overflow-hidden">
                <img
                  src={product.images}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                />
              </figure>

              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  {product.name}
                </h2>

                <p className="text-sm text-pink-500 font-medium mb-2">
                  {product.category}
                </p>

                <p className="text-gray-700">
                  <strong>Price:</strong> ৳{product.price}
                </p>

                <p className="text-gray-700 mb-4">
                  <strong>Available:</strong> {product.quantity}
                </p>

                <Link
                  to={`/product/${product._id}`}
                  className="btn bg-gradient-to-r from-pink-500 to-pink-400 text-white border-none w-full rounded-lg hover:opacity-90"
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* PAGINATION UI */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-3">
            {/* Previous button */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 rounded-lg border border-pink-300 bg-white disabled:opacity-40 hover:bg-pink-100"
            >
              Previous
            </button>

            {/* Page numbers */}
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-4 py-2 rounded-lg border ${
                  currentPage === index + 1
                    ? "bg-pink-500 text-white border-pink-500"
                    : "bg-white border-pink-300 hover:bg-pink-100"
                }`}
              >
                {index + 1}
              </button>
            ))}

            {/* Next button */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 rounded-lg border border-pink-300 bg-white disabled:opacity-40 hover:bg-pink-100"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
