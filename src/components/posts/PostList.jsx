import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetAllApprovedPosts } from "../../managers/postManager";

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetAllApprovedPosts()
      .then((posts) => {
        setPosts(posts);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="post-list">
      <h2>Approved Posts</h2>
      {posts.length === 0 ? (
        <p>No Approved Posts Available</p>
      ) : (
        <ul className="list-group">
          {posts.map((post) => (
            <Link
              to={`/posts/${post.id}`}
              key={post.id}
              className="list-group-item"
            >
              <li>
                <h3>{post.title}</h3>
                <p>Category: {post.category}</p>
                <p>Author: {post.author}</p>
              </li>
            </Link>
          ))}
        </ul>
      )}
    </div>
  );
}
