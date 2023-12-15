const BASE_URL = "http://localhost:5000";

export const saveText = async (text) => {
  try {
    const response = await fetch(`${BASE_URL}/text/save`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) {
      throw new Error("Failed to save text");
    }
  } catch (error) {}
};

export const fetchRecentEntries = async () => {
  try {
    const response = await fetch(`${BASE_URL}/text/recent`);
    if (!response.ok) {
      throw new Error("Failed to fetch recent entries");
    }
    const data = await response.json();
    return data;
  } catch (error) {}
};
