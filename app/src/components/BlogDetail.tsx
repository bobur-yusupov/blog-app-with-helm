import React from 'react';
import { BlogPost } from '../types/BlogPost';
import './BlogDetail.css';

interface BlogDetailProps {
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onBack: () => void;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post, onEdit, onBack }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="blog-detail">
      <button onClick={onBack} className="btn-back">
        ← Back to Posts
      </button>
      <article className="post-content">
        <h1>{post.title}</h1>
        <div className="post-meta">
          <span className="author">by {post.author}</span>
          <span className="date">Published on {formatDate(post.created_at)}</span>
          {post.updated_at !== post.created_at && (
            <span className="date">Updated on {formatDate(post.updated_at)}</span>
          )}
        </div>
        <div className="post-body">
          <p>{post.content}</p>
        </div>
        <div className="post-actions">
          <button onClick={() => onEdit(post)} className="btn-edit">
            Edit Post
          </button>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
