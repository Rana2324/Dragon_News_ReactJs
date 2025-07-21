import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import { APP_CONFIG } from '../constants';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const getCurrentDate = () => {
    const today = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return today.toLocaleDateString('en-US', options);
  };

  return (
    <header className="newspaper-header">
      {/* Breaking News Banner */}
      <div className="breaking-news text-center">
        <span className="inline-flex items-center">
          <svg className="w-4 h-4 mr-2 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          BREAKING: Stay Updated with Latest News • Live Coverage 24/7
        </span>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newspaper Masthead */}
        <div className="newspaper-masthead">
          <Link to="/" className="block">
            <h1 className="newspaper-title">
              🐉 {APP_CONFIG.APP_NAME}
            </h1>
            <p className="newspaper-tagline">
              Your Trusted Source for Global News
            </p>
            <p className="newspaper-date">
              {getCurrentDate()}
            </p>
          </Link>
        </div>

        {/* Navigation Bar */}
        <nav className="flex justify-between items-center py-4">
          {/* Main Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-accent font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-accent pb-1"
            >
              HOME
            </Link>
            <Link 
              to="/category/01" 
              className="text-gray-700 hover:text-accent font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-accent pb-1"
            >
              POLITICS
            </Link>
            <Link 
              to="/category/02" 
              className="text-gray-700 hover:text-accent font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-accent pb-1"
            >
              SPORTS
            </Link>
            <Link 
              to="/category/03" 
              className="text-gray-700 hover:text-accent font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-accent pb-1"
            >
              ENTERTAINMENT
            </Link>
            <Link 
              to="/category/04" 
              className="text-gray-700 hover:text-accent font-medium transition-colors duration-200 border-b-2 border-transparent hover:border-accent pb-1"
            >
              CULTURE
            </Link>
          </div>

          {/* Weather & Date Info */}
          <div className="hidden md:flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>25°C</span>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>

          {/* User Authentication Section */}
          <div className="flex items-center space-x-4">
            {currentUser ? (
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-full">
                  {currentUser.photoURL ? (
                    <img 
                      src={currentUser.photoURL} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full border-2 border-accent"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {(currentUser.displayName || currentUser.email).charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  <span className="text-gray-700 font-medium text-sm">
                    {currentUser.displayName || currentUser.email.split('@')[0]}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn-outline text-xs px-4 py-2"
                >
                  SIGN OUT
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-3">
                <Link to="/login" className="btn-secondary text-xs px-4 py-2">
                  SIGN IN
                </Link>
                <Link to="/register" className="btn-primary text-xs px-4 py-2">
                  SUBSCRIBE
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-gray-700 hover:text-accent transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4 bg-white">
            <div className="flex flex-col space-y-4">
              {/* Navigation Links */}
              <div className="space-y-2">
                <Link 
                  to="/" 
                  className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-accent font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  HOME
                </Link>
                <Link 
                  to="/category/01" 
                  className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-accent font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  POLITICS
                </Link>
                <Link 
                  to="/category/02" 
                  className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-accent font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  SPORTS
                </Link>
                <Link 
                  to="/category/03" 
                  className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-accent font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  ENTERTAINMENT
                </Link>
                <Link 
                  to="/category/04" 
                  className="block px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-accent font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  CULTURE
                </Link>
              </div>
              
              {/* User Section */}
              <div className="border-t border-gray-200 pt-4">
                {currentUser ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 px-4">
                      {currentUser.photoURL ? (
                        <img 
                          src={currentUser.photoURL} 
                          alt="Profile" 
                          className="w-10 h-10 rounded-full border-2 border-accent"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                          <span className="text-white font-bold">
                            {(currentUser.displayName || currentUser.email).charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}
                      <div>
                        <p className="text-gray-700 font-medium">
                          {currentUser.displayName || currentUser.email.split('@')[0]}
                        </p>
                        <p className="text-gray-500 text-sm">Subscriber</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-accent font-medium transition-colors duration-200"
                    >
                      SIGN OUT
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2 px-4">
                    <Link 
                      to="/login" 
                      className="block w-full text-center btn-secondary py-3"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      SIGN IN
                    </Link>
                    <Link 
                      to="/register" 
                      className="block w-full text-center btn-primary py-3"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      SUBSCRIBE
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
