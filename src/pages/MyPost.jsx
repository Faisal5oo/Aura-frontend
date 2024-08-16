import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEllipsisV, FaEye, FaEdit, FaTrash } from "react-icons/fa";

const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [deletingPostId, setDeletingPostId] = useState(null);
  const userId = localStorage.getItem("userId");
  const author = localStorage.getItem("username");

  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!userId) {
          setError("User not logged in");
          setLoading(false);
          return;
        }
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/posts/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );

        setPosts(response.data);
      } catch (err) {
        setError("Failed to fetch posts");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  const handleMenuToggle = (postId) => {
    setShowMenu(showMenu === postId ? null : postId);
  };

  const handleView = (postId) => {
    navigate(`/post/${postId}`);
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
  };

  const handleDelete = async (postId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/posts`,
        {
          data: { id: postId },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.data) {
        setPosts(posts.filter((post) => post._id !== postId));
        setDeletingPostId(null);
      }
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/posts`,
        {
          id: editingPost._id,
          userId,
          title,
          content,
          author,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.data) {
        setPosts(
          posts.map((post) =>
            post._id === editingPost._id ? { ...post, title, content } : post
          )
        );
        setEditingPost(null);
      }
    } catch (err) {
      console.error("Failed to update post", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="flex items-center justify-center w-full max-w-md p-6 bg-white bg-opacity-30 rounded-lg shadow-lg backdrop-blur-lg">
          <div className="w-full text-center">
            <h2 className="text-3xl font-bold text-white mb-6">
              You need to log in to see all of your posts
            </h2>
            <p className="text-white mb-4">
              <Link to="/login" className="text-blue-500 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  flex items-center justify-center mt-16">
      <div className="w-full max-w-4xl p-6 bg-white bg-opacity-30 rounded-lg shadow-lg backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          My Posts
        </h2>
        {posts.length === 0 ? (
          <p className="text-center text-white">No posts found</p>
        ) : (
          <ul className="space-y-4">
            {posts?.map((post) => (
              <li
                key={post._id}
                className="relative p-4 bg-white bg-opacity-80 rounded-lg shadow-md"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {post.title}
                  </h3>
                  <button
                    onClick={() => handleMenuToggle(post._id)}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <FaEllipsisV />
                  </button>
                </div>
                {showMenu === post._id && (
                  <div
                    ref={menuRef}
                    className="absolute top-2 right-2 bg-white shadow-lg w-40 z-20"
                  >
                    <button
                      onClick={() => handleView(post._id)}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
                    >
                      <FaEye className="mr-2" /> View
                    </button>
                    <button
                      onClick={() => handleEdit(post)}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left"
                    >
                      <FaEdit className="mr-2" /> Edit
                    </button>
                    <button
                      onClick={() => setDeletingPostId(post._id)}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 w-full text-left text-red-500"
                    >
                      <FaTrash className="mr-2" /> Delete
                    </button>
                  </div>
                )}
                <p className="text-gray-600">{post.content}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {editingPost && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Title
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Content
              </label>
              <textarea
                className="w-full p-2 border border-gray-300 rounded-lg"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows="5"
              ></textarea>
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setEditingPost(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {deletingPostId && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-red-600">
              Delete Post
            </h2>
            <p className="mb-4">Are you sure you want to delete this post?</p>
            <div className="flex justify-end">
              <button
                onClick={() => setDeletingPostId(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deletingPostId)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyPost;
