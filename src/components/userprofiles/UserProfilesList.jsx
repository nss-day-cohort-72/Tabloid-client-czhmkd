import { useEffect, useState } from "react";
import { getProfiles, toggleActivate } from "../../managers/userProfileManager";
import { Link } from "react-router-dom";

export default function UserProfileList() {
  const [userprofiles, setUserProfiles] = useState([]);

  const getUserProfiles = () => {
    getProfiles().then(setUserProfiles);
  };
  useEffect(() => {
    getUserProfiles();
  }, []);

  const toggleIsActive = (id, isActive, isAdmin) => {
    if (isActive && isAdmin) {
      const remainingAdmins = userprofiles.filter(
        (p) => p.roles.includes("Admin") && p.id !== id
      );

      if (remainingAdmins.length === 0) {
        // Prevent deactivation if there's only one admin
        alert("There must be at least one admin user.");
        return; // Don't proceed with deactivation
      }
    }
    if (isActive) {
      // Only show the confirmation for deactivating a user
      const isConfirmed = window.confirm(
        "Are you sure you want to deactivate this user?"
      );

      if (isConfirmed) {
        console.log(id);
        toggleActivate(id).then(() => {
          getUserProfiles().then(setUserProfiles);
        });
      }
    } else {
      // For activating, just toggle without confirmation
      toggleActivate(id).then(() => {
        getUserProfiles().then(setUserProfiles);
      });
    }
  };

  return (
    <>
      <div className="ms-3">
        <p className="ms-2">User Profile List</p>
        <h3>Active</h3>
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
              .filter((p) => p.isActive)
              .sort((a, b) => a.userName.localeCompare(b.userName))
              .map((p) => (
                <tr key={p.id}>
                  <td>{p.firstName}</td>
                  <td>{p.lastName}</td>
                  <td>{p.userName}</td>
                  <td>{p.roles.includes("Admin") ? "Yes" : "No"}</td>
                  <td>
                    <button
                      onClick={() =>
                        toggleIsActive(
                          p.id,
                          p.isActive,
                          p.roles.includes("Admin")
                        )
                      }
                    >
                      Deactivate
                    </button>{" "}
                    <Link to={`${p.id}/edit-user`}>Edit</Link>{" "}
                    <Link to={`/userprofiles/${p.id}`}>Details</Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <h3>Inactive</h3>
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
              .filter((p) => !p.isActive)
              .sort((a, b) => a.userName.localeCompare(b.userName))
              .map((p) => (
                <tr key={p.id}>
                  <td>{p.firstName}</td>
                  <td>{p.lastName}</td>
                  <td>{p.userName}</td>
                  <td>{p.roles.includes("Admin") ? "Yes" : "No"}</td>
                  <td>
                    <button
                      onClick={() =>
                        toggleIsActive(
                          p.id,
                          p.isActive,
                          p.roles.includes("Admin")
                        )
                      }
                    >
                      Activate
                    </button>{" "}
                    <Link to={`${p.id}/edit-user`}>Edit</Link>{" "}
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
