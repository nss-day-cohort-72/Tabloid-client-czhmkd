import { useEffect, useState } from "react";
import { GetAllCategories } from "../../managers/categoryManager";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Error: {error.message}</h1>;
  }

  return (
    <div className="category-list d-flex justify-content-center align-items-center col-12 mx-auto">
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
                <button className="me-3 btn btn-success">Edit</button>
                <button className="btn btn-danger">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
