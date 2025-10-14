import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Prediction {
  condition: string;
  probability: number;
  trend: string;
  recommendation: string;
}

const Dashboard = () => {
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      const { data, error } = await supabase.from('predictions').select('*');
      if (error) {
        console.error('Error fetching predictions:', error.message);
        setError('Failed to fetch predictions');
      } else {
        setPredictions(data);
      }
    };

    fetchPredictions();
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {predictions.length === 0 && !error && <p>Loading predictions...</p>}

      {predictions.length > 0 && (
        <div>
          <h2>Predictions</h2>
          <ul>
            {predictions.map((prediction, index) => (
              <li key={index} style={{ marginBottom: '1rem' }}>
                <strong>Condition:</strong> {prediction.condition} <br />
                <strong>Probability:</strong> {prediction.probability} <br />
                <strong>Trend:</strong> {prediction.trend} <br />
                <strong>Recommendation:</strong> {prediction.recommendation}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
