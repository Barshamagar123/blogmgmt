// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import axios from 'axios';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch posts from backend
  const fetchPosts = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/posts');
      setPosts(res.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching posts:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Filter posts based on search input
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <div className="bg-linear-to-r from-blue-600 to-indigo-600 text-white py-16 px-4 text-center rounded-b-lg shadow-md">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to BlogMgmt
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto">
          Read amazing articles or manage your own content with ease.
        </p>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto mt-8 px-4 flex justify-center">
        <div className="w-full md:w-2/3 flex shadow-md rounded-lg overflow-hidden">
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="grow px-4 py-2"
          />
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6">
            Search
          </Button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <p className="text-center text-gray-500 col-span-full">Loading posts...</p>
        ) : filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No posts found.</p>
        ) : (
          filteredPosts.map(post => <Card key={post.id} post={post} />)
        )}
      </div>

      <Footer />
    </>
  );
};

export default Home;
