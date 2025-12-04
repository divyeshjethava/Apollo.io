"use client"

import { useState } from "react"
import logo from "../assets/logo.jpg";

export default function Login() {
  const [email, setEmail] = useState("")

  return (
    <div className="min-h-screen bg-gray-300 flex flex-col">
      {/* Header */}
      <header className="bg-gray-300 px-8 py-4 mb-0 ">
        <div className="flex items-center gap-2">
           <img src={logo} alt="Logo" className="w-8 h-8 object-cover rounded " />
          
          <span className="font-semibold text-gray-900 select-none whitespace-nowrap">
              Globentix
            </span>
        </div>
      </header>

      {/* Main Content */}
      <main className=" flex gap-4 relative overflow-hidden p-8 mt-[-30px]">
        {/* Left Section - Form */}
        <div className="flex-2 bg-white flex items-center justify-center px-8 py-12 rounded-2xl">
          <div className="w-full max-w-md">
            {/* Headline */}
            <h1 className="text-4xl font-lighter text-gray-900 mb-4 leading-tight">Sign up for Globentix — free forever</h1>

            {/* Description */}
            <p className="text-gray-700 mb-6">
              Find, contact, and close your ideal buyers with over 210 million contacts in one, easy-to-use AI sales
              platform.
            </p>

            {/* Legal Notice */}
            <div className="bg-blue-100 text-xs text-gray-700 p-3 rounded mb-6">
              By signing up, I agree to Globentix's{" "}
              <a href="#" className="text-blue-600 underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 underline">
                Privacy Policy
              </a>
              .
            </div>

            {/* Email Input and Button */}
            <div className="flex gap-2 mb-6">
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button className="px-6 py-2 bg-black text-white text-sm font-semibold rounded hover:bg-gray-800 transition">
                Sign up for free
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-xs text-gray-500">or</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* OAuth Text */}
            <p className="text-center text-xs text-gray-600 mb-3">
              Verify your business email with Google or Microsoft
            </p>

            {/* Google Button */}
            <button className="w-full py-2 px-3 border-2 border-gray-500 rounded font-semibold text-sm text-gray-900 mb-2 flex items-center justify-center gap-2 hover:bg-gray-50">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Sign up with Google
            </button>

            {/* Microsoft Button */}
            <button className="w-full py-2 px-3 border-2 border-gray-500 rounded font-semibold text-sm text-gray-900 flex items-center justify-center gap-2 hover:bg-gray-50">
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <rect x="2" y="2" width="8" height="8" fill="#F25022" />
                <rect x="14" y="2" width="8" height="8" fill="#7FBA00" />
                <rect x="2" y="14" width="8" height="8" fill="#00A4EF" />
                <rect x="14" y="14" width="8" height="8" fill="#FFB900" />
              </svg>
              Sign up with Microsoft
            </button>

            {/* Rating */}
            <div className="mt-8 text-center">
              <div className="text-lg mb-1">★★★★★</div>
              <p className="text-xs text-gray-600">4.7/5 based on 9,015 reviews | GDPR Compliant</p>
            </div>
          </div>
        </div>

        {/* <svg
          className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2"
          width="60"
          height="100%"
          viewBox="0 0 60 1000"
          preserveAspectRatio="none"
        >
          
        </svg> */}

        {/* Right Section - Image & Card */}
        <div className="flex-1 relative bg-gray-400 overflow-hidden rounded-2xl backdrop-blur-md">
          <img src={logo} alt="Globentix workspace" className=" bg-cover" />

          </div>
      </main>
    </div>
  )
}
