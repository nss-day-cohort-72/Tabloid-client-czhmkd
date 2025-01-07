const _apiUrl = "/api/categories";

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
