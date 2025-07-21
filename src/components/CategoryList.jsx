import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { fetchCategories } from '../api/newsApi';
import Spinner from './Spinner';

const CategoryList = () => {
  const { data: categories, loading, error } = useFetch(fetchCategories, []);
  const { categoryId } = useParams();

  if (loading) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 text-primary">Categories</h3>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 text-primary">Categories</h3>
        <p className="text-red-500">Error loading categories: {error}</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h3 className="text-lg font-semibold mb-4 text-primary">All Categories</h3>
      <div className="space-y-2">
        {categories?.map((category) => (
          <Link
            key={category.category_id}
            to={`/category/${category.category_id}`}
            className={`block px-4 py-3 rounded-lg transition-colors duration-200 ${
              categoryId === category.category_id
                ? 'bg-accent text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-primary'
            }`}
          >
            <div className="font-medium">{category.category_name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
