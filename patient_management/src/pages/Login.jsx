import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if(email === "doctor@gmail.com" && password === "1234"){
      localStorage.setItem("isLoggedIn", true);
      navigate("/dashboard");
    } else {
      alert("Invalid Login");
    }
  };

  return (

    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-teal-500 text-white flex-col justify-center items-center p-12">

        <h1 className="text-4xl font-bold mb-4">
          🏥 Anaemia AI System
        </h1>

        <p className="text-lg text-blue-100 text-center max-w-md">
          Intelligent anaemia detection using multimodal AI
          with RBC images, eye conjunctiva and blood parameters.
        </p>

        <div className="mt-10 text-sm text-blue-200">
          AI Healthcare Diagnostic Platform
        </div>

      </div>


      {/* LOGIN PANEL */}
      <div className="flex flex-1 items-center justify-center bg-gray-100">

        <div className="bg-white shadow-2xl rounded-2xl p-10 w-[420px]">

          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Doctor Login
          </h2>

          <p className="text-gray-500 text-center mb-6">
            Access the anaemia prediction dashboard
          </p>

          <form onSubmit={handleLogin} className="space-y-5">

            <input
              type="email"
              placeholder="Enter Email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Enter Password"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-teal-500 text-white p-3 rounded-lg font-semibold hover:bg-teal-600 transition"
            >
              Login
            </button>

          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            © 2026 Anaemia AI System
          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;