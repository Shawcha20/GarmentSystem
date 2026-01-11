import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";


import { useAuth } from "../../hooks/useAuth";
import { showError, showSuccess } from "../../Utils/Notification";
import useAxiosSecure from "../../hooks/useAxiosSecure";


export default function Login() {
  const { signIn, googleLogin } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [error, setError] = useState({ email: "", password: "", general: "" });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const axiosSecure=useAxiosSecure();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({ email: "", password: "", general: "" });
    setLoading(true);

    const { email, password } = form;

    if (!email || !password) {
      setLoading(false);
      setError({
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : "",
      });
      return;
    }

    signIn(email, password)
      .then(() => {
        setLoading(false);
        showSuccess("Welcome back");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setLoading(false);
        console.error("Login error code:", err.code);
        console.error("Login error message:", err.message);
        
        // Handle Firebase error codes
        let errorMessage = "Login failed. Please try again.";
        
        if (err.code === "auth/user-not-found") {
          errorMessage = " No account found with this email. Please sign up first.";
        } else if (err.code === "auth/wrong-password") {
          errorMessage = " Incorrect password. Please try again.";
        } else if (err.code === "auth/invalid-email") {
          errorMessage = " Invalid email address.";
        } else if (err.code === "auth/invalid-credential") {
          errorMessage = " Invalid email or password. Please check and try again.";
        } else if (err.code === "auth/user-disabled") {
          errorMessage = " This account has been disabled.";
        } else if (err.code === "auth/too-many-requests") {
          errorMessage = " Too many failed login attempts. Please try again later.";
        }
        
        setError(prev => ({ ...prev, general: errorMessage }));
        showError(errorMessage);
      });
  };

  // -------------------- Google Login --------------------

const handleGoogle = async () => {
  try {
    setLoading(true);
    setError({ email: "", password: "", general: "" });
    
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
    setLoading(false);

    showSuccess("Signed in with Google");
    navigate(from, { replace: true });
  } catch (err) {
    setLoading(false);
    console.error("Google login error:", err);
    const errorMessage = err.code === "auth/popup-closed-by-user" 
      ? "Login cancelled. Please try again." 
      : "Google sign-in failed. Please try again.";
    
   showError(errorMessage);
    setError(prev => ({ ...prev, general: errorMessage }));
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 via-pink-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      {/* Soft Floral Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-pink-200 dark:border-gray-700 rounded-2xl p-8 shadow-xl relative z-10"
      >
        {/* Logo */}
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-pink-400 bg-clip-text text-transparent mb-2">
          GarmentsGear
        </h2>

        <p className="text-center text-gray-600 dark:text-gray-300 mb-8">
          Login to continue exploring outfits
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              disabled={loading}
              className="input input-bordered w-full bg-white/80 dark:bg-gray-700 dark:text-white border-pink-300 dark:border-gray-600 focus:ring-2 focus:ring-pink-400 disabled:opacity-50"
            />
            {error.email && <p className="text-red-500 text-sm mt-1">{error.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-600 dark:text-gray-300 mb-1">Password</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) =>
                  setForm({ ...form, password: e.target.value })
                }
                disabled={loading}
                className="input input-bordered w-full bg-white/80 dark:bg-gray-700 dark:text-white border-pink-300 dark:border-gray-600 focus:ring-2 focus:ring-pink-400 pr-10 disabled:opacity-50"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                disabled={loading}
                className="absolute right-3 top-3 text-gray-500 dark:text-gray-400 disabled:opacity-50"
              >
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {error.password && (
              <p className="text-red-500 text-sm mt-1">{error.password}</p>
            )}
          </div>

          {/* General Errors - More Prominent */}
          {error.general && (
            <div className="bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg p-3">
              <p className="text-red-700 dark:text-red-300 text-sm font-medium text-center">{error.general}</p>
            </div>
          )}

          {/* Login Button */}
          <button 
            disabled={loading}
            className="btn bg-gradient-to-r from-pink-500 to-pink-400 border-none text-white w-full hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-gray-400 dark:text-gray-600">OR</div>

        {/* Google Login */}
        <button
          type="button"
          onClick={handleGoogle}
          disabled={loading}
          className="btn btn-outline border-pink-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-pink-50 dark:hover:bg-gray-700 w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <FcGoogle size={22} /> Continue with Google
        </button>

        {/* Register Link */}
        <p className="text-center text-sm mt-6 text-gray-700 dark:text-gray-300">
          Don't have an account?{" "}
          <Link to="/register" className="text-pink-500 dark:text-pink-400 font-semibold underline">
            Sign up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
