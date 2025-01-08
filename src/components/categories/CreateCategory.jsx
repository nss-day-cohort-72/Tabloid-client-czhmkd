import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { createCategory } from "../../managers/categoryManager";

export const CreateCategory = () => {
  const navigate = useNavigate();
  const [newCategory, setNewCategory] = useState({
    name: "",
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    createCategory(newCategory).then((res) => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        navigate("/categories");
      }
    });
  };

  return (
    <>
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            value={newCategory.name}
            onChange={(e) => {
              const categoryCopy = { ...newCategory };
              categoryCopy.name = e.target.value;
              setNewCategory(categoryCopy);
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
