import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CategoryList from '../components/CategoryList';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:col-span-1">
            <CategoryList />
          </div>
          
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Outlet />
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-secondary">
              © 2024 Dragon News. All rights reserved.
            </p>
            <p className="text-sm text-secondary mt-2">
              Stay informed with the latest news and updates.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
