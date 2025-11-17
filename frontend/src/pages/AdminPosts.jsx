import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import axios from "axios";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/posts", config);
      setPosts(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (id) => {
    // Here you could navigate to an edit page or open a modal
    navigate(`/admin/edit-post/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`http://localhost:3000/api/posts/${id}`, config);
      alert("Post deleted successfully!");
      navigate("/admin/posts"); // Redirect after delete
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Error deleting post");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-6">All Posts</h1>
        {loading ? (
          <p>Loading posts...</p>
        ) : (
          <table className="min-w-full bg-white rounded shadow overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Title</th>
                <th className="py-2 px-4 border-b">Author</th>
                <th className="py-2 px-4 border-b">Published</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="py-2 px-4 border-b">{post.id}</td>
                  <td className="py-2 px-4 border-b">{post.title}</td>
                  <td className="py-2 px-4 border-b">{post.author?.name}</td>
                  <td className="py-2 px-4 border-b">{post.published ? "Yes" : "No"}</td>
                  <td className="py-2 px-4 border-b space-x-2">
                    <Button onClick={() => handleEdit(post.id)}>Edit</Button>
                    <Button onClick={() => handleDelete(post.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AdminPosts;
