const _apiUrl = "/api/posts";

export const GetAllApprovedPosts = () => {
  return fetch(_apiUrl + "/approved")
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
