import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Container,
  Row,
  Col,
} from "reactstrap";
import {
  editUser,
  getProfile,
  getProfiles,
} from "../../managers/userProfileManager";

export const EditUserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    imageLocation: "",
    roles: [],
  });
  const [userProfiles, setUserProfiles] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    getProfiles().then(setUserProfiles);
  }, []);

  useEffect(() => {
    getProfile(id).then(setUser);
  }, []);

  const handleRoleToggle = () => {
    const userCopy = { ...user };

    const remainingAdmins = userProfiles.filter(
      (p) => p.roles.includes("Admin") && !p.id === id
    );

    // If the user is the last admin and the role is being removed, prevent it
    if (userCopy.roles.includes("Admin") && remainingAdmins.length === 0) {
      window.alert("Must always have one Admin");
      return; // Do not change the role
    }

    if (userCopy.roles.includes("Admin")) {
      userCopy.roles = [];
    } else {
      userCopy.roles = ["Admin"];
    }
    setUser(userCopy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editUser(id, user).then((res) => {
      if (res.errors) {
        setErrors(res.errors);
      } else {
        navigate("/userprofiles");
      }
    });
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5">
      <div style={{ width: "60%" }}>
        <h2 className="text-center mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>First Name</Label>
            <Input
              type="text"
              value={user.firstName}
              onChange={(e) => {
                const userCopy = { ...user };
                userCopy.firstName = e.target.value;
                setUser(userCopy);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Last Name</Label>
            <Input
              type="text"
              value={user.lastName}
              onChange={(e) => {
                const userCopy = { ...user };
                userCopy.lastName = e.target.value;
                setUser(userCopy);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>User Name</Label>
            <Input
              type="text"
              value={user.userName}
              onChange={(e) => {
                const userCopy = { ...user };
                userCopy.userName = e.target.value;
                setUser(userCopy);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Email</Label>
            <Input
              type="text"
              value={user.email}
              onChange={(e) => {
                const userCopy = { ...user };
                userCopy.email = e.target.value;
                setUser(userCopy);
              }}
            />
          </FormGroup>
          <FormGroup>
            <Label>Image URL</Label>
            <Input
              type="text"
              value={user.imageLocation}
              placeholder={user.imageLocation ? "" : "Add an image!"}
              onChange={(e) => {
                const userCopy = { ...user };
                userCopy.imageLocation = e.target.value;
                setUser(userCopy);
              }}
            />
          </FormGroup>
          <FormGroup check className="mb-3">
            <Label check>
              <Input
                type="checkbox"
                value=""
                checked={user.roles.includes("Admin")}
                onChange={handleRoleToggle}
              />
              Admin
            </Label>
          </FormGroup>
          <Button type="submit" color="primary" block>
            Submit
          </Button>
          {errors && (
            <div className="mt-3 text-danger">
              {Object.keys(errors).map((key) => (
                <p key={key}>
                  {key}: {errors[key].join(",")}
                </p>
              ))}
            </div>
          )}
        </form>
      </div>
    </Container>
  );
};
