import { useEffect, useState } from "react";
import {
  deleteCategory,
  GetAllCategories,
} from "../../managers/categoryManager";
import { Link, useNavigate } from "react-router-dom";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="category-list d-flex justify-content-center align-items-center col-12 mx-auto">
      <h2>
        <Link to="create-category">Add Category</Link>
      </h2>
      {categories.length === 0 ? (
        <p>No Categories Available</p>
      ) : (
        <ul className="list-group col-6">
          {categories.map((categories) => (
            <li
              key={categories.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <h3 className="col-6">{categories.name}</h3>
              <div className="button container col-6 d-flex justify-content-end">
                <button
                  className="me-3 btn btn-success"
                  onClick={() => handleEditNav(categories.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(categories.id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
