import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <nav className="bg-black bg-opacity-50 backdrop-blur-md p-4 fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-2xl font-extrabold text-white">Aura.</div>

        <div className="space-x-4">
          <Link
            to="/"
            className="text-white hover:text-gray-400 transition duration-300"
          >
            Feed
          </Link>
          <Link
            to="/create"
            className="text-white hover:text-gray-400 transition duration-300"
          >
            Create Post
          </Link>
          <Link
            to="/my-posts"
            className="text-white hover:text-gray-400 transition duration-300"
          >
            My Posts
          </Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="text-white hover:text-gray-400 transition duration-300 bg-transparent border-none cursor-pointer"
            >
              Logout
            </button>
          ) : (
            <>
              <button
                onClick={handleLogin}
                className="text-white hover:text-gray-400 transition duration-300 bg-transparent border-none cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={handleRegister}
                className="text-white hover:text-gray-400 transition duration-300 bg-transparent border-none cursor-pointer"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
