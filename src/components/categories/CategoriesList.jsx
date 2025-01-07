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
    <div className="category-list">
      <h2>Categories</h2>
      {categories.length === 0 ? (
        <p>No Categories Available</p>
      ) : (
        <ul className="list-group">
          {categories.map((categories) => (
            <li key={categories.id} className="list-group-item">
              <h3>{categories.name}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
