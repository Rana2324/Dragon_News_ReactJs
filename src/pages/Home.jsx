import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { fetchNewsByCategory } from '../api/newsApi';
import { APP_CONFIG } from '../constants';
import NewsCard from '../components/NewsCard';
import Spinner from '../components/Spinner';

const Home = () => {
  const { categoryId } = useParams();
  const selectedCategory = categoryId || APP_CONFIG.DEFAULT_CATEGORY;
  
  const { data: news, loading, error, refetch } = useFetch(
    () => fetchNewsByCategory(selectedCategory),
    [selectedCategory]
  );

  const getCategoryName = (catId) => {
    const categories = {
      '01': 'Politics',
      '02': 'Sports', 
      '03': 'Entertainment',
      '04': 'Culture',
      '05': 'International',
      '06': 'Arts',
      '07': 'Regular',
      '08': 'Others'
    };
    return categories[catId] || 'Latest News';
  };

  if (loading) {
    return (
      <div className="main-content">
        <div className="flex justify-center items-center py-16">
          <div className="text-center">
            <Spinner size="xl" />
            <p className="mt-4 text-gray-600 font-medium">Loading latest news...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="main-content">
        <div className="text-center py-16">
          <div className="mb-6">
            <svg className="w-20 h-20 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="headline-secondary text-gray-700 mb-4">Unable to Load News</h3>
            <p className="body-text text-gray-600 mb-6 max-w-md mx-auto">{error}</p>
            <button 
              onClick={refetch}
              className="btn-primary"
            >
              TRY AGAIN
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!news || news.length === 0) {
    return (
      <div className="main-content">
        <div className="text-center py-16">
          <div className="mb-6">
            <svg className="w-20 h-20 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
            <h3 className="headline-secondary text-gray-700 mb-4">No News Available</h3>
            <p className="body-text text-gray-600">No news articles found for this category.</p>
          </div>
        </div>
      </div>
    );
  }

  // Separate featured and regular articles
  const featuredArticle = news[0]; // First article as featured
  const regularArticles = news.slice(1);

  return (
    <div className="main-content">
      {/* Page Header */}
      <div className="mb-8 pb-6 border-b-2 border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
              {getCategoryName(selectedCategory)}
            </h1>
            <p className="text-gray-600 font-medium">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">
              {news.length} {news.length === 1 ? 'Article' : 'Articles'}
            </p>
            <p className="text-xs text-gray-400">
              Updated {new Date().toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Featured Article Section */}
      {featuredArticle && (
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mr-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Featured Story
            </h2>
            <div className="flex-1 h-px bg-accent"></div>
          </div>
          
          <div className="featured-grid">
            <div className="featured-main">
              <NewsCard news={featuredArticle} featured={true} />
            </div>
            
            {/* Trending Sidebar */}
            <div className="featured-sidebar">
              <div className="bg-gray-50 p-6 border-l-4 border-accent">
                <h3 className="text-lg font-bold text-gray-900 mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Trending Now
                </h3>
                <div className="space-y-4">
                  {regularArticles.slice(0, 3).map((article, index) => (
                    <div key={article._id} className="flex items-start space-x-3 pb-4 border-b border-gray-200 last:border-b-0">
                      <span className="flex-shrink-0 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-900 leading-tight mb-1 hover:text-accent transition-colors duration-200">
                          <a href={`/news/${article._id}`}>
                            {article.title.length > 80 ? article.title.substring(0, 80) + '...' : article.title}
                          </a>
                        </h4>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">
                          {article.author?.name || 'Staff Reporter'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-accent to-red-700 text-white p-6 shadow-lg">
                <h3 className="text-lg font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Stay Informed
                </h3>
                <p className="text-sm mb-4 opacity-90">
                  Get the latest news delivered to your inbox every morning.
                </p>
                <div className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="Enter your email"
                    className="w-full px-3 py-2 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="w-full bg-white text-accent font-semibold py-2 text-sm hover:bg-gray-100 transition-colors duration-200">
                    SUBSCRIBE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Section Divider */}
      <div className="section-divider"></div>

      {/* Regular Articles Grid */}
      <section>
        <div className="flex items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mr-4" style={{ fontFamily: 'Playfair Display, serif' }}>
            Latest Stories
          </h2>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        
        {regularArticles.length > 0 ? (
          <div className="news-grid">
            {regularArticles.map((article) => (
              <NewsCard key={article._id} news={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="body-text text-gray-600">No additional stories available at this time.</p>
          </div>
        )}
      </section>

      {/* Load More Section */}
      {news.length >= APP_CONFIG.ITEMS_PER_PAGE && (
        <section className="mt-12 text-center">
          <div className="border-t border-gray-200 pt-8">
            <button className="btn-outline">
              LOAD MORE STORIES
            </button>
            <p className="text-xs text-gray-500 mt-2">
              Showing {news.length} of many articles
            </p>
          </div>
        </section>
      )}

      {/* Back to Top */}
      <div className="mt-16 text-center">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center text-gray-500 hover:text-accent transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
          <span className="text-sm font-medium">BACK TO TOP</span>
        </button>
      </div>
    </div>
  );
};

export default Home;
