import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import Marquee from './Marquee';
import toast from 'react-hot-toast';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const logoutPromise = async () => {
      await logout();
      navigate('/');
    };

    toast.promise(
      logoutPromise(),
      {
        loading: 'Signing out...',
        success: 'Logged out successfully! See you next time!',
        error: (err) => err.message || 'Failed to log out. Please try again.',
      }
    ).catch((error) => {
      console.error('Logout error:', error);
    });
  };

  const breakingNews = [
    "Dragon News launches with comprehensive coverage of global events",
    "Breaking: Latest updates from around the world now available",
    "Stay informed with real-time news and expert analysis",
    "Your trusted source for accurate and timely news reporting"
  ];

  return (
    <header className="masthead">
      {/* Breaking News Marquee */}
      <Marquee news={breakingNews} speed={40} />
      
      {/* Main Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Bar */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200">
            {/* Date & Weather */}
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="font-medium">
                  {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.003 4.003 0 003 15z" />
                </svg>
                <span>25°C</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                </svg>
                <span>02:30 AM</span>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              {currentUser ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">
                        {currentUser.displayName?.charAt(0) || currentUser.email?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-gray-700">
                      {currentUser.displayName || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-sm text-gray-600 hover:text-accent transition-colors duration-200 font-medium"
                  >
                    SIGN OUT
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="text-sm text-gray-600 hover:text-accent transition-colors duration-200 font-medium"
                  >
                    SIGN IN
                  </Link>
                  <Link
                    to="/register"
                    className="btn-primary text-xs px-4 py-2"
                  >
                    SUBSCRIBE
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Main Masthead */}
          <div className="text-center py-8">
            <Link to="/">
              <h1 className="masthead-title mb-2">
                🐉 Dragon News
              </h1>
              <p className="text-sm text-gray-600 font-medium tracking-wider uppercase">
                Your Trusted Source for Global News
              </p>
              <div className="mt-2 flex items-center justify-center space-x-4 text-xs text-gray-500">
                <span>EST. 2024</span>
                <span>•</span>
                <span>WORLDWIDE COVERAGE</span>
                <span>•</span>
                <span>24/7 UPDATES</span>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="border-t border-gray-200">
            <div className="flex items-center justify-between">
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8 py-4">
                <Link to="/" className="nav-link">
                  HOME
                </Link>
                <Link to="/category/01" className="nav-link">
                  POLITICS
                </Link>
                <Link to="/category/02" className="nav-link">
                  SPORTS
                </Link>
                <Link to="/category/03" className="nav-link">
                  ENTERTAINMENT
                </Link>
                <Link to="/category/04" className="nav-link">
                  CULTURE
                </Link>
                <Link to="/category/05" className="nav-link">
                  INTERNATIONAL
                </Link>
              </div>

              {/* Search & Social */}
              <div className="hidden md:flex items-center space-x-4 py-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    placeholder="Search news..."
                    className="px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:border-accent transition-colors duration-200 w-48"
                  />
                  <button className="p-2 text-gray-600 hover:text-accent transition-colors duration-200">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2 text-gray-600 hover:text-accent transition-colors duration-200"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden border-t border-gray-200 py-4 space-y-2">
                <Link to="/" className="block px-4 py-2 text-gray-700 hover:text-accent hover:bg-gray-50 transition-colors duration-200">
                  HOME
                </Link>
                <Link to="/category/01" className="block px-4 py-2 text-gray-700 hover:text-accent hover:bg-gray-50 transition-colors duration-200">
                  POLITICS
                </Link>
                <Link to="/category/02" className="block px-4 py-2 text-gray-700 hover:text-accent hover:bg-gray-50 transition-colors duration-200">
                  SPORTS
                </Link>
                <Link to="/category/03" className="block px-4 py-2 text-gray-700 hover:text-accent hover:bg-gray-50 transition-colors duration-200">
                  ENTERTAINMENT
                </Link>
                <Link to="/category/04" className="block px-4 py-2 text-gray-700 hover:text-accent hover:bg-gray-50 transition-colors duration-200">
                  CULTURE
                </Link>
                <Link to="/category/05" className="block px-4 py-2 text-gray-700 hover:text-accent hover:bg-gray-50 transition-colors duration-200">
                  INTERNATIONAL
                </Link>
                
                {/* Mobile Search */}
                <div className="px-4 py-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      placeholder="Search news..."
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 focus:outline-none focus:border-accent transition-colors duration-200"
                    />
                    <button className="p-2 text-gray-600 hover:text-accent transition-colors duration-200">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
