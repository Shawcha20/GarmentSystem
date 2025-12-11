import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";
// import useAxiosSecure from "../hooks/useAxiosSecure"; 


export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const demoProducts = [
    {
      _id: "1",
      name: "Elegant Bridal Lehenga",
      category: "Bridal",
      price: 2500,
      quantity: 3,
      image:
        "https://images.unsplash.com/photo-1593032457869-382a725464ec?w=800&q=80",
    },
    {
      _id: "2",
      name: "Men’s Premium Blazer",
      category: "Men",
      price: 1200,
      quantity: 5,
      image:
        "https://images.unsplash.com/photo-1520975940657-7f6fd1b55c05?w=800&q=80",
    },
    {
      _id: "3",
      name: "Women’s Party Gown",
      category: "Women",
      price: 1800,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
    },
    {
      _id: "4",
      name: "Kids Festive Dress",
      category: "Kids",
      price: 600,
      quantity: 6,
      image:
        "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80",
    },
    {
      _id: "5",
      name: "Designer Saree",
      category: "Women",
      price: 2200,
      quantity: 4,
      image:
        "https://images.unsplash.com/photo-1503341981062-cf57ebb85d5c?w=800&q=80",
    },
    {
      _id: "6",
      name: "Traditional Sherwani",
      category: "Men",
      price: 2800,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1593032739988-2a2b4ccb5704?w=800&q=80",
    },
    {
      _id: "7",
      name: "Party Saree",
      category: "Women",
      price: 1500,
      quantity: 7,
      image:
        "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=800&q=80",
    },
    {
      _id: "8",
      name: "Men Formal Suit",
      category: "Men",
      price: 2000,
      quantity: 3,
      image:
        "https://images.unsplash.com/photo-1520975434080-9f8a1e4c8f31?w=800&q=80",
    },
    {
      _id: "9",
      name: "Kids Traditional Wear",
      category: "Kids",
      price: 500,
      quantity: 9,
      image:
        "https://images.unsplash.com/photo-1600628422011-b9d5ef42e381?w=800&q=80",
    },
  ];

  // Load data
  useEffect(() => {
    setLoading(true);

    // Backend fetch disabled
    // const fetchProducts = async () => {
    //   const res = await axiosSecure.get("/products");
    //   setProducts(res.data);
    // };

    setTimeout(() => {
      setProducts(demoProducts);
      setLoading(false);
    }, 600);
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
                  src={product.image}
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
