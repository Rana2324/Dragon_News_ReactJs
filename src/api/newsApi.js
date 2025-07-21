import axios from 'axios';
import { API_ENDPOINTS } from '../constants';

// Create axios instance with base configuration
const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetch all news categories
 * @returns {Promise<Array>} Array of news categories
 */
export const fetchCategories = async () => {
  try {
    const response = await api.get(API_ENDPOINTS.CATEGORIES);
    return response.data.data.news_category || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
};

/**
 * Fetch news by category ID
 * @param {string} categoryId - Category ID to fetch news for
 * @returns {Promise<Array>} Array of news articles
 */
export const fetchNewsByCategory = async (categoryId = '01') => {
  try {
    const response = await api.get(API_ENDPOINTS.NEWS_BY_CATEGORY(categoryId));
    return response.data.data || [];
  } catch (error) {
    console.error('Error fetching news by category:', error);
    throw new Error('Failed to fetch news');
  }
};

/**
 * Fetch single news article by ID
 * @param {string} newsId - News article ID
 * @returns {Promise<Object>} News article object
 */
export const fetchNewsById = async (newsId) => {
  try {
    const response = await api.get(API_ENDPOINTS.NEWS_DETAILS(newsId));
    return response.data.data[0] || null;
  } catch (error) {
    console.error('Error fetching news details:', error);
    throw new Error('Failed to fetch news details');
  }
};

/**
 * Search news articles by keyword
 * @param {string} keyword - Search keyword
 * @returns {Promise<Array>} Array of matching news articles
 */
export const searchNews = async (keyword) => {
  try {
    // Since the API doesn't have a search endpoint, we'll fetch all news and filter
    const allNews = await fetchNewsByCategory('01'); // Default category
    return allNews.filter(article => 
      article.title.toLowerCase().includes(keyword.toLowerCase()) ||
      article.details.toLowerCase().includes(keyword.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching news:', error);
    throw new Error('Failed to search news');
  }
};
