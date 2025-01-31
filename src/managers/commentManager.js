const _apiUrl = "/api/comment";

export const createComment = (postId, comment, userId) => {
  return fetch(`${_apiUrl}/${postId}/add?userId=${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  }).then((res) => {
    if (!res.ok) {
      throw new Error(`Error in fetch: ${res.status}`);
    }
    return res.json();
  });
};

export const getCommentByPostId = (postId) => {
  return fetch(`${_apiUrl}/${postId}`)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Error fetching comments: ${res.status}`);
      }
      return res.text();
    })
    .then((text) => {
      return text ? JSON.parse(text) : [];
    })
    .catch((error) => {
      console.error("Error fetching comments:", error);
      return [];
    });
};
