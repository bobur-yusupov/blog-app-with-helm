import React, { useState, useEffect } from 'react';
import './App.css';
import { BlogPost, BlogPostCreate } from './types/BlogPost';
import { blogService } from './services/blogService';
import BlogList from './components/BlogList';
import BlogDetail from './components/BlogDetail';
import BlogForm from './components/BlogForm';

type View = 'list' | 'detail' | 'create' | 'edit';

function App() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [currentView, setCurrentView] = useState<View>('list');
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await blogService.getAllPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load posts. Make sure the API server is running on http://localhost:8000');
      console.error('Error loading posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = async (postData: BlogPostCreate) => {
    try {
      await blogService.createPost(postData);
      await loadPosts();
      setCurrentView('list');
      setError(null);
    } catch (err) {
      setError('Failed to create post');
      console.error('Error creating post:', err);
    }
  };

  const handleUpdatePost = async (postData: BlogPostCreate) => {
    if (!selectedPost) return;
    try {
      await blogService.updatePost(selectedPost.id, postData);
      await loadPosts();
      setCurrentView('list');
      setSelectedPost(null);
      setError(null);
    } catch (err) {
      setError('Failed to update post');
      console.error('Error updating post:', err);
    }
  };

  const handleDeletePost = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await blogService.deletePost(id);
        await loadPosts();
        setError(null);
      } catch (err) {
        setError('Failed to delete post');
        console.error('Error deleting post:', err);
      }
    }
  };

  const handleSelectPost = (post: BlogPost) => {
    setSelectedPost(post);
    setCurrentView('detail');
  };

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post);
    setCurrentView('edit');
  };

  const handleBack = () => {
    setCurrentView('list');
    setSelectedPost(null);
  };

  const handleCancel = () => {
    setCurrentView('list');
    setSelectedPost(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>📝 My Blog</h1>
        {currentView === 'list' && (
          <button onClick={() => setCurrentView('create')} className="btn-new-post">
            + New Post
          </button>
        )}
      </header>

      <main className="App-main">
        {error && <div className="error-message">{error}</div>}
        
        {loading ? (
          <div className="loading">Loading posts...</div>
        ) : (
          <>
            {currentView === 'list' && (
              <BlogList
                posts={posts}
                onSelectPost={handleSelectPost}
                onDeletePost={handleDeletePost}
              />
            )}

            {currentView === 'detail' && selectedPost && (
              <BlogDetail
                post={selectedPost}
                onEdit={handleEditPost}
                onBack={handleBack}
              />
            )}

            {currentView === 'create' && (
              <BlogForm onSubmit={handleCreatePost} onCancel={handleCancel} />
            )}

            {currentView === 'edit' && selectedPost && (
              <BlogForm
                post={selectedPost}
                onSubmit={handleUpdatePost}
                onCancel={handleCancel}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
