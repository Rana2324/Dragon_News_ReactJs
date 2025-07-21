import { useState, useEffect } from 'react';

/**
 * Custom hook for fetching data with loading and error states
 * @param {Function} fetchFunction - Function that returns a promise
 * @param {Array} dependencies - Dependencies array for useEffect
 * @returns {Object} { data, loading, error, refetch }
 */
export const useFetch = (fetchFunction, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err.message || 'An error occurred');
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  const refetch = () => {
    fetchData();
  };

  return { data, loading, error, refetch };
};

/**
 * Custom hook specifically for news categories
 * @returns {Object} { categories, loading, error, refetch }
 */
export const useCategories = () => {
  const { fetchCategories } = require('../api/newsApi');
  return useFetch(fetchCategories, []);
};

/**
 * Custom hook for news by category
 * @param {string} categoryId - Category ID
 * @returns {Object} { news, loading, error, refetch }
 */
export const useNewsByCategory = (categoryId) => {
  const { fetchNewsByCategory } = require('../api/newsApi');
  return useFetch(() => fetchNewsByCategory(categoryId), [categoryId]);
};
