"use client";

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.jpg";

export default function Login() {
  const navigate = useNavigate();
  
  // 1. State for form data and UI status
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 2. Handle Login Submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent page reload
    setLoading(true);
    setError("");

    try {
      // Call the Backend Login Route
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // 3. Success: Store Token & Redirect
      // Store the JWT token to prove the user is logged in
      localStorage.setItem("token", data.token); 
      
      // Optional: Store user info if needed
      localStorage.setItem("user", JSON.stringify(data.user));

      alert("Login Successful!");
      navigate("/"); // Redirect to Dashboard

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-300 px-8 py-4"
      >
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8 rounded" />
          <span className="font-semibold text-gray-900">Globentix</span>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex gap-4 relative overflow-hidden p-8 mt-[-30px]">
        
        {/* Left Section - Login Form */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex-2 bg-white flex items-center justify-center px-8 py-12 rounded-2xl"
        >
          <div className="w-full max-w-md">
            <h1 className="text-4xl text-gray-900 mb-4 leading-tight">
              Welcome back
            </h1>

            <p className="text-gray-700 mb-6">
              Log in to continue managing your leads and closing deals.
            </p>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded mb-6">
                {error}
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              
              {/* Email Input */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-semibold text-gray-600 uppercase">Email</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-black transition"
                />
              </div>

              {/* Password Input */}
              <div className="flex flex-col gap-1">
                <div className="flex justify-between">
                  <label className="text-xs font-semibold text-gray-600 uppercase">Password</label>
                  <a href="#" className="text-xs text-blue-600 hover:underline">Forgot password?</a>
                </div>
                <input
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-sm border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-black transition"
                />
              </div>

              {/* Login Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full py-2 bg-black text-white text-sm font-semibold rounded hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Logging in..." : "Log In"}
              </motion.button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-xs text-gray-500">or</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Social Login Buttons (Visual Only) */}
            <div className="space-y-2">
              <button className="w-full py-2 px-3 border-2 border-gray-500 rounded font-semibold text-sm text-gray-900 flex items-center justify-center gap-3 hover:bg-gray-50 transition">
                {/* Google SVG */}
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                <span>Log in with Google</span>
              </button>
              
              <button className="w-full py-2 px-3 border-2 border-gray-500 rounded font-semibold text-sm text-gray-900 flex items-center justify-center gap-3 hover:bg-gray-50 transition">
                {/* Microsoft SVG */}
                <svg className="w-4 h-4" viewBox="0 0 24 24"><rect x="2" y="2" width="8" height="8" fill="#F25022"/><rect x="14" y="2" width="8" height="8" fill="#7FBA00"/><rect x="2" y="14" width="8" height="8" fill="#00A4EF"/><rect x="14" y="14" width="8" height="8" fill="#FFB900"/></svg>
                <span>Log in with Microsoft</span>
              </button>
            </div>

            {/* Footer Link */}
            <p className="text-center text-xs text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600 underline font-semibold">
                Sign up for free
              </Link>
            </p>

          </div>
        </motion.div>

        {/* Right Section - Logo Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex-1 bg-white rounded-2xl flex items-center justify-center"
        >
          <img
            src={logo}
            alt="Globentix Logo"
            className="max-w-[80%] max-h-[80%] object-contain"
          />
        </motion.div>
      </main>
    </div>
  );
}