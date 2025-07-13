import React, { useState, useCallback } from 'react';
import './App.css';
import PostList from './components/PostList';
import PostSearch from './components/PostSearch';
import usePosts from './hooks/usePosts'; 
import useLocalStorage from './hooks/useLocalStorage';
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import PostDetails from './components/PostDetails';
// TODO: Exercice 3 - Importer ThemeToggle
// TODO: Exercice 3 - Importer ThemeProvider et useTheme
// TODO: Exercice 1 - Importer le hook usePosts
// TODO: Exercice 2 - Importer le hook useLocalStorage

function App() {
  // État local pour la recherche
  const [searchTerm, setSearchTerm] = useState('');
  const [infiniteScroll, setInfiniteScroll] = useLocalStorage('infiniteScroll', true);
  // TODO: Exercice 4 - Ajouter l'état pour le tag sélectionné
  const [selectedTag, setSelectedTag] = useState('');

  // TODO: Exercice 1 - Utiliser le hook usePosts pour récupérer les posts
  // Exemple: const { posts, loading, error } = usePosts();
  const { posts, loading, error, hasMore, loadMore } = usePosts({ searchTerm, tag: selectedTag, infinite: infiniteScroll });
  
  // TODO: Exercice 2 - Utiliser useLocalStorage pour le mode de défilement

  const toggleScrollMode = () => setInfiniteScroll(prev => !prev);
  
  // TODO: Exercice 3 - Utiliser useCallback pour les gestionnaires d'événements
  
  // Gestionnaire pour la recherche
  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term);
  }, []);
  // TODO: Exercice 4 - Ajouter le gestionnaire pour la sélection de tag
  const handleTagClick = useCallback((tag) => {
    setSelectedTag(tag);
  }, []);
  const [selectedPost, setSelectedPost] = useState(null);
  const handlePostClick = useCallback((post) => {
    setSelectedPost(post);
  }, []);
  
  const handleCloseDetails = useCallback(() => {
    setSelectedPost(null);
  }, []);
  
  return (
    <ThemeProvider>
      <div className="container py-4">
        <header className="pb-3 mb-4 border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="display-5 fw-bold">Blog</h1>
            {/* TODO: Exercice 3 - Ajouter le ThemeToggle */}
            <ThemeToggle />
          </div>
        </header>
        
        <main>
        <button onClick={toggleScrollMode} className="btn btn-outline-primary mb-3">
          Mode : {infiniteScroll ? "Défilement Infini" : "Pagination"}
        </button>
          <PostSearch onSearch={handleSearchChange} />
          
          {/* TODO: Exercice 1 - Afficher un message d'erreur si nécessaire */}
          {error && <div className="alert alert-danger">{error}</div>}
          
          {/* TODO: Exercice 4 - Ajouter le composant PostDetails */}
          {selectedPost && (
            <PostDetails
              post={selectedPost}
              onClose={handleCloseDetails}
              onTagClick={handleTagClick}
            />
          )}
          
          {/* TODO: Exercice 1 - Passer les props nécessaires à PostList */}
          <PostList
              posts={posts}
              loading={loading}
              infiniteScroll={infiniteScroll}
              hasMore={hasMore}
              onLoadMore={loadMore}
              onTagClick={handleTagClick}
              onPostClick={handlePostClick}
            />
        </main>
        
        <footer className="pt-3 mt-4 text-center border-top">
          <p>
            TP React Hooks - Blog &middot; {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </ThemeProvider>
  );
}

export default App;
