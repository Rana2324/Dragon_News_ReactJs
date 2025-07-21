// API Configuration
export const API_BASE_URL = 'https://openapi.programming-hero.com/api/news';

// API Endpoints
export const API_ENDPOINTS = {
  CATEGORIES: `${API_BASE_URL}/categories`,
  NEWS_BY_CATEGORY: (categoryId) => `${API_BASE_URL}/category/${categoryId}`,
  NEWS_DETAILS: (newsId) => `${API_BASE_URL}/${newsId}`,
};

// App Configuration
export const APP_CONFIG = {
  APP_NAME: 'Dragon News',
  ITEMS_PER_PAGE: 10,
  DEFAULT_CATEGORY: '01',
};

// Firebase Configuration Keys
export const FIREBASE_CONFIG_KEYS = {
  API_KEY: 'AIzaSyBK8-your-api-key',
  AUTH_DOMAIN: 'your-project.firebaseapp.com',
  PROJECT_ID: 'your-project-id',
  STORAGE_BUCKET: 'your-project.appspot.com',
  MESSAGING_SENDER_ID: '123456789',
  APP_ID: 'your-app-id'
};

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  NEWS_DETAILS: '/news/:id',
  CATEGORY: '/category/:id',
};
