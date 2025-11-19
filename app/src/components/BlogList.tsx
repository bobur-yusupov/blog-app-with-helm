import React from 'react';
import { BlogPost } from '../types/BlogPost';
import './BlogList.css';

interface BlogListProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
  onDeletePost: (id: number) => void;
}

const BlogList: React.FC<BlogListProps> = ({ posts, onSelectPost, onDeletePost }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="blog-list">
      <h2>Blog Posts</h2>
      {posts.length === 0 ? (
        <p className="no-posts">No blog posts yet. Create your first post!</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <h3 onClick={() => onSelectPost(post)}>{post.title}</h3>
              <p className="post-author">by {post.author}</p>
              <p className="post-excerpt">
                {post.content.length > 150
                  ? `${post.content.substring(0, 150)}...`
                  : post.content}
              </p>
              <div className="post-footer">
                <span className="post-date">{formatDate(post.created_at)}</span>
                <div className="post-actions">
                  <button onClick={() => onSelectPost(post)} className="btn-view">
                    View
                  </button>
                  <button onClick={() => onDeletePost(post.id)} className="btn-delete">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogList;
