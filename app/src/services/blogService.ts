import axios from 'axios';
import { BlogPost, BlogPostCreate } from '../types/BlogPost';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const blogService = {
  getAllPosts: async (): Promise<BlogPost[]> => {
    const response = await api.get('/posts/');
    return response.data.results || response.data;
  },

  getPost: async (id: number): Promise<BlogPost> => {
    const response = await api.get(`/posts/${id}/`);
    return response.data;
  },

  createPost: async (post: BlogPostCreate): Promise<BlogPost> => {
    const response = await api.post('/posts/', post);
    return response.data;
  },

  updatePost: async (id: number, post: BlogPostCreate): Promise<BlogPost> => {
    const response = await api.put(`/posts/${id}/`, post);
    return response.data;
  },

  deletePost: async (id: number): Promise<void> => {
    await api.delete(`/posts/${id}/`);
  },
};
