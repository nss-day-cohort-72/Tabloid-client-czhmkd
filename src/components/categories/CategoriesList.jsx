import { useEffect, useState } from "react";
import {
  deleteCategory,
  GetAllCategories,
  createCategory,
} from "../../managers/categoryManager";
import { useNavigate } from "react-router-dom";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    GetAllCategories()
      .then((categories) => {
        setCategories(categories);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    deleteCategory(id).then(() => {
      GetAllCategories().then(setCategories);
    });
  };

  const handleEditNav = (id) => {
    navigate(`${id}/edit-category`);
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    createCategory(newCategory).then((res) => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        setNewCategory({ name: "" });
        GetAllCategories().then(setCategories);
      }
    });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="category-list d-flex flex-column justify-content-center align-items-center col-12 mx-auto mt-5">
      <h2>Categories</h2>
      {categories.length === 0 ? (
        <p>No Categories Available</p>
      ) : (
        <ul className="list-group col-6 mb-4">
          {categories.map((category) => (
            <li
              key={category.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <h3 className="col-6">{category.name}</h3>
              <div className="button container col-6 d-flex justify-content-end">
                <button
                  className="me-3 btn btn-success"
                  onClick={() => handleEditNav(category.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(category.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Add Category Form Below the List */}
      <form onSubmit={handleAddCategory} className="col-6">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={newCategory.name}
            onChange={(e) => {
              setNewCategory({ name: e.target.value });
            }}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Category
        </button>
        {errors &&
          Object.keys(errors).map((key) => (
            <p key={key} style={{ color: "red" }}>
              {key}: {errors[key].join(",")}
            </p>
          ))}
      </form>
    </div>
  );
}
