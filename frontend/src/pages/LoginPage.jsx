import React from 'react'
import { useState } from 'react';

const LoginPage = () => {
  
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen font-sans">
      <div
        className="relative w-[47vw] max-w-[400px] h-[80vh] bg-transparent overflow-hidden rounded-xl shadow-[5px_20px_50px_rgba(0,0,0,0.8)] bg-cover bg-center"
        
      >
        {/* Signup */}
        <div className="absolute inset-0 ">
          <form className="flex flex-col items-center h-full">
            <label
              className={`text-gray-300 text-4xl font-bold mt-12 mb-8 cursor-pointer transition-all duration-500 cursor-pointer
                ${ isLogin ? "scale-75"
                  : " scale-100"
                }`}
              onClick={() => setIsLogin(isLogin ? false: true)} 
            >
              Sign Up
            </label>

            <input
              type="text"
              placeholder="Enter Your Name"
              required= "true"
              className=" text-gray-800 w-[80%] bg-gray-300 rounded-md px-3 py-2 mb-4 outline-none font-medium font-serif"
            />

            <input
              type="email"
              placeholder="Enter Your Email"
              autoComplete='email'
              required= "true"
              className=" text-gray-800 w-[80%] bg-gray-300 rounded-md px-3 py-2 mb-4 outline-none font-medium font-serif"
            />

            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              required= "true"
              className=" text-gray-800 w-[80%] bg-gray-300 rounded-md px-3 py-2 mb-4 outline-none font-medium font-serif"
            />

            <input
              type="text"
              placeholder="Confirm Password"
              className=" text-gray-800 w-[80%] bg-gray-300 rounded-md px-3 py-2 mb-4 outline-none font-medium font-serif"
            />

            <button
              type="submit"
              className="w-[70%] h-10 mt-6 rounded-md bg-[#573b8a] text-white font-bold hover:bg-[#6d44b8] transition cursor-pointer"
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Login */}


        <div
          className={`absolute bottom-0 w-full h-[65vh] bg-gray-100 rounded-[60%/10%] rounded-b-none transition-all duration-700 ease-in-out
            ${
              isLogin ? "border-0" : "bottom-[-50vh]"
            } `}
        >
          <form className={`flex flex-col items-center h-full
            `}>
            <label
              className={`font-bold cursor-pointer transition-all duration-500 mt-6 mb-8 ${
                isLogin
                  ? "text-[#573b8a] scale-100"
                  : "text-[#573b8a] scale-75"
              }`}
              style={{ fontSize: "2.3rem" }}
              onClick={() => setIsLogin(isLogin ? false: true)}
            >
              Login
            </label>

            <input
              type="email"
              placeholder="Enter Your Email"
              required= "true"
              autoComplete="email"
              className="w-[80%] text-gray-800 bg-gray-200 rounded-md px-3 py-2 mb-5 outline-none font-medium font-serif"
            />

            <input
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              required= "true"
              className="w-[80%] text-gray-800 bg-gray-200 rounded-md px-3 py-2 mb-5 outline-none font-medium font-serif"
            />

            <button
              type="submit"
              className="w-[70%] h-10 mt-6 cursor-pointer rounded-md bg-[#573b8a] text-white font-bold hover:bg-[#6d44b8] transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage
