import { useState, useEffect } from "react";
import { getAllPosts } from "../api/post";
import handleError from "../utils/handleError";
import { useAuth } from ".";
import { PostContext } from ".";

export default function PostsProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { accessToken } = useAuth();

  useEffect(() => {
    const controller = new AbortController();
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await getAllPosts(page, limit, accessToken, {
          signal: controller.signal,
        });
        // fetch data if current page was not exited
        if (!controller.signal.aborted) {
          setPosts((prev) =>
            page === 1 ? res.data.posts : [...prev, ...res.data.posts]
          );
        }
      } catch (error) {
        //catch error not coming from the abort controller
        if (!controller.signal.aborted && error.name !== "AbortError");
        handleError(error);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchPosts();
    return () => {
      controller.abort();
      setLoading(true);
    };
  }, [accessToken, page, limit]);

  return (
    <PostContext.Provider value={{ posts, setPosts, loading, error }}>
      {children}
    </PostContext.Provider>
  );
}
