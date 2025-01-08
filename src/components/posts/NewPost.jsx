import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../../managers/postManager";
import { GetAllCategories } from "../../managers/categoryManager";

export default function NewPost({ loggedInUser }) {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categoryId: "",
    headerImage: "",
    publicationDate: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch available categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryOptions = await GetAllCategories();
        setCategories(categoryOptions);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure the logged-in user is the author
    const postData = {
      ...formData,
      categoryId: parseInt(formData.categoryId, 10),
    };

    try {
      const createdPost = await createPost(postData);
      alert("Post created successfully!");
      navigate(`/posts/${createdPost.id}`);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create the post. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading categories...</p>;
  }

  return (
    <div className="new-post-form col-md-6 col-10 mx-auto mt-5 pt-1 text-start">
      <form onSubmit={handleSubmit}>
        <h2>Create New Post</h2>
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
            Save Post
          </button>
        </div>
      </form>
    </div>
  );
}
