import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { showError, showSuccess } from "../Utils/Notification";
import useAxiosSecure from "../hooks/useAxiosSecure";

export default function PlaceOrder() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  // Extra form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axiosSecure.get(`/product/${id}`);
        setProduct(res.data);
        setQty(res.data.minOrder || 1);
      } catch (err) {
        showError("Failed to load product");
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return null;

  const total = qty * product.price;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Quantity validation
    if (qty < product.minOrder) {
      return showError(`Minimum order quantity is ${product.minOrder}`);
    }

    if (qty > product.quantity) {
      return showError("Order quantity exceeds available stock");
    }

    // Cash on Delivery
    try {
      const orderData = {
        email: user.email,
        firstName,
        lastName,
        phone,
        address,
        notes,
        productId: product._id,
        productName: product.name,
        quantity: qty,
        pricePerUnit: product.price,
        totalPrice: total,
        createdAt: new Date(),
      };

      //  ONLINE PAYMENT
      if (product.paymentOption === "PayFirst") {
        const res = await axiosSecure.post(
          "/create-checkout-session",
          orderData
        );

        window.location.href = res.data.url; 
        return;
      }

      // CASH ON DELIVERY
      orderData.payment = "Cash on Delivery";
      await axiosSecure.post("/order", orderData);

      showSuccess("Order placed successfully");
      navigate("/dashboard/my-orders");
    } catch (err) {
      console.error(err);
      showError("Failed to place order");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 py-12">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center">
          Complete Your Order
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label>Email</label>
            <input
              type="email"
              value={user?.email}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* Product */}
          <div>
            <label>Product</label>
            <input
              type="text"
              value={product.name}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* Price */}
          <div>
            <label>Price (per unit)</label>
            <input
              type="text"
              value={`৳${product.price}`}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          {/* First & Last Name */}
          <div className="grid grid-cols-2 gap-3">
            <input
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="input input-bordered w-full"
            />
            <input
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* Phone */}
          <div>
            <input
              placeholder="Contact Number"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input input-bordered w-full"
            />
          </div>

          {/* Address */}
          <div>
            <textarea
              placeholder="Delivery Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* Notes */}
          <div>
            <textarea
              placeholder="Additional Notes (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* Quantity */}
          <div>
            <label>Order Quantity</label>
            <input
              type="number"
              min={product.minOrder}
              max={product.quantity}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="input input-bordered w-full"
            />
            <p className="text-xs text-gray-500">
              Min: {product.minOrder}, Available: {product.quantity}
            </p>
          </div>

          {/* Total */}
          <div>
            <label>Total Price</label>
            <input
              type="text"
              value={`৳${total}`}
              readOnly
              className="input input-bordered w-full bg-gray-100"
            />
          </div>

          <button className="btn bg-pink-500 text-white w-full">
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
}
