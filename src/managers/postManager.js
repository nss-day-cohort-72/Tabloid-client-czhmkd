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

export const createPost = (post) => {
  return fetch(`${_apiUrl}/newpost`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Error in fetch: ${res.status}`);
    }
    return res.json();
  });
};

export const editPost = (postId, post) => {
  return fetch(`/api/posts/edit/${postId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Error updating post: ${res.status}`);
    }
  });
};

export const deletePost = (postId) => {
  return fetch(`/api/posts/delete/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Error deleting post: ${res.status}`);
    }
  });
};
