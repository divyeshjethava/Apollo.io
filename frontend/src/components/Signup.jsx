"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col">
      {/* Header */}
      <header className="bg-gray-300 px-8 py-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8 object-cover rounded" />
          <span className="font-semibold text-gray-900 select-none">
            Globentix
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex gap-4 relative overflow-hidden p-8 mt-[-30px]">
        {/* Left Section - Signup Form */}
        <div className="flex-2 bg-white flex items-center justify-center px-8 py-12 rounded-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-md"
          >
            {/* Title */}
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              Create your Globentix account
            </h1>

            <p className="text-gray-700 mb-6">
              Start managing and closing your ideal buyers in one powerful
              platform.
            </p>

            {/* Form */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />

              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />

              <input
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-3 py-2 text-sm border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />

              <button className="w-full px-6 py-2 bg-black text-white text-sm font-semibold rounded hover:bg-gray-800 transition">
                Create Account
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </motion.div>
        </div>

        {/* Right Section - Image */}
        <div className="flex-1 relative bg-white overflow-hidden rounded-2xl flex items-center justify-center">
          <img
            src={logo}
            alt="Globentix Logo"
            className="max-w-[80%] max-h-[80%] object-contain"
          />
        </div>
      </main>
    </div>
  );
}
