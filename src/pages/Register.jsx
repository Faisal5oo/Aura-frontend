import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users`,
        {
          username,
          password,
        }
      );
      setSuccess("Registration successful!");
      navigate("/login");
      setError("");
      console.log(response.data);
    } catch (error) {
      setError("Registration failed. Please try again.");
      setSuccess("");
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen to-black-500 p-4">
      <div className="flex items-center justify-center w-full max-w-md p-6 bg-white bg-opacity-30 rounded-lg shadow-lg backdrop-blur-lg">
        <div className="w-full">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6">
            Register
          </h2>
          <p className="text-1xl sm:text-1xl text-center text-white mb-6">
            Register your new account
          </p>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block text-sm sm:text-base font-medium text-white"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm sm:text-base font-medium text-white"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-purple-600 rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
