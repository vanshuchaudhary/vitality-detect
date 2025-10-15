import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";

const BASE_URL = "http://127.0.0.1:8000";

const DashboardPrediction = () => {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handlePredict = async () => {
    setLoading(true);
    try {
      // Example features: [Pregnancies, Glucose, BP, SkinThickness, Insulin, BMI, DiabetesPedigree, Age]
      const features = [5, 120, 70, 20, 79, 25.0, 0.5, 33];
      const res = await fetch(`${BASE_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features }),
      });
      
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      
      const result = await res.json();
      setPrediction(`${result.risk_level} Risk (${(result.probability * 100).toFixed(1)}% probability)`);
    } catch (err) {
      console.error("Prediction failed:", err);
      setPrediction("Error: Make sure FastAPI server is running at http://127.0.0.1:8000");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="shadow-medium mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          Diabetes Prediction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <button
          onClick={handlePredict}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition"
          disabled={loading}
        >
          {loading ? "Predicting..." : "Run Prediction"}
        </button>
        {prediction && (
          <p className="mt-4 text-lg text-foreground">
            Result: <strong>{prediction}</strong>
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardPrediction;
