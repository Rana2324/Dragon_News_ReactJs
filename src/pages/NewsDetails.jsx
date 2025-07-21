import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { fetchNewsById } from '../api/newsApi';
import { formatDate } from '../utils/formatDate';
import Spinner from '../components/Spinner';

const NewsDetails = () => {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [authorImageError, setAuthorImageError] = useState(false);
  
  const { data: news, loading, error } = useFetch(
    () => fetchNewsById(newsId),
    [newsId]
  );

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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-primary mb-2">Error Loading News</h3>
          <p className="text-secondary mb-4">{error}</p>
          <button 
            onClick={() => navigate(-1)}
            className="btn-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <h3 className="text-lg font-medium text-primary mb-2">News Not Found</h3>
          <p className="text-secondary mb-4">The news article you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate(-1)}
            className="btn-primary"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const {
    title,
    details,
    image_url,
    author,
    published_date,
    total_view,
    rating,
    category_id
  } = news;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-accent hover:text-red-600 transition-all duration-200 transform hover:scale-105"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to News
        </button>
      </div>

      {/* Article Content */}
      <article className="card shadow-xl">
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-6 leading-tight">
            {title}
          </h1>
          
          {/* Author and Meta Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 pb-6 border-b border-gray-200">
            <div className="flex items-center mb-4 sm:mb-0">
              <div className="relative mr-4">
                {!authorImageError ? (
                  <img
                    src={author?.img}
                    alt={author?.name || 'Author'}
                    className="w-16 h-16 rounded-full object-cover border-4 border-gray-100 shadow-lg"
                    onError={handleAuthorImageError}
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-red-600 flex items-center justify-center shadow-lg border-4 border-gray-100">
                    <span className="text-white font-bold text-xl">
                      {(author?.name || 'A').charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <p className="font-bold text-primary text-lg">{author?.name || 'Unknown Author'}</p>
                <p className="text-secondary">{formatDate(published_date)}</p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="flex items-center space-x-6">
              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 transition-colors duration-200 ${
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
                <span className="text-lg font-bold text-secondary">{rating?.number || 0}</span>
              </div>

              {/* Views */}
              <div className="flex items-center space-x-2 text-secondary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span className="text-lg font-bold">{total_view || 0} views</span>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        {image_url && !imageError && (
          <div className="mb-10 relative overflow-hidden rounded-2xl shadow-2xl">
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-2xl flex items-center justify-center">
                <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            <img
              src={image_url}
              alt={title}
              className={`w-full h-80 sm:h-96 lg:h-[500px] object-cover rounded-2xl transition-all duration-500 ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-2xl"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <p className="text-sm font-medium text-gray-800">Featured Image</p>
              </div>
            </div>
          </div>
        )}

        {/* Fallback for missing image */}
        {(!image_url || imageError) && (
          <div className="mb-10 h-80 sm:h-96 lg:h-[500px] bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-2xl flex items-center justify-center shadow-2xl">
            <div className="text-center">
              <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-600 mb-2">🐉 Dragon News</h3>
              <p className="text-gray-500 font-medium">Professional News Coverage</p>
            </div>
          </div>
        )}

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-10">
          <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
            {details}
          </div>
        </div>

        {/* Article Footer */}
        <footer className="mt-10 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <p className="text-secondary font-medium">
                Published on {formatDate(published_date)}
              </p>
              {author?.published_date && (
                <p className="text-secondary">
                  Author joined: {formatDate(author.published_date)}
                </p>
              )}
            </div>
            
            {category_id && (
              <Link
                to={`/category/${category_id}`}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent to-red-600 text-white font-medium rounded-xl hover:from-red-600 hover:to-accent transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                View More in This Category
              </Link>
            )}
          </div>
        </footer>
      </article>
    </div>
  );
};

export default NewsDetails;
