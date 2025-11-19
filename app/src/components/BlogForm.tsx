import React, { useState, useEffect } from 'react';
import { BlogPost, BlogPostCreate } from '../types/BlogPost';
import './BlogForm.css';

interface BlogFormProps {
  post?: BlogPost | null;
  onSubmit: (post: BlogPostCreate) => void;
  onCancel: () => void;
}

const BlogForm: React.FC<BlogFormProps> = ({ post, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState<BlogPostCreate>({
    title: '',
    content: '',
    author: '',
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        author: post.author,
      });
    }
  }, [post]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="blog-form">
      <h2>{post ? 'Edit Post' : 'Create New Post'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter post title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            placeholder="Enter author name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            placeholder="Write your blog post content here..."
            rows={10}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-submit">
            {post ? 'Update Post' : 'Create Post'}
          </button>
          <button type="button" onClick={onCancel} className="btn-cancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
