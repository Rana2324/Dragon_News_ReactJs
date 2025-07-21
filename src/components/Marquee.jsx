import React, { useState, useEffect } from 'react';

const Marquee = ({ news = [], speed = 50 }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Default breaking news if no news provided
  const defaultNews = [
    "Welcome to Dragon News - Your trusted source for latest updates",
    "Breaking: Stay informed with real-time news from around the world",
    "Dragon News brings you comprehensive coverage of all major events",
    "Subscribe to our newsletter for daily news updates"
  ];

  const newsItems = news.length > 0 ? news : defaultNews;

  // Create marquee content with separators
  const marqueeContent = newsItems.map((item, index) => (
    <span key={index} className="marquee-item">
      {typeof item === 'string' ? item : item.title}
      {index < newsItems.length - 1 && (
        <span className="marquee-separator">•</span>
      )}
    </span>
  ));

  return (
    <div className="marquee-container">
      <div className="marquee-wrapper">
        {/* Breaking News Label */}
        <div className="marquee-label">
          <span className="marquee-label-text">
            🔥 BREAKING NEWS
          </span>
        </div>

        {/* Scrolling Content */}
        <div 
          className="marquee-content"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div 
            className={`marquee-scroll ${isHovered ? 'paused' : ''}`}
            style={{ '--marquee-speed': `${speed}s` }}
          >
            {marqueeContent}
            {/* Duplicate content for seamless loop */}
            {marqueeContent}
          </div>
        </div>

        {/* Controls */}
        <div className="marquee-controls">
          <button
            className="marquee-control-btn"
            onClick={() => setIsHovered(!isHovered)}
            title={isHovered ? 'Resume' : 'Pause'}
          >
            {isHovered ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

// Alternative simple marquee for smaller spaces
export const SimpleMarquee = ({ text, className = "" }) => {
  return (
    <div className={`simple-marquee ${className}`}>
      <div className="simple-marquee-content">
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
};

export default Marquee;
