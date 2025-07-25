import React, { useEffect} from 'react';
// TODO: Exercice 3 - Importer useTheme
// TODO: Exercice 4 - Importer useIntersectionObserver
import LoadingSpinner from './LoadingSpinner';
import useIntersectionObserver from '../hooks/useIntersectionObserver';


/**
 * Composant d'affichage de la liste des posts
 * @param {Object} props - Propriétés du composant
 * @param {Array} props.posts - Liste des posts à afficher
 * @param {boolean} props.loading - Indicateur de chargement
 * @param {boolean} props.hasMore - Indique s'il y a plus de posts à charger
 * @param {Function} props.onLoadMore - Fonction pour charger plus de posts
 * @param {Function} props.onPostClick - Fonction appelée au clic sur un post
 * @param {Function} props.onTagClick - Fonction appelée au clic sur un tag
 * @param {boolean} props.infiniteScroll - Mode de défilement infini activé ou non
 */
function PostList({
  posts = [],
  loading = false,
  hasMore = false,
  onLoadMore,
  onPostClick,
  onTagClick,
  infiniteScroll = true
}) {
  // TODO: Exercice 3 - Utiliser le hook useTheme
  
  // TODO: Exercice 4 - Utiliser useIntersectionObserver pour le défilement infini
  const [triggerRef, isVisible] = useIntersectionObserver({
    enabled: infiniteScroll && hasMore,
  });
  
  // TODO: Exercice 3 - Utiliser useCallback pour les gestionnaires d'événements
  const handlePostClick = (post) => {
    if (onPostClick) {
      onPostClick(post);
    }
  };
  
  const handleTagClick = (e, tag) => {
    e.stopPropagation(); // Éviter de déclencher le clic sur le post
    if (onTagClick) {
      onTagClick(tag);
    }
  };
  
  // TODO: Exercice 1 - Gérer le cas où il n'y a pas de posts
  useEffect(() => {
    if (isVisible && onLoadMore) {
      onLoadMore();
    }
  }, [isVisible, onLoadMore]);
  
  return (
    <div className="post-list">
      {/* TODO: Exercice 1 - Afficher la liste des posts */}
      {posts.length === 0 && !loading && (
      <p>Aucun post trouvé.</p>
    )}

    {posts.map(post => (
      <div key={post.id} className="card mb-3" onClick={() => handlePostClick(post)}>
        <div className="card-body">
          <h5 className="card-title">{post.title}</h5>
          <p className="card-text">{post.body}</p>
          <div className="d-flex gap-2 flex-wrap">
            {post.tags.map(tag => (
              <span
                key={tag}
                className="badge bg-secondary"
                onClick={(e) => handleTagClick(e, tag)}
                style={{ cursor: 'pointer' }}
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    ))}
  
      {/* Afficher le spinner de chargement */}
      {loading && <LoadingSpinner />}
      
      {/* TODO: Exercice 4 - Ajouter la référence pour le défilement infini */}
      {infiniteScroll && hasMore && (
        <div ref={triggerRef} style={{ height: 1 }} />
      )}

      {!infiniteScroll && hasMore && (
        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={onLoadMore}>
            Charger plus
          </button>
        </div>
      )}
            
      
      {/* TODO: Exercice 1 - Ajouter le bouton "Charger plus" pour le mode non-infini */}
    </div>
  );
}

// TODO: Exercice 3 - Utiliser React.memo pour optimiser les rendus
export default PostList;