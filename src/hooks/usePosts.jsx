import { useState, useEffect, useCallback, useMemo } from 'react';
import useDebounce from './useDebounce';

function usePosts({ searchTerm = '', tag = '', limit = 10, infinite = true } = {}) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);

  const debouncedSearch = useDebounce(searchTerm, 500);

  const buildApiUrl = useCallback((skip = 0) => {
    let baseUrl = 'https://dummyjson.com/posts';
    const params = [];

    if (debouncedSearch) {
      baseUrl = `${baseUrl}/search`;
      params.push(`q=${encodeURIComponent(debouncedSearch)}`);
    } else if (tag) {
      baseUrl = `${baseUrl}/tag/${encodeURIComponent(tag)}`;
    }

    params.push(`limit=${limit}`, `skip=${skip}`);
    return `${baseUrl}?${params.join('&')}`;
  }, [debouncedSearch, tag, limit]);

  const fetchPosts = useCallback(async () => {
    try {
      setLoading(true);
      const url = buildApiUrl(0);
      const res = await fetch(url);
      const data = await res.json();

      setPosts(data.posts || []);
      setHasMore((data.posts?.length || 0) === limit);
      setPage(0);
    } catch (err) {
      setError(err.message || 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }, [buildApiUrl, limit]);

  const loadMore = useCallback(async () => {
    try {
      const nextSkip = (page + 1) * limit;
      const url = buildApiUrl(nextSkip);
      const res = await fetch(url);
      const data = await res.json();

      setPosts(prev => [...prev, ...(data.posts || [])]);
      setPage(prev => prev + 1);
      setHasMore((data.posts?.length || 0) === limit);
    } catch (err) {
      setError(err.message);
    }
  }, [buildApiUrl, page, limit]);

  const fetchPostById = useCallback(async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`https://dummyjson.com/posts/${id}`);
      const data = await res.json();
      setSelectedPost(data);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement du post');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const uniqueTags = useMemo(() => {
    const allTags = posts.flatMap(post => post.tags || []);
    return [...new Set(allTags)];
  }, [posts]);

  return {
    posts,
    loading,
    error,
    loadMore,
    hasMore,
    selectedPost,
    fetchPostById,
    uniqueTags
  };
}

export default usePosts;
