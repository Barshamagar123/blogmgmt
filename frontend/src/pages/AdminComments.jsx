import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import axios from "axios";

const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  const fetchComments = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/comments", config);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-6">All Comments</h1>
        <div className="bg-white rounded shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Content</th>
                <th className="py-2 px-4 border-b">Post</th>
                <th className="py-2 px-4 border-b">Author</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((c) => (
                <tr key={c.id}>
                  <td className="py-2 px-4 border-b">{c.id}</td>
                  <td className="py-2 px-4 border-b">{c.content}</td>
                  <td className="py-2 px-4 border-b">{c.post?.title}</td>
                  <td className="py-2 px-4 border-b">{c.author?.name}</td>
                  <td className="py-2 px-4 border-b">{c.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AdminComments;
