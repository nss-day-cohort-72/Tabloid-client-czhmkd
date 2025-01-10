import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { GetPostById, deletePost } from "../../managers/postManager";
import { Badge } from "reactstrap";

export default function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  if (error) {
    return <p className="text-danger">Error: {error}</p>;
  }

  if (loading) {
    return <h1>Loading...</h1>;
  }

  const handleEditClick = () => {
    navigate(`/posts/${postId}/edit`);
  };

  const handleDeleteClick = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );
    if (confirmDelete) {
      try {
        await deletePost(postId);
        alert("Post deleted successfully.");
        navigate("/posts");
      } catch (err) {
        console.error("Error deleting post:", err);
        alert("Failed to delete the post. Please try again.");
      }
    }
  };

  const handleManageTagsClick = () => {
    navigate(`/posts/${postId}/tags`);
  };

  return (
    <div className="post-Details">
      <div className="col-12 border-bottom bg-secondary bg-gradient bg-opacity-25">
        <div className="mx-auto d-flex justify-content-center col-5">
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

      <div className="text-center my-4 d-flex justify-content-center gap-3">
        <button onClick={handleEditClick} className="btn btn-warning">
          Edit Post
        </button>
        <button onClick={handleDeleteClick} className="btn btn-danger">
          Delete Post
        </button>
        <button onClick={handleManageTagsClick} className="btn btn-primary">
          Manage Tags
        </button>
      </div>
      <div className="col-6 mx-auto">
        <h5>Tags:</h5>
        {post.tags && post.tags.length > 0 ? (
          <div className="d-flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag.id} color="info" pill>
                {tag.name}
              </Badge>
            ))}
          </div>
        ) : (
          <p>No tags associated with this post.</p>
        )}
      </div>
    </div>
  );
}
