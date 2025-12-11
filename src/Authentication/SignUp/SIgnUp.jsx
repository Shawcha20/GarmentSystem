import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { showError, showSuccess } from "../../Utils/Notification";


// import axiosSecure from "../hooks/useAxiosSecure";  

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const { UserRegister, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const role = form.role.value;  
    const password = form.password.value;
    const status = "pending"; // default

    // ------------------ VALIDATION ------------------
    if (password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (!/[A-Z]/.test(password))
      return setError("Password must include an uppercase letter.");
    if (!/[a-z]/.test(password))
      return setError("Password must include a lowercase letter.");

    try {
      // Firebase register
      await UserRegister(email, password);
      await updateUserProfile(name, photoURL);

      // --------------------------------------------------
      //
      //
      //
      // await axiosSecure.post("/users", {
      //   name,
      //   email,
      //   photoURL,
      //   role,
      //   status,
      // });
      // --------------------------------------------------

      showSuccess("Account created successfully 💖");
      navigate("/login");
    } catch (err) {
      setError(err.message);
      showError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-pink-50 to-white px-4 relative">
      {/* Soft pattern background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-md border border-pink-200 rounded-2xl p-8 shadow-xl relative z-10"
      >
        {/* Title */}
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-pink-400 bg-clip-text text-transparent mb-3">
          Join GarmentsGear
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Create your account to start exploring beautiful outfits.
        </p>

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="input input-bordered w-full bg-white/90 border-pink-300 focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="input input-bordered w-full bg-white/90 border-pink-300 focus:ring-2 focus:ring-pink-400"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Photo URL</label>
            <input
              type="text"
              name="photoURL"
              placeholder="https://your-photo.com"
              className="input input-bordered w-full bg-white/90 border-pink-300 focus:ring-2 focus:ring-pink-400"
            />
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Role</label>
            <select
              name="role"
              className="select select-bordered w-full bg-white/90 border-pink-300 focus:ring-2 focus:ring-pink-400"
              required
            >
              <option value="buyer">Buyer</option>
              <option value="manager">Manager</option>
            </select>
          </div>

          {/* Status (read-only default) */}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Status</label>
            <input
              type="text"
              value="pending"
              disabled
              className="input input-bordered w-full bg-gray-100 border-pink-300 text-gray-500"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              className="input input-bordered w-full bg-white/90 border-pink-300 focus:ring-2 focus:ring-pink-400 pr-10"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-600 text-sm"
            >
              {error}
            </motion.p>
          )}

          {/* Register Button */}
          <button
            type="submit"
            className="btn bg-gradient-to-r from-pink-500 to-pink-400 border-none text-white w-full hover:opacity-90 mt-3"
          >
            Register
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm mt-6 text-gray-700">
          Already have an account?{" "}
          <Link to="/login" className="text-pink-500 underline font-semibold">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
