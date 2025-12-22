import React from "react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-pink-50 py-12 px-4">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">
        <h1 className="text-4xl font-bold text-pink-600 mb-6 text-center">
          About ClothRent
        </h1>

        <p className="text-gray-700 text-lg mb-6 text-center">
          ClothRent is a modern fashion rental platform designed to make
          premium clothing accessible, affordable, and sustainable.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Our Mission
            </h3>
            <p className="text-gray-600">
              We aim to redefine fashion consumption by enabling people to
              rent high-quality outfits instead of buying them. This reduces
              waste, saves money, and promotes sustainability.
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Why Choose Us?
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Premium & designer clothing</li>
              <li>Affordable rental prices</li>
              <li>Easy booking & tracking</li>
              <li>Eco-friendly fashion solution</li>
              <li>Trusted by hundreds of customers</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Vision
          </h3>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We envision a future where fashion is shared, not wasted —
            allowing everyone to look their best while caring for the planet.
          </p>
        </div>
      </div>
    </div>
  );
}
