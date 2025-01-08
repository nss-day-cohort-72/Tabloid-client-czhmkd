const _apiUrl = "/api/Categories";

export const GetAllCategories = () => {
  return fetch(_apiUrl)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error in fetch: ${res.status}`);
      }
      return res.json();
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const getCategoryById = (id) => {
  return fetch(`${_apiUrl}/${id}`).then((r) => r.json())
}

export const createCategory = (newCategory) => {
  return fetch(`${_apiUrl}`, {
    method: "POST",
    headers:{
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCategory)
}).then((res) => res.json());
}

export const editCategory = (id, newCategory) => {
  return fetch(`${_apiUrl}/${id}`, {
      method: "PUT",
      headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory)
  });
}

export const deleteCategory = (id) => {
  return fetch(`${_apiUrl}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
  });

}
