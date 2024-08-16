import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const userId = localStorage.getItem("userId");
  const author = localStorage.getItem("username");
  const token = localStorage.getItem("authToken");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "content") {
      setContent(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/posts`,
        { userId, title, content, author },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Post created successfully!");
      setError("");
      setTitle("");
      setContent("");
    } catch (error) {
      setError("Failed to create post. Please try again.");
      setSuccess("");
      console.error(error);
    }
  };

  if (!userId) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="flex items-center justify-center w-full max-w-md p-6 bg-white bg-opacity-30 rounded-lg shadow-lg backdrop-blur-lg">
          <div className="w-full text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              You need to log in to create a post
            </h2>
            <p className="text-white mb-4">
              <Link to="/login" className="text-blue-500 hover:underline">
                Log in
              </Link>{" "}
              to create a post.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 mt-16">
      <div className="flex items-center justify-center w-full max-w-md p-6 bg-white bg-opacity-30 rounded-lg shadow-lg backdrop-blur-lg">
        <div className="w-full">
          <h2 className="text-3xl font-bold text-center text-white mb-6">
            Create a Post
          </h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && (
            <p className="text-green-500 text-center mb-4">{success}</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm sm:text-base font-medium text-white"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter the title"
                required
              />
            </div>
            <div>
              <label
                htmlFor="content"
                className="block text-sm sm:text-base font-medium text-white"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={content}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter the content"
                rows="6"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white bg-purple-600 rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
