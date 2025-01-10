import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetPostById } from "../../managers/postManager";
import {
  createComment,
  getCommentByPostId,
} from "../../managers/commentManager";
import { useParams, useNavigate } from "react-router";
import { GetPostById, deletePost } from "../../managers/postManager";

export default function PostDetails({ loggedInUser }) {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [newCommentObj, setNewCommentObj] = useState({
    subject: "",
    content: "",
  });
  const [showCommentForm, setShowCommentForm] = useState(false); // State to toggle form visibility
  const [error, setError] = useState(null);
  const userId = loggedInUser.id;

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
      setShowCommentForm(false); // Hide the form after submitting
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

      {/* Add Comment Button */}
      <div className="col-6 mx-auto mt-5">
        <button
          className="btn btn-primary"
          onClick={() => setShowCommentForm(!showCommentForm)}
        >
          {showCommentForm ? "Cancel" : "Add a Comment"}
        </button>

        {/* Comment form (conditionally rendered) */}
        {showCommentForm && (
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="1"
                placeholder="Subject"
                value={newCommentObj.subject}
                onChange={(e) => {
                  const commentCopy = { ...newCommentObj };
                  commentCopy.subject = e.target.value;
                  setNewCommentObj(commentCopy);
                }}
              ></textarea>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Write a comment..."
                value={newCommentObj.content}
                onChange={(e) => {
                  const commentCopy = { ...newCommentObj };
                  commentCopy.content = e.target.value;
                  setNewCommentObj(commentCopy);
                }}
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit Comment
            </button>
          </form>
        )}
      </div>

      {/* Comment section */}
      <div className="col-6 mx-auto mt-5">
        <h4>Comments</h4>
        {comments.length === 0 ? (
          <p>No comments yet. Be the first to comment!</p>
        ) : (
          <ul className="list-unstyled">
            {comments.map((comment) => (
              <li
                key={comment.id}
                className="border-bottom py-2 d-flex align-items-start"
              >
                {/* User Image */}
                <img
                  src={
                    comment.userProfile.imageLocation || "default-avatar.png"
                  }
                  alt={comment.userProfile.fullName}
                  className="rounded-circle me-3"
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
                {/* User Name and Comment Content */}
                <div>
                  <strong>{comment.userProfile.fullName}</strong>
                  <p className="mb-1">{comment.content}</p>
                  <small className="text-muted">
                    {new Date(comment.createdAt).toLocaleString()}
                  </small>
                </div>
              </li>
            ))}
          </ul>
        )}
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
