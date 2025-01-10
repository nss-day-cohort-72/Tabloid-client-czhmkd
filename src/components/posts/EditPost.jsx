import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { GetPostById, editPost } from "../../managers/postManager";
import { GetAllCategories } from "../../managers/categoryManager";

export default function EditPost({ loggedInUser }) {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categoryId: "",
    headerImage: "",
    publicationDate: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch existing post data and categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        const post = await GetPostById(postId);
        const categoryOptions = await GetAllCategories();

        // Helper function to format the date to "yyyy-MM-dd"
        const formatDateForInput = (dateString) => {
          const date = new Date(dateString);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          return `${year}-${month}-${day}`;
        };

        // In useEffect after fetching the post data
        setFormData({
          title: post.title,
          content: post.content,
          categoryId: post.categoryId,
          headerImage: post.headerImage || "",
          publicationDate: post.publicationDate
            ? formatDateForInput(post.publicationDate)
            : "",
        });

        setCategories(categoryOptions);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching post or categories:", err);
        setError("Failed to load post data.");
        setLoading(false);
      }
    };

    fetchData();
  }, [postId]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedPost = {
      ...formData,
      categoryId: parseInt(formData.categoryId, 10),
      publicationDate: formData.publicationDate
        ? new Date(formData.publicationDate).toISOString()
        : null,
    };

    try {
      await editPost(postId, updatedPost);
      alert("Post updated successfully!");
      navigate(`/posts/${postId}`);
    } catch (err) {
      console.error("Error updating post:", err);
      alert("Failed to update the post.");
    }
  };

  if (loading) {
    return <p>Loading post data...</p>;
  }

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div className="edit-post-form col-md-6 col-10 mx-auto mt-5 pt-1 text-start">
      <h2>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            className="form-control"
            rows="5"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoryId" className="form-label">
            Category
          </label>
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="headerImage" className="form-label">
            Header Image URL (optional)
          </label>
          <input
            type="text"
            id="headerImage"
            name="headerImage"
            value={formData.headerImage}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="publicationDate" className="form-label">
            Publication Date (optional)
          </label>
          <input
            type="date"
            id="publicationDate"
            name="publicationDate"
            value={formData.publicationDate}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="text-end">
          <button type="submit" className="btn btn-success">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
