import { Route, Routes } from "react-router-dom";
import { AuthorizedRoute } from "./auth/AuthorizedRoute";
import Login from "./auth/Login";
import Register from "./auth/Register";
import UserProfileList from "./userprofiles/UserProfilesList";
import UserProfileDetails from "./userprofiles/UserProfileDetails";
import PostList from "./posts/PostList";
import PostDetails from "./posts/PostDetails";
import MyPosts from "./posts/MyPosts";
import CategoriesList from "./categories/CategoriesList";
import { EditCategory } from "./categories/EditCategory";
import { TagsList } from "./tags/TagsList";
import { EditUserProfile } from "./userprofiles/EditUserProfile";
import NewPost from "./posts/NewPost.jsx";
import EditPost from "./posts/EditPost.jsx";
import { TagsForPost } from "./tags/TagsForPost.jsx";

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
          <Route
            path=":id/edit-user"
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <EditUserProfile />
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
        <Route path="/posts/myposts">
          <Route
            index
            element={
              <MyPosts
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
              />
            }
          />
        </Route>
        <Route path="/posts/newpost">
          <Route
            index
            element={
              <NewPost
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
              />
            }
          />
        </Route>
        <Route
          path="/posts/:postId/tags"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <TagsForPost />
            </AuthorizedRoute>
          }
        />
        <Route
          path="/posts/:postId"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <PostDetails />
            </AuthorizedRoute>
          }
        />
        {/* New Edit Post Route */}
        <Route
          path="/posts/:postId/edit"
          element={
            <AuthorizedRoute loggedInUser={loggedInUser}>
              <EditPost
                loggedInUser={loggedInUser}
                setLoggedInUser={setLoggedInUser}
              />
            </AuthorizedRoute>
          }
        />
        <Route path="/categories">
          <Route
            index
            element={<CategoriesList setLoggedInUser={setLoggedInUser} />}
          />
          <Route
            path=":id/edit-category"
            element={<EditCategory setLoggedInUser={setLoggedInUser} />}
          />
        </Route>
        <Route path="/tags">
          <Route
            index
            element={
              <AuthorizedRoute loggedInUser={loggedInUser} roles={["Admin"]}>
                <TagsList />
              </AuthorizedRoute>
            }
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
