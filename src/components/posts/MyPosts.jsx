import { useEffect, useState } from "react";
import { GetAllPosts } from "../../managers/postManager";

export default function MyPosts({ loggedInUser }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (loggedInUser) {
      GetAllPosts()
        .then((allPosts) => {
          const userPosts = allPosts.filter(
            (post) => post.author === loggedInUser.fullName
          );
          setPosts(userPosts);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [loggedInUser]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="my-posts mx-auto text-center">
      <h1>My Posts</h1>
      {posts.length === 0 ? (
        <p>You do not have any posts yet!</p>
      ) : (
        <ul className="list-group">
          {posts.map((post) => (
            <li key={post.id} className="list-group-item">
              <h2>{post.title}</h2>
              <p>{post.category}</p>
              <p>{post.author}</p>
              <p>{new Date(post.publicationDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
