import { useEffect, useState } from "react";
import {
  createComment,
  getCommentByPostId,
} from "../../managers/commentManager";
import { useParams, useNavigate } from "react-router";
import { GetPostById, deletePost } from "../../managers/postManager";
import { Badge } from "reactstrap";

export default function PostDetails({ loggedInUser }) {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newCommentObj, setNewCommentObj] = useState({
    subject: "",
    content: "",
  });
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [error, setError] = useState(null);
  const userId = loggedInUser ? loggedInUser.id : null;

  console.log("loggedinuser", loggedInUser);

  if (!loggedInUser) {
    return <h1>Loading user data...</h1>;
  }

  useEffect(() => {
    getCommentByPostId(parseInt(postId)).then(setComments);
  }, [postId]);
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

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    createComment(parseInt(postId), newCommentObj, userId).then(() => {
      getCommentByPostId(parseInt(postId)).then(setComments);
      setNewCommentObj({ subject: "", content: "" });
      setShowCommentForm(false);
    });
  };

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
      {/* Post details */}
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
      </div>
    </div>
  );
}
