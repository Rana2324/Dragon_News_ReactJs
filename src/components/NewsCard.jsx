import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, truncateText } from '../utils/formatDate';

const NewsCard = ({ news, featured = false }) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [authorImageError, setAuthorImageError] = useState(false);

  if (!news) return null;

  const {
    _id,
    title,
    details,
    image_url,
    author,
    published_date,
    total_view,
    rating,
    category_id
  } = news;

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageLoading(false);
    setImageError(true);
  };

  const handleAuthorImageError = () => {
    setAuthorImageError(true);
  };

  const getCategoryName = (catId) => {
    const categories = {
      '01': 'POLITICS',
      '02': 'SPORTS', 
      '03': 'ENTERTAINMENT',
      '04': 'CULTURE',
      '05': 'INTERNATIONAL',
      '06': 'ARTS',
      '07': 'REGULAR',
      '08': 'OTHERS'
    };
    return categories[catId] || 'NEWS';
  };

  return (
    <article className={`news-card p-6 fade-in-up ${featured ? 'featured-card' : ''}`}>
      {/* Category Tag */}
      <div className="mb-4">
        <span className="category-tag">
          {getCategoryName(category_id)}
        </span>
      </div>

      {/* News Image */}
      {image_url && !imageError && (
        <div className="mb-6 relative overflow-hidden">
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center h-64">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          <Link to={`/news/${_id}`}>
            <img
              src={image_url}
              alt={title}
              className={`w-full h-64 object-cover transition-all duration-500 hover:scale-105 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </Link>
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
        </div>
      )}

      {/* Fallback for missing image */}
      {(!image_url || imageError) && (
        <div className="mb-6 h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
          <div className="text-center">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <p className="text-gray-500 text-sm font-medium">🐉 Dragon News</p>
          </div>
        </div>
      )}

      {/* News Content */}
      <div className="mb-6">
        <Link to={`/news/${_id}`}>
          <h2 className={featured ? 'headline-primary' : 'headline-secondary'}>
            {title}
          </h2>
        </Link>
        <p className="lead-text mb-4">
          {truncateText(details, featured ? 200 : 120)}
        </p>
      </div>

      {/* Article Meta */}
      <div className="article-meta">
        {/* Author Info */}
        <div className="article-meta-item">
          <div className="relative mr-3">
            {!authorImageError ? (
              <img
                src={author?.img}
                alt={author?.name || 'Author'}
                className="w-8 h-8 rounded-full object-cover border border-gray-200"
                onError={handleAuthorImageError}
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <span className="text-white text-xs font-bold">
                  {(author?.name || 'A').charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <div>
            <p className="byline">{author?.name || 'Staff Reporter'}</p>
            <p className="dateline">{formatDate(published_date)}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-gray-300"></div>

        {/* Rating */}
        <div className="article-meta-item">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(rating?.number || 0)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-xs font-medium ml-1">{rating?.number || 0}</span>
        </div>

        {/* Divider */}
        <div className="h-4 w-px bg-gray-300"></div>

        {/* Views */}
        <div className="article-meta-item">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          <span className="text-xs font-medium">{total_view || 0} reads</span>
        </div>
      </div>

      {/* Read More Section */}
      <div className="pt-4 border-t border-gray-100">
        <Link
          to={`/news/${_id}`}
          className="inline-flex items-center text-accent hover:text-red-700 font-semibold text-sm transition-colors duration-200 group"
        >
          <span className="border-b border-accent group-hover:border-red-700">READ FULL STORY</span>
          <svg className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
};

export default NewsCard;
