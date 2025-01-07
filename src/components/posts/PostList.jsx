import { useEffect, useState } from "react";
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

  console.log(posts);
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
            <li key={post.id} className="list-group-item">
              <h3>{post.title}</h3>
              <p>{post.category}</p>
              <p>{post.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
