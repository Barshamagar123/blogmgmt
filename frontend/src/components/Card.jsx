// src/components/Card.jsx
import { Link } from 'react-router-dom';

const Card = ({ post }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 duration-300 p-6 flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-bold mb-2 text-gray-800">{post.title}</h2>
        <p className="text-gray-600 mb-4">
          {post.content.length > 120
            ? post.content.substring(0, 120) + '...'
            : post.content}
        </p>
      </div>
      <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
        <span>By: {post.author?.name || 'Unknown'}</span>
        <Link
          to={`/posts/${post.id}`}
          className="text-blue-600 hover:underline font-semibold"
        >
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Card;
