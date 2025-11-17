// src/components/CommentsSection.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";

const CommentsSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch approved comments for this post
  const fetchComments = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/comments/post/${postId}`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  // Submit a new comment
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await axios.post(
        "http://localhost:3000/api/comments",
        { postId, content },
        config
      );
      setMessage("Comment submitted. Awaiting admin approval.");
      setContent("");
    } catch (err) {
      console.error(err);
      setMessage("Error submitting comment.");
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4">Comments</h3>

      {comments.length === 0 ? (
        <p className="mb-4 text-gray-500">No comments yet. Be the first to comment!</p>
      ) : (
        <ul className="space-y-4 mb-6">
          {comments.map((c) => (
            <li key={c.id} className="border-b pb-2">
              <p className="font-semibold">{c.author?.name || c.author?.email}</p>
              <p>{c.content}</p>
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your comment..."
          className="w-full border rounded p-2"
        />
        <Button type="submit">Submit Comment</Button>
      </form>

      {message && <p className="mt-2 text-green-600">{message}</p>}
    </div>
  );
};

export default CommentsSection;
