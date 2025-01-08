import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserProfileList from "./userprofiles/UserProfilesList";
import UserProfileDetails from "./userprofiles/UserProfileDetails";
import PostList from "./posts/PostList";
import CategoriesList from "./categories/CategoriesList";
import { CreateCategory } from "./categories/CreateCategory";
import { EditCategory } from "./categories/EditCategory";

export default function ApplicationViews({ loggedInUser, setLoggedInUser }) {
  return (
    <Routes>
      <Route path="/">
        <Route
          index
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <p>Welcome to Tabloid!</p>
            </AuthorizedRoute>
          }
        />
        <Route path="/userprofiles">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <UserProfileList />
              </AuthorizedRoute>
            }
          />
          <Route
            path=":id"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <UserProfileDetails />
              </AuthorizedRoute>
            }
          />
        </Route>
        <Route path="/posts">
          <Route
            index
            element={<PostList setLoggedInUser={setLoggedInUser} />}
          />
        </Route>
        <Route path="/categories">
          <Route
            index
            element={<CategoriesList setLoggedInUser={setLoggedInUser} />}
          />
          <Route
            path="create-category"
            element={<CreateCategory setLoggedInUser={setLoggedInUser} />}
          />
          <Route
            path=":id/edit-category"
            element={<EditCategory setLoggedInUser={setLoggedInUser} />}
          />
        </Route>
        <Route
          path="login"
          element={<Login setLoggedInUser={setLoggedInUser} />}
        />
        <Route
          path="register"
          element={<Register setLoggedInUser={setLoggedInUser} />}
        />
      </Route>
      <Route path="*" element={<p>Whoops, nothing here...</p>} />
    </Routes>
  );
}
