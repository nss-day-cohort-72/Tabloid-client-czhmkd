import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { editCategory, getCategoryById } from "../../managers/categoryManager";

export const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [category, setCategory] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getCategoryById(id).then(setCategory);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    editCategory(id, category).then((res) => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        navigate("/categories");
      }
    });
  };

  return (
    <>
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            value={category.name}
            onChange={(e) => {
              const categoryCopy = { ...category };
              categoryCopy.name = e.target.value;
              setCategory(categoryCopy);
            }}
            placeholder="Enter name"
          />
        </FormGroup>
        <Button type="submit" color="primary">
          Submit
        </Button>
        <div style={{ color: "red" }}>
          {errors &&
            Object.keys(errors).map((key) => (
              <p key={key}>
                {key}: {errors[key].join(",")}
              </p>
            ))}
        </div>
      </form>
    </>
  );
};
