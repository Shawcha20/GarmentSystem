import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GarmentCard from "./Product";
import useAxiosSecure from "../hooks/useAxiosSecure";
import LoadingSpinner from "./Shared/LoadingSpinner";




export default function OurProducts() {
  const [featuredGarments, setFeaturedGarments] = useState([]);
  const [loading,setLoading]=useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    setLoading(true);
    const fetchGarments = async () => {
      
      try {
        const res = await axiosSecure.get("/featured-products");
        console.log(res);
        let data = res.data;
        if (data.length > 6) data = data.slice(0, 6);
        setFeaturedGarments(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching garments:", err);
      }
    };

    fetchGarments();
  }, []);


  if(loading)return <LoadingSpinner></LoadingSpinner>
  return (
    <section className="bg-gradient-to-br from-pink-50 via-white to-pink-100 py-20">
      <div className="container mx-auto px-6">

        <div className="text-center mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-extrabold text-gray-900 mb-3"
          >
            <span className="bg-gradient-to-r from-pink-500 to-pink-400 bg-clip-text text-transparent">
              Featured Garments
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            Explore our premium collection of garments available for rent.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {featuredGarments.map((item) => (
            <GarmentCard key={item._id} item={item} />
          ))}
        </motion.div>

        <div className="text-center mt-16">
          <Link
            to="/all-products"
            className="inline-block bg-pink-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-pink-600 transition"
          >
            View All Product
          </Link>
        </div>

      </div>
    </section>
  );
}
