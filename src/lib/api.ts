const BASE_URL = "http://127.0.0.1:8000"; // Local FastAPI server

export const predictDiabetes = async (features: number[]) => {
  try {
    const response = await fetch(`${BASE_URL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ features }),
    });

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    const result = await response.json();

    if (!result || typeof result.prediction === "undefined") {
      throw new Error("Invalid response format from server");
    }

    return result;
  } catch (error) {
    console.error("Prediction request failed:", error);
    throw error;
  }
};
