import React from "react";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import LoaderIcon from "../components/LoaderIcon";
import { Link } from "react-router";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  //register

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const { signUp, isSignUP, login, isLoggingIn } = useAuthStore();

  const HandleSignUP = async (e) => {
    e.preventDefault();
    const response = await signUp(formData);
    setFormData({ fullName: "", email: "", password: "" });

    if (response) setIsLogin(true);
  };

  //login

  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const handelLogin = (e) => {
    e.preventDefault();
    const response = login(loginData);
    setLoginData({ email: "", password: "" });
    if (response) {
      return <Link to={"/chat"} />;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen font-sans">
      <div className="relative w-[47vw] max-w-[400px] h-[80vh] bg-transparent overflow-hidden rounded-xl shadow-[5px_20px_50px_rgba(0,0,0,0.8)] bg-cover bg-center">
        {/* Signup */}
        <div className="absolute inset-0 ">
          <form
            className="flex flex-col items-center h-full"
            onSubmit={HandleSignUP}
          >
            <label
              className={`text-gray-300 text-4xl font-bold mt-12 mb-8 cursor-pointer transition-all duration-500 cursor-pointer
                ${isLogin ? "scale-75" : " scale-100"}`}
              onClick={() => setIsLogin(isLogin ? false : true)}
            >
              Sign Up
            </label>

            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => {
                setFormData({ ...formData, fullName: e.target.value });
              }}
              placeholder="Enter Your Name"
              required
              className=" text-gray-800 w-[80%] bg-gray-300 rounded-md px-3 py-2 mb-4 outline-none font-medium font-serif"
            />

            <input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              placeholder="Enter Your Email"
              autoComplete="email"
              required
              className=" text-gray-800 w-[80%] bg-gray-300 rounded-md px-3 py-2 mb-4 outline-none font-medium font-serif"
            />

            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
              autoComplete="current-password"
              required
              className=" text-gray-800 w-[80%] bg-gray-300 rounded-md px-3 py-2 mb-4 outline-none font-medium font-serif"
            />

            <input
              type="text"
              placeholder="Confirm Password"
              className=" text-gray-800 w-[80%] bg-gray-300 rounded-md px-3 py-2 mb-4 outline-none font-medium font-serif"
            />

            <button
              type="submit"
              className="w-[70%] h-10 mt-6 justify-items-center rounded-md bg-[#573b8a] text-white font-bold hover:bg-[#6d44b8] transition cursor-pointer"
              disabled={isSignUP}
            >
              {isSignUP ? (
                <LoaderIcon className={" text-center w-full"} />
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        {/* Login */}

        <div
          className={`absolute bottom-0 w-full h-[65vh] bg-gray-100 rounded-[60%/10%] rounded-b-none transition-all duration-700 ease-in-out
            ${isLogin ? "border-0" : "bottom-[-50vh]"} `}
        >
          <form
            className={`flex flex-col items-center h-full
            `}
            onSubmit={handelLogin}
          >
            <label
              className={`font-bold cursor-pointer transition-all duration-500 mt-6 mb-8 ${
                isLogin ? "text-[#573b8a] scale-100" : "text-[#573b8a] scale-75"
              }`}
              style={{ fontSize: "2.3rem" }}
              onClick={() => setIsLogin(isLogin ? false : true)}
            >
              Login
            </label>

            <input
              type="email"
              placeholder="Enter Your Email"
              value={loginData.email}
              onChange={(e) => {
                setLoginData({ ...loginData, email: e.target.value });
              }}
              required
              autoComplete="email"
              className="w-[80%] text-gray-800 bg-gray-200 rounded-md px-3 py-2 mb-5 outline-none font-medium font-serif"
            />

            <input
              type="password"
              placeholder="Password"
              value={loginData.password}
              onChange={(e) => {
                setLoginData({ ...loginData, password: e.target.value });
              }}
              autoComplete="current-password"
              required
              className="w-[80%] text-gray-800 bg-gray-200 rounded-md px-3 py-2 mb-5 outline-none font-medium font-serif"
            />

            <button
              type="submit"
              className="w-[70%] h-10 mt-6 justify-items-center cursor-pointer rounded-md bg-[#573b8a] text-white font-bold hover:bg-[#6d44b8] transition"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <LoaderIcon className={" text-center w-full"} />
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
