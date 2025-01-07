import { useEffect, useState } from "react";
import { getProfiles } from "../../managers/userProfileManager";
import { Link } from "react-router-dom";

export default function UserProfileList() {
  const [userprofiles, setUserProfiles] = useState([]);

  const getUserProfiles = () => {
    getProfiles().then(setUserProfiles);
  };
  useEffect(() => {
    getUserProfiles();
  }, []);

  return (
    <>
      <div className="ms-3">
        <p className="ms-2">User Profile List</p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Admin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userprofiles
              .sort((a, b) => a.userName.localeCompare(b.userName))
              .map((p) => (
                <tr key={p.id}>
                  <td>{p.firstName}</td>
                  <td>{p.lastName}</td>
                  <td>{p.userName}</td>
                  <td>{p.roles.includes("Admin") ? "Yes" : "No"}</td>
                  <td>
                    <Link to={`/userprofiles/${p.id}`}>Details</Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
