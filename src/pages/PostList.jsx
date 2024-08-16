import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaThumbsUp, FaComment } from "react-icons/fa";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/posts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const sortedPosts = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setPosts(sortedPosts);
      } catch (error) {
        setError("Failed to fetch posts.");
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center mt-16">
      <div className="w-full max-w-4xl p-4">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          All Posts
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {posts?.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded-lg shadow-lg mb-4 backdrop-blur-sm bg-opacity-30"
          >
            <h2 className="text-2xl font-bold text-white">{post?.title}</h2>
            <p className="text-white mt-2">{post?.content}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-white text-sm">
                Posted by: {post?.author}
              </span>
              <span className="text-white text-sm">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-end mt-4 space-x-4">
              <button className="bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <FaThumbsUp className="text-xl" />
              </button>
              <button className="bg-green-500 text-white p-2 rounded-full shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                <FaComment className="text-xl" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
