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

export const GetPostById = (postId) => {
  return fetch(`${_apiUrl}/${postId}`)
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

export const GetAllPosts = () => {
  return fetch(`${_apiUrl}/myposts`)
    .then((res) => {
      console.log("Response status:", res.status);
      console.log("Response object:", res);

      if (!res.ok) {
        throw new Error(`Error in fetch: ${res.status} - ${res.statusText}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Response data:", data);
      return data;
    })
    .catch((error) => {
      console.error("Failed to fetch all posts:", error);
      throw error;
    });
};
