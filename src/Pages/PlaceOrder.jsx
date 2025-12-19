import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


import { useAuth } from "../hooks/useAuth";
import { showError, showSuccess } from "../Utils/Notification";

const demoProducts = [
  {
    _id: "1",
    name: "Elegant Bridal Lehenga",
    price: 2500,
    quantity: 3,
  },
  {
    _id: "2",
    name: "Men’s Premium Blazer",
    price: 1200,
    quantity: 5,
  },
];

export default function PlaceOrder() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const found = demoProducts.find((p) => p._id === id);
    if (!found) showError("Product not found");
    setProduct(found);
  }, [id]);

  if (!product) return null;

  const total = qty * product.price;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (qty < 1) return showError("Quantity cannot be less than 1");
    if (qty > product.quantity)
      return showError("Cannot order more than available stock");

    // showSuccess("Processing to payment");
   navigate(`/pay/${product._id}`);


    // await axiosSecure.post("/order", orderData)
  };

  return (
    <div className="min-h-screen bg-pink-50 py-12">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
          Complete Your Order
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-semibold">Email</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">Product</label>
            <input
              type="text"
              value={product.name}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">Price (per unit)</label>
            <input
              type="text"
              value={`৳${product.price}`}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <div>
            <label className="font-semibold">Order Quantity</label>
            <input
              type="number"
              min="1"
              max={product.quantity}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="input input-bordered w-full"
            />
            <p className="text-xs text-gray-500">
              Available: {product.quantity}
            </p>
          </div>

          <div>
            <label className="font-semibold">Total Price</label>
            <input
              type="text"
              value={`৳${total}`}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <button className="btn bg-pink-500 hover:bg-pink-400 text-white w-full py-2">
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
}
