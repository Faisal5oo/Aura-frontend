import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/posts/post/${postId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        setPost(response.data);
      } catch (err) {
        setError("Failed to fetch post");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [postId]);

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-black-500 flex items-center justify-center mt-10">
        <div className="w-full max-w-4xl p-6 bg-white bg-opacity-30 rounded-lg shadow-lg backdrop-blur-lg">
          <p className="text-center text-white-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 to-black-500 flex items-center justify-center mt-10">
        <div className="w-full max-w-4xl p-6 bg-white bg-opacity-30 rounded-lg shadow-lg backdrop-blur-lg">
          <p className="text-center text-white-500">Post not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-black-500 flex items-center justify-center mt-20">
      <div className="w-full max-w-4xl p-8 bg-white bg-opacity-80 rounded-lg shadow-lg backdrop-blur-lg">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">
          {post.title}
        </h2>
        <p className="text-lg text-gray-700 mb-6">{post.content}</p>
        <p className="text-sm text-gray-500 text-right">
          Posted on {new Date(post.createdAt).toLocaleDateString()} by You.
        </p>
      </div>
    </div>
  );
};

export default PostDetail;
