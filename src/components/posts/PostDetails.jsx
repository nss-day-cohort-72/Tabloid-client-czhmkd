import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetPostById } from "../../managers/postManager";

export default function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    GetPostById(postId)
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [postId]);

  console.log("this is the post at id", post);

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="post-Details">
      <div className="col-12 border-bottom bg-secondary bg-gradient bg-opacity-25">
        <div className=" mx-auto d-flex justify-content-center col-5">
          <img
            src={post.headerImage}
            alt=""
            className="post-img mx-auto"
            style={{ height: "200px" }}
          />
        </div>
      </div>
      <h2 className="mx-auto text-center mt-4">{post.title}</h2>
      <strong className="text-danger d-flex justify-content-center">
        {post.category}
      </strong>

      <div className="d-flex justify-content-between col-6 mx-auto my-4">
        <small>{post.author}</small>
        <small>{post.publicationDate}</small>
      </div>
      <div className="col-6 mx-auto">
        <p>{post.content}</p>
      </div>
    </div>
  );
}
