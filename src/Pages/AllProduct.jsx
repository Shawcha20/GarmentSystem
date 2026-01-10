import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaSearch, FaFilter, FaSort } from "react-icons/fa";
import LoadingSpinner from "../Components/Shared/LoadingSpinner";
import useAxiosPublic from "../hooks/useAxiosPublic";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  const itemsPerPage = 9;
  const axiosSecure = useAxiosPublic();

  // Load data
  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      const res = await axiosSecure.get("/products");
      setProducts(res.data.data);
      setLoading(false);
    };
    fetchProducts();
  }, []);

  // Get unique categories
  const categories = ["all", ...new Set(products.map(p => p.category))];

  // FILTERING LOGIC
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  // SORTING LOGIC
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "name-a-z":
        return a.name.localeCompare(b.name);
      case "name-z-a":
        return b.name.localeCompare(a.name);
      case "newest":
      default:
        return 0;
    }
  });

  // PAGINATION CALCULATIONS
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, priceRange, sortBy]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="min-h-screen bg-pink-50 dark:bg-gray-900 py-16">
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
          <p className="text-gray-600 dark:text-gray-400 text-lg mt-2">
            Explore beautiful garments and outfits for every occasion
          </p>
        </motion.div>

        {/* SEARCH BAR */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="relative">
            <FaSearch className="absolute left-4 top-4 text-pink-500 text-lg" />
            <input
              type="text"
              placeholder="Search products by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-pink-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </motion.div>

        {/* FILTER & SORT BAR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between"
        >
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition font-semibold"
          >
            <FaFilter /> Filters
          </button>

          <div className="flex items-center gap-2">
            <FaSort className="text-pink-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 rounded-lg border border-pink-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name-a-z">Name: A to Z</option>
              <option value="name-z-a">Name: Z to A</option>
            </select>
          </div>

          <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Showing {currentProducts.length > 0 ? startIndex + 1 : 0} - {Math.min(startIndex + itemsPerPage, filteredProducts.length)} of {filteredProducts.length} products
          </div>
        </motion.div>

        {/* FILTERS PANEL */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg border border-pink-200 dark:border-gray-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Category Filter */}
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Category</h3>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-pink-500 accent-pink-500"
                      />
                      <span className="text-gray-700 dark:text-gray-300 capitalize">
                        {category === "all" ? "All Categories" : category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Filter */}
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Price Range</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Min: ৳{priceRange[0]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 dark:text-gray-400 mb-2">
                      Max: ৳{priceRange[1]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <button
                    onClick={() => setPriceRange([0, 10000])}
                    className="text-sm text-pink-500 hover:text-pink-600 font-semibold"
                  >
                    Reset Price Range
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowFilters(false)}
              className="mt-6 w-full px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition font-semibold"
            >
              Apply Filters
            </button>
          </motion.div>
        )}

        {/* PRODUCT GRID */}
        {currentProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {currentProducts.map((product) => (
              <motion.div
                key={product._id}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="rounded-2xl bg-white dark:bg-gray-800 border border-pink-200 dark:border-gray-700 shadow-md overflow-hidden hover:shadow-xl transition"
              >
                <figure className="h-56 overflow-hidden">
                  <img
                    src={product.images}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </figure>

                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                    {product.name}
                  </h2>

                  <p className="text-sm text-pink-500 font-medium mb-2">
                    {product.category}
                  </p>

                  <p className="text-gray-700 dark:text-gray-300">
                    <strong>Price:</strong> ৳{product.price}
                  </p>

                  <p className="text-gray-700 dark:text-gray-300 mb-4">
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
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No products found matching your filters. Try adjusting your search or filters.
            </p>
          </motion.div>
        )}

        {/* PAGINATION UI */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center gap-2 flex-wrap"
          >
            {/* Previous button */}
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-2 rounded-lg border border-pink-300 dark:border-pink-700 bg-white dark:bg-gray-800 dark:text-gray-300 disabled:opacity-40 hover:bg-pink-100 dark:hover:bg-gray-700 transition font-semibold"
            >
              Previous
            </button>

            {/* Page numbers with ellipsis */}
            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              const isVisible =
                pageNum === 1 ||
                pageNum === totalPages ||
                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1);

              if (!isVisible && index > 0 && index < totalPages - 1) {
                if (index === 1 || index === totalPages - 2) {
                  return <span key={index} className="text-gray-500">...</span>;
                }
                return null;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-4 py-2 rounded-lg border transition ${
                    currentPage === pageNum
                      ? "bg-pink-500 text-white border-pink-500 font-semibold"
                      : "bg-white dark:bg-gray-800 dark:text-gray-300 border-pink-300 dark:border-gray-700 hover:bg-pink-100 dark:hover:bg-gray-700"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {/* Next button */}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-2 rounded-lg border border-pink-300 dark:border-pink-700 bg-white dark:bg-gray-800 dark:text-gray-300 disabled:opacity-40 hover:bg-pink-100 dark:hover:bg-gray-700 transition font-semibold"
            >
              Next
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
