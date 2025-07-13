import React, { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext'; // ✅ Exercice 3 - Importer useTheme

/**
 * Composant d'affichage détaillé d'un post
 * @param {Object} props - Propriétés du composant
 * @param {Object} props.post - Le post à afficher
 * @param {Function} props.onClose - Fonction pour fermer les détails
 * @param {Function} props.onTagClick - Fonction appelée lors du clic sur un tag
 */
function PostDetails({ post, onClose, onTagClick }) {
  const { theme } = useTheme(); // ✅ Exercice 3 - Utiliser le hook useTheme

  // ✅ Exercice 3 - Utiliser useMemo pour les classes CSS selon le thème
  const themeClasses = useMemo(() => {
    return {
      card: theme === 'dark' ? 'bg-dark text-light border-secondary' : '',
      badge: theme === 'dark' ? 'bg-secondary' : 'bg-light text-dark border',
      button: theme === 'dark' ? 'btn-outline-light' : 'btn-outline-dark'
    };
  }, [theme]);

  if (!post) return null;

  return (
    <div className={`card mb-4 ${themeClasses.card}`}>
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="card-title mb-0">{post.title}</h5>
        <button 
          className={`btn btn-sm ${themeClasses.button}`}
          onClick={onClose}
          aria-label="Fermer"
        >
          <i className="bi bi-x-lg"></i>
        </button>
      </div>
      
      <div className="card-body">
        {/* ✅ Afficher le contenu du post */}
        <p>{post.body}</p>

        {/* ✅ Réactions et utilisateur */}
        {post.reactions && (
              <p>
            👍 {post.reactions.likes} · 👎 {post.reactions.dislikes}
              </p>
            )}


        {/* ✅ Tags */}
        <div className="d-flex gap-2 flex-wrap mt-2">
          {post.tags.map(tag => (
            <span
              key={tag}
              className={`badge ${themeClasses.badge}`}
              onClick={() => onTagClick(tag)}
              style={{ cursor: 'pointer' }}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ✅ Optimisation des rendus
export default React.memo(PostDetails);
