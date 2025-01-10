export const getAllTags = async () => {
  try {
    const response = await fetch("/api/Tag");
    if (!response.ok) {
      throw new Error(`Failed to fetch tags. Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error in getAllTags:", error);
    throw error;
  }
};

export const createTag = async (tag) => {
  try {
    const response = await fetch("/api/Tag", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    });

    if (!response.ok) {
      throw new Error(
        "Failed to create tag. Server responded with a status of " +
          response.status
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error in createTag:", error);
    throw error;
  }
};

export const updateTag = async (id, updatedTag) => {
  try {
    const response = await fetch(`/api/Tag/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTag),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update tag. Server responded with status: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error in updateTag:", error);
    throw error;
  }
};

export const deleteTag = async (id) => {
  try {
    const response = await fetch(`/api/Tag/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete tag. Server responded with status: ${response.status}`
      );
    }
  } catch (error) {
    console.error("Error in deleteTag:", error);
    throw error;
  }
};

export const getTagsByPostId = async (postId) => {
  const response = await fetch(`/api/PostTag/${postId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch tags for the post.");
  }
  return response.json();
};

export const addTagsToPost = async (postId, tagIds) => {
  const response = await fetch(`/api/PostTag`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ postId, tagIds }),
  });

  if (!response.ok) {
    throw new Error("Failed to associate tags with the post.");
  }

  return await response.json();
};
