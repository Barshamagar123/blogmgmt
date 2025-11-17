// src/components/Card.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({ post }) => {
  return (
    <Link to={`/posts/${post.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-4 cursor-pointer">
        <h2 className="text-xl font-bold mb-2">{post.title}</h2>
        <p className="text-gray-600 line-clamp-3">{post.content}</p>
        <p className="mt-2 text-sm text-gray-400">
          By {post.author?.name || 'Anonymous'}
        </p>
      </div>
    </Link>
  );
};

export default Card;
