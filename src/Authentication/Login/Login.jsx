import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";


import { useAuth } from "../../hooks/useAuth";
import { showSuccess } from "../../Utils/Notification";
import useAxiosSecure from "../../hooks/useAxiosSecure";


export default function Login() {
  const { signIn, googleLogin } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [error, setError] = useState({ email: "", password: "", general: "" });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosSecure=useAxiosSecure();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({ email: "", password: "", general: "" });

    const { email, password } = form;

    if (!email || !password) {
      setError({
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : "",
      });
      return;
    }

    signIn(email, password)
      .then(() => {
        showSuccess("Welcome back");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        if (err.message.includes("user-not-found")) {
          setError({ ...error, general: "No account found. Please register." });
        } else if (err.message.includes("wrong-password")) {
          setError({ ...error, general: "Incorrect password" });
        } else {
          setError({ ...error, general: err.message });
        }
      });
  };

  // -------------------- Google Login --------------------

const handleGoogle = async () => {
  try {
    const result = await googleLogin();
    const user = result.user;

    const userInfo = {
      name: user.displayName,
      email: user.email,
      image: user.photoURL,
      role: "buyer",
      status: "pending",
    };

    const res = await axiosSecure.post("/users", userInfo);
    console.log("Backend response:", res.data);

    showSuccess("Signed in with Google ✨");
    navigate(from, { replace: true });
  } catch (err) {
    console.error(err);
    toast.error("Google sign-in failed");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-pink-50 to-white px-4">
      {/* Soft Floral Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-md border border-pink-200 rounded-2xl p-8 shadow-xl relative z-10"
      >
        {/* Logo */}
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-pink-400 bg-clip-text text-transparent mb-2">
          GarmentsGear
        </h2>

        <p className="text-center text-gray-600 mb-8">
          Login to continue exploring outfits
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="input input-bordered w-full bg-white/80 border-pink-300 focus:ring-2 focus:ring-pink-400"
            />
            {error.email && <p className="text-red-500 text-sm">{error.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                className="input input-bordered w-full bg-white/80 border-pink-300 focus:ring-2 focus:ring-pink-400 pr-10"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-3 text-gray-500"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error.password && (
              <p className="text-red-500 text-sm">{error.password}</p>
            )}
          </div>

          {/* General Errors */}
          {error.general && (
            <p className="text-red-500 text-center">{error.general}</p>
          )}

          {/* Login Button */}
          <button className="btn bg-gradient-to-r from-pink-500 to-pink-400 border-none text-white w-full hover:opacity-90">
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-gray-400">OR</div>

        {/* Google Login */}
        <button
          onClick={handleGoogle}
          className="btn btn-outline border-pink-300 text-gray-700 hover:bg-pink-50 w-full flex items-center justify-center gap-2"
        >
          <FcGoogle size={22} /> Continue with Google
        </button>

        {/* Register Link */}
        <p className="text-center text-sm mt-6 text-gray-700">
          Don’t have an account?{" "}
          <Link to="/register" className="text-pink-500 font-semibold underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
