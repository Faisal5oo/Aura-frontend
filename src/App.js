import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import RegisterPage from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import MyPost from './pages/MyPost';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<PostList />} />
        <Route path="/my-posts" element={<MyPost />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/create" element={<CreatePost />} /> 
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
