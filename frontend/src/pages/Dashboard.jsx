// src/pages/Dashboard.jsx
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Button from '../components/Button';
import { Link, useLocation } from 'react-router-dom';
import { FaFileAlt, FaComments, FaPlus, FaUsers } from 'react-icons/fa';
import axios from 'axios';

const Dashboard = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const [stats, setStats] = useState({
    users: 0,
    posts: 0,
    adminPosts: 0,
    comments: 0,
    latestPosts: [],
  });

  const sidebarItems = [
    { label: 'Add Post', path: '/admin/add-post', icon: <FaPlus /> },
    { label: 'Admin Posts', path: '/admin/posts', icon: <FaFileAlt /> },
    { label: 'Manage Comments', path: '/admin/comments', icon: <FaComments /> },
  ];

  const isActive = (path) => location.pathname === path;

  // Fetch dashboard stats
  const fetchStats = async () => {
    try {
      const [usersRes, postsRes, commentsRes] = await Promise.all([
        axios.get('http://localhost:3000/api/dashboard/users', config),
        axios.get('http://localhost:3000/api/dashboard/posts', config),
        axios.get('http://localhost:3000/api/dashboard/comments', config),
      ]);

      setStats({
        users: usersRes.data.count || 0,
        posts: postsRes.data.count || 0,
        adminPosts: postsRes.data.latestPosts?.length || 0,
        comments: commentsRes.data.count || 0,
        latestPosts: postsRes.data.latestPosts || [],
      });
    } catch (err) {
      console.error('Error fetching dashboard stats:', err);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-linear-to-b from-indigo-600 via-purple-600 to-pink-600 shadow-lg p-6 hidden lg:flex flex-col text-white">
          <h2 className="text-2xl font-bold mb-8 text-center tracking-wide uppercase">Admin Panel</h2>
          <nav className="flex flex-col gap-3">
            {sidebarItems.map((item) => (
              <Link key={item.path} to={item.path}>
                <Button
                  className={`flex items-center justify-start gap-2 w-full px-3 py-2 rounded-lg transition-all duration-300
                    ${isActive(item.path)
                      ? 'bg-white text-indigo-700 shadow-lg transform scale-105'
                      : 'bg-white/20 text-white hover:bg-white hover:text-indigo-700 hover:scale-105'}
                  `}
                >
                  {item.icon} <span className="font-medium">{item.label}</span>
                </Button>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-4xl font-extrabold mb-6 text-gray-800">Dashboard Overview</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-indigo-600 text-white rounded-lg p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4">
                <FaUsers className="text-4xl" />
                <div>
                  <h2 className="text-xl font-bold">Users</h2>
                  <p className="text-3xl mt-2">{stats.users}</p>
                </div>
              </div>
            </div>
            <div className="bg-blue-600 text-white rounded-lg p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4">
                <FaPlus className="text-4xl" />
                <div>
                  <h2 className="text-xl font-bold">Posts</h2>
                  <p className="text-3xl mt-2">{stats.posts}</p>
                </div>
              </div>
            </div>
            <div className="bg-green-600 text-white rounded-lg p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4">
                <FaFileAlt className="text-4xl" />
                <div>
                  <h2 className="text-xl font-bold">Admin Posts</h2>
                  <p className="text-3xl mt-2">{stats.adminPosts}</p>
                </div>
              </div>
            </div>
            <div className="bg-yellow-500 text-white rounded-lg p-6 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-4">
                <FaComments className="text-4xl" />
                <div>
                  <h2 className="text-xl font-bold">Comments</h2>
                  <p className="text-3xl mt-2">{stats.comments}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Latest Posts */}
          <div className="bg-white rounded-lg shadow-lg p-8 hover:shadow-2xl transition-shadow duration-300">
            <h2 className="text-2xl font-bold mb-4">Latest Posts</h2>
            {stats.latestPosts.length === 0 ? (
              <p>No posts found.</p>
            ) : (
              <ul className="space-y-2">
                {stats.latestPosts.map((post) => (
                  <li key={post.id} className="border-b py-2">
                    <span className="font-semibold">{post.title}</span> by {post.author?.name || post.author?.email}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Dashboard;
