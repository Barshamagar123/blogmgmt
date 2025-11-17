import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Input from "../components/Input";
import Button from "../components/Button";
import axios from "axios";

const AddPost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", content: "", published: false });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post("http://localhost:3000/api/posts", formData, config);
      setMessage(res.data.message);
      setFormData({ title: "", content: "", published: false });

      // Redirect to /dashboard after 1 second
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.error || "Error adding post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Add New Post</h1>
        {message && <p className={`mb-4 ${message.includes("Error") ? "text-red-600" : "text-green-600"}`}>{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
          <Input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
          <Input name="content" value={formData.content} onChange={handleChange} placeholder="Content" />
          <div className="flex items-center space-x-2">
            <input type="checkbox" name="published" checked={formData.published} onChange={handleChange} />
            <label>Published</label>
          </div>
          <Button type="submit" disabled={loading}>{loading ? "Adding..." : "Add Post"}</Button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default AddPost;
