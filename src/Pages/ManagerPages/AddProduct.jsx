import React, { useState } from "react";
import { motion } from "framer-motion";
import { showSuccess, showError } from "../../Utils/Notification";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useAuth } from "../../hooks/useAuth";

export default function AddProduct() {
  const {user,status}=useAuth();
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);
  const axiosSecure=useAxiosSecure()
  console.log(user);
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreview(previews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(status=="suspended"){
      return showError("You are suspended by admin contact admin for details")
    }
    const form=e.target;
    const productData = {
      name:form.p_name.value,
      description:form.p_description.value,
      category:form.p_category.value,
      price: form.p_price.value,
      quantity: form.p_quantity.value,
      minOrder: form.p_min.value,
      paymentOption:form.p_payment.value,
      showOnHome:form.show_on_home.value,
      images:form.p_image.value,
      created_by:user.email
    };
    console.log(productData)
    await axiosSecure.post("/products", productData);
    showSuccess("Product added successfully!");
    e.target.reset();
    setPreview([]);
  };

  return (
    <div className="flex-1 min-h-screen bg-pink-50 p-8">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-3xl font-bold text-pink-600 mb-6">
          Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="font-semibold">Product Name</label>
            <input
              type="text"
              required
              className="input input-bordered w-full"
              placeholder="Elegant Bridal Lehenga"
              name="p_name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="font-semibold">Description</label>
            <textarea
              required
              className="textarea textarea-bordered w-full"
              placeholder="Detailed product description..."
              name="p_description"
            />
          </div>

          {/* Category */}
          <div>
            <label className="font-semibold">Category</label>
            <select className="select select-bordered w-full" required name="p_category">
              <option value="">Select Category</option>
              <option>Shirt</option>
              <option>Pant</option>
              <option>Jacket</option>
              <option>Accessories</option>
            </select>
          </div>

          {/* Price & Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-semibold">Price</label>
              <input
                type="number"
                required
                className="input input-bordered w-full"
                name="p_price"
              />
            </div>

            <div>
              <label className="font-semibold">Available Quantity</label>
              <input
                type="number"
                required
                className="input input-bordered w-full"
                name="p_quantity"
              />
            </div>
          </div>

          {/* MOQ */}
          <div>
            <label className="font-semibold">Minimum Order Quantity</label>
            <input
              type="number"
              required
              className="input input-bordered w-full"
              name="p_min"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="font-semibold">Upload Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              className="file-input file-input-bordered w-full"
              onChange={handleImageChange}
              name="p_image"
            />
          </div>

          {/* Image Preview */}
          {preview.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {preview.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt="preview"
                  className="h-24 w-full object-cover rounded-lg shadow"
                />
              ))}
            </div>
          )}

          {/* Demo Video */}
          <div>
            <label className="font-semibold">Demo Video Link (Optional)</label>
            <input
              type="url"
              className="input input-bordered w-full"
              placeholder="https://youtube.com/..."
              name="p_video"
            />
          </div>

          {/* Payment Option */}
          <div>
            <label className="font-semibold">Payment Option</label>
            <select className="select select-bordered w-full" required name="p_payment">
              <option>Cash on Delivery</option>
              <option>PayFirst</option>
            </select>
          </div>

          {/* Show on Home */}
          <div className="flex items-center gap-2">
            <input type="checkbox" className="checkbox checkbox-primary" name="show_on_home"/>
            <span className="font-medium">Show on Home Page</span>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="btn bg-pink-600 hover:bg-pink-500 text-white w-full text-lg"
          >
            Create Product
          </button>
        </form>
      </motion.div>
    </div>
  );
}
