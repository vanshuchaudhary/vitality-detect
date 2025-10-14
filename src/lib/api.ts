const BASE_URL = "http://127.0.0.1:8000"; // Local FastAPI server

export const predictDiabetes = async (features: number[]) => {
  const res = await fetch(`${BASE_URL}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ features }),
  });
  return res.json();
};
