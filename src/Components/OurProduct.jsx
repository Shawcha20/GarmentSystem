import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GarmentCard from "./Product";
import LoadingSpinner from "./Shared/LoadingSpinner";
import useAxiosPublic from "../hooks/useAxiosPublic";

export default function OurProducts() {
  const [featuredGarments, setFeaturedGarments] = useState([]);
  const [loading, setLoading] = useState(true);

  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    let isMounted = true; 

    const fetchGarments = async () => {
      try {
        const res = await axiosPublic.get("/featured-products");

        if (!isMounted) return;

        let data = res.data || [];
        if (data.length > 6) data = data.slice(0, 6);

        setFeaturedGarments(data);
      } catch (error) {
        console.error("Failed to fetch featured products:", error);

        if (isMounted) setFeaturedGarments([]);
      } finally {
      
        if (isMounted) setLoading(false);
      }
    };

    fetchGarments();

    return () => {
      isMounted = false;
    };
  }, [axiosPublic]);

  if (loading) return <LoadingSpinner />;

  return (
    <section className="bg-gradient-to-br from-pink-50 via-white to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3"
          >
            <span className="bg-gradient-to-r from-pink-500 to-pink-400 bg-clip-text text-transparent">
              Our Products
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 dark:text-gray-300 text-lg"
          >
            Explore our premium collection of garments available for rent.
          </motion.p>
        </div>

        {featuredGarments.length === 0 ? (
          <p className="text-center text-gray-500">
            No featured products available right now.
          </p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 dark:gap-10"
          >
            {featuredGarments.map((item) => (
              <GarmentCard key={item._id} item={item} />
            ))}
          </motion.div>
        )}

        <div className="text-center mt-16">
          <Link
            to="/all-products"
            className="inline-block bg-pink-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-pink-600 transition"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
