export const getAllTags = async () => {
  const response = await fetch("api/Tag");

  if (!response.ok) {
    throw new Error("Failed to fetch tags.");
  }

  const data = await response.json();
  return data;
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
