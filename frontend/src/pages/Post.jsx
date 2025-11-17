import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Input from '../components/Input';
import Button from '../components/Button';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchPost = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/posts/${id}`);
      setPost(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.error || 'Error fetching post');
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/comments/post/${id}`, config);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:3000/api/comments`,
        { postId: id, content: newComment },
        config
      );
      setNewComment('');
      fetchComments();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center text-gray-500 mt-20 text-lg">Loading post...</p>;
  if (error) return <p className="text-red-500 text-center mt-20">{error}</p>;
  if (!post) return <p className="text-center text-gray-500 mt-20">Post not found.</p>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-12 px-4 md:px-0">
        {/* Post Card */}
        <div className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl shadow-xl p-8 md:p-12 mb-10 transition-transform hover:scale-105 duration-300">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">{post.title}</h1>
          <p className="text-lg md:text-xl leading-relaxed drop-shadow-sm">{post.content}</p>
          <p className="mt-6 text-sm md:text-base text-white/80">
            Author: <span className="font-semibold">{post.author?.name || 'Anonymous'}</span>
          </p>
        </div>

        {/* Comments Section */}
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Comments</h2>
          {comments.length === 0 ? (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          ) : (
            <ul className="space-y-4">
              {comments.map(c => (
                <li
                  key={c.id}
                  className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition-shadow duration-300"
                >
                  <p className="text-gray-700 font-medium">{c.author?.name || 'Anonymous'}</p>
                  <p className="text-gray-600 mt-1">{c.content}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Comment Form */}
        {user.role && (
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-16">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Add a Comment</h3>
            <form onSubmit={handleCommentSubmit} className="flex flex-col gap-4">
              <Input
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your comment..."
                className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
              />
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-6 rounded-lg transition-all duration-300"
              >
                Submit Comment
              </Button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Post;
