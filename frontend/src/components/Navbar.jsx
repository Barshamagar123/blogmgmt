// src/components/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Only show links accessible to regular users
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/login', label: 'Login' },
    { path: '/register', label: 'Register' },
  ];

  const isActivePath = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 shadow-2xl sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="bg-white rounded-lg p-2 shadow-lg transform group-hover:scale-110 transition-transform duration-200">
              <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-600 to-pink-600 text-2xl font-bold">
                BM
              </span>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              Blog<span className="text-yellow-300">Verse</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  relative px-4 py-2 rounded-lg font-medium transition-all duration-300
                  ${isActivePath(item.path)
                    ? 'text-white bg-black bg-opacity-20 shadow-inner'
                    : 'text-gray-100 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }
                `}
              >
                {item.label}
                {isActivePath(item.path) && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full"></span>
                )}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white hover:bg-white hover:bg-opacity-10 transition-colors"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-current transition duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`block h-0.5 w-6 bg-current transform transition duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`
          md:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="py-4 space-y-2 border-t border-white border-opacity-20">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`
                  block px-4 py-3 rounded-lg font-medium transition-all duration-300
                  ${isActivePath(item.path)
                    ? 'text-white bg-black bg-opacity-30 shadow-inner border-l-4 border-yellow-400'
                    : 'text-gray-100 hover:text-white hover:bg-white hover:bg-opacity-10'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Animated gradient border bottom */}
      <div className="h-1 bg-linear-to-r from-yellow-400 via-pink-500 to-indigo-500 animate-pulse"></div>
    </nav>
  );
};

export default Navbar;
