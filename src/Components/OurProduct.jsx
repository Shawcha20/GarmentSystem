import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import GarmentCard from "./Product";
// import useAxiosSecure from "../hooks/useAxiosSecure";   
// import LoadingSpinner from "./LoadingSpinner";



export default function OurProducts() {
  const [featuredGarments, setFeaturedGarments] = useState([]);

  // ----------- STATIC DEMO GARMENT DATA -----------
  const demoData = [
    {
      _id: "1",
      name: "Elegant Floral Dress",
      category: "Women's Wear",
      image_url:
        "https://images.unsplash.com/photo-1520975940657-7f6fd1b55c05?w=800&q=80",
      status: "Available",
      location: "Dhaka",
      provider: "Fashion House BD",
      price_per_day: 15,
    },
    {
      _id: "2",
      name: "Men’s Premium Blazer",
      category: "Men's Formal",
      image_url:
        "https://images.unsplash.com/photo-1542060748-10c28b62716f?w=800&q=80",
      status: "Available",
      location: "Chittagong",
      provider: "StyleMan BD",
      price_per_day: 20,
    },
    {
      _id: "3",
      name: "Luxury Bridal Lehenga",
      category: "Bridal Collection",
      image_url:
        "https://images.unsplash.com/photo-1609856869229-4b60e06d9ba8?w=800&q=80",
      status: "Available",
      location: "Sylhet",
      provider: "Royal Bridal BD",
      price_per_day: 50,
    },
    {
      _id: "4",
      name: "Casual Summer Top",
      category: "Women's Wear",
      image_url:
        "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&q=80",
      status: "Available",
      location: "Rajshahi",
      provider: "Trendy Look",
      price_per_day: 10,
    },
    {
      _id: "5",
      name: "Classic Men's Panjabi",
      category: "Men’s Ethnic",
      image_url:
        "https://images.unsplash.com/photo-1576871337632-f8bdf15e4a88?w=800&q=80",
      status: "Available",
      location: "Khulna",
      provider: "Heritage BD",
      price_per_day: 12,
    },
    {
      _id: "6",
      name: "Kids Wedding Outfit",
      category: "Kids Wear",
      image_url:
        "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=800&q=80",
      status: "Available",
      location: "Dhaka",
      provider: "Little Stars BD",
      price_per_day: 8,
    },
  ];

  // ----------- COMMENTED SERVER FETCH CODE -------------
  /*
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchGarments = async () => {
      try {
        const res = await axiosSecure.get("/garments");
        let data = res.data;
        if (data.length > 6) data = data.slice(0, 6);
        setFeaturedGarments(data);
      } catch (err) {
        console.error("Error fetching garments:", err);
      }
    };

    fetchGarments();
  }, []);
  */

  // Using static demo data instead
  useEffect(() => {
    setFeaturedGarments(demoData);
  }, []);

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
            to="/products"
            className="inline-block bg-pink-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-pink-600 transition"
          >
            View All Garments
          </Link>
        </div>

      </div>
    </section>
  );
}
