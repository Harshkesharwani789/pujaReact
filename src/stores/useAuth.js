import { create } from 'zustand';
import { loginUser, registerUser, loginAdmin } from '../services/api';

const useAuth = create((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await loginUser({ email, password });
      const { token, ...user } = response.data;
      localStorage.setItem('token', token);
      set({ user, loading: false });
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Login failed',
        loading: false
      });
      return false;
    }
  },

  register: async (name, email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await registerUser({ name, email, password });
      const { token, ...user } = response.data;
      localStorage.setItem('token', token);
      set({ user, loading: false });
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Registration failed',
        loading: false
      });
      return false;
    }
  },

  adminLogin: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const response = await loginAdmin({ email, password });
      const { token, ...user } = response.data;
      localStorage.setItem('token', token);
      set({ user, loading: false });
      return true;
    } catch (error) {
      set({
        error: error.response?.data?.message || 'Admin login failed',
        loading: false
      });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, error: null });
  },

  clearError: () => set({ error: null })
}));

export default useAuth;
