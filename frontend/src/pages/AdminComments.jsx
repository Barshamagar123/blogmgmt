// src/pages/AdminComments.jsx
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/Button";
import axios from "axios";

const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch all comments
  const fetchComments = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/comments", config);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  // Approve a comment
  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/comments/approve/${id}`, {}, config);
      setMessage("Comment approved successfully");
      fetchComments();
    } catch (err) {
      console.error(err);
      setMessage("Error approving comment");
    }
  };

  // Reject a comment
  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:3000/api/comments/reject/${id}`, {}, config);
      setMessage("Comment rejected successfully");
      fetchComments();
    } catch (err) {
      console.error(err);
      setMessage("Error rejecting comment");
    }
  };

  // Delete a comment
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/comments/${id}`, config);
      setMessage("Comment deleted successfully");
      fetchComments();
    } catch (err) {
      console.error(err);
      setMessage("Error deleting comment");
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto mt-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Manage Comments</h1>
        {message && <p className="mb-4 text-green-600">{message}</p>}
        {loading ? (
          <p>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p>No comments found.</p>
        ) : (
          <table className="min-w-full bg-white rounded shadow overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Post</th>
                <th className="py-2 px-4 border-b">Author</th>
                <th className="py-2 px-4 border-b">Content</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((comment) => (
                <tr key={comment.id}>
                  <td className="py-2 px-4 border-b">{comment.id}</td>
                  <td className="py-2 px-4 border-b">{comment.post?.title}</td>
                  <td className="py-2 px-4 border-b">{comment.author?.name || comment.author?.email}</td>
                  <td className="py-2 px-4 border-b">{comment.content}</td>
                  <td className="py-2 px-4 border-b capitalize">{comment.status}</td>
                  <td className="py-2 px-4 border-b space-x-2">
                    {comment.status !== "approved" && (
                      <Button onClick={() => handleApprove(comment.id)}>Approve</Button>
                    )}
                    {comment.status !== "rejected" && (
                      <Button onClick={() => handleReject(comment.id)}>Reject</Button>
                    )}
                    <Button onClick={() => handleDelete(comment.id)} className="bg-red-500 hover:bg-red-600">Delete</Button>
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

export default AdminComments;
