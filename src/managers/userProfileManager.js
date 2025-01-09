const _apiUrl = "/api/userprofile";

export const getProfiles = () => {
  return fetch(_apiUrl + "/withroles").then((res) => res.json());
};

export const getProfile = (id) => {
  return fetch(_apiUrl + `/${id}`).then((res) => res.json());
};

export const editUser = (id, newUser) => {
  return fetch(`${_apiUrl}/${id}`, {
      method: "PUT",
      headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser)
  });
}

export const toggleActivate = (id) => {
  return fetch(`${_apiUrl}/${id}/toggle-activate`, {
      method: "PUT",
      headers:{
          "Content-Type": "application/json",
        }
  });
}
