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
      <div className="relative bg-linear-to-r from-blue-600 via-indigo-700 to-purple-700 text-white py-20 px-6 text-center overflow-hidden rounded-b-3xl shadow-lg">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-500/30 rounded-full animate-pulse-slow"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-400/30 rounded-full animate-pulse-slow"></div>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          Welcome to <span className="text-yellow-300">BlogVerse</span>
        </h1>
        <p className="text-lg md:text-2xl max-w-3xl mx-auto drop-shadow-md">
          Explore amazing articles, share your thoughts, and manage your content with ease.
        </p>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto mt-12 px-4 flex justify-center">
        <div className="w-full md:w-2/3 flex shadow-2xl rounded-xl overflow-hidden bg-white/30 backdrop-blur-md border border-white/20">
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="grow px-4 py-3 text-gray-800 font-medium placeholder-gray-400 focus:outline-none"
          />
          <Button className="bg-linear-to-r from-purple-600 to-indigo-600 hover:from-indigo-600 hover:to-purple-600 text-white px-6 font-semibold transition-all shadow-lg hover:shadow-xl">
            Search
          </Button>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto mt-12 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {loading ? (
          <p className="text-center text-gray-500 col-span-full text-xl font-medium animate-pulse">
            Loading posts...
          </p>
        ) : filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full text-xl font-medium">
            No posts found.
          </p>
        ) : (
          filteredPosts.map(post => (
            <Card
              key={post.id}
              post={post}
              className="transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:-translate-y-1 rounded-xl border border-white/20 bg-white/20 backdrop-blur-md shadow-md"
            />
          ))
        )}
      </div>

      <Footer />
    </>
  );
};

export default Home;
