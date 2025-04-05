import axios from 'axios';

const API_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth Services
export const loginUser = (credentials) => api.post('/auth/login', credentials);
export const registerUser = (userData) => api.post('/auth/register', userData);
export const loginAdmin = (credentials) => api.post('/auth/admin/login', credentials);

// Product Services
export const getProducts = () => api.get('/products');
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (productData) => api.post('/products', productData);
export const updateProduct = (id, productData) => api.put(`/products/${id}`, productData);
export const deleteProduct = (id) => api.delete(`/products/${id}`);
export const addProductReview = (id, reviewData) => api.post(`/products/${id}/reviews`, reviewData);

// Category Services
export const getCategories = () => api.get('/categories');
export const getCategory = (id) => api.get(`/categories/${id}`);
export const getCategoryBySlug = (slug) => api.get(`/categories/slug/${slug}`);
export const createCategory = (categoryData) => api.post('/categories', categoryData);
export const updateCategory = (id, categoryData) => api.put(`/categories/${id}`, categoryData);
export const deleteCategory = (id) => api.delete(`/categories/${id}`);

// Order Services
export const getOrders = () => api.get('/orders');
export const getOrder = (id) => api.get(`/orders/${id}`);
export const updateOrder = (id, orderData) => api.put(`/orders/${id}`, orderData);
export const deleteOrder = (id) => api.delete(`/orders/${id}`);