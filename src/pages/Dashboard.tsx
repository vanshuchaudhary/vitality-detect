import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const BASE_URL = 'http://127.0.0.1:8000'; // FastAPI backend

const Dashboard = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPatients = async () => {
      const { data, error } = await supabase.from('patients').select('*');
      if (error) {
        console.error('Supabase error:', error.message);
        setError('Failed to fetch patients');
      } else {
        setPatients(data);
        console.log('Supabase data:', data);
      }
    };

    fetchPatients();
  }, []);

  const handlePredict = async (patient: any) => {
    // Extract only numeric values from patient object
    const features = Object.values(patient).filter(val => typeof val === 'number');

    if (features.length === 0) {
      setError('No numeric features found for prediction');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${BASE_URL}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ features }),
      });
      const result = await res.json();
      setPrediction(result.prediction);
    } catch (err) {
      console.error('FastAPI error:', err);
      setError('Prediction failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {patients.length > 0 && (
        <div>
          <h2>First Patient</h2>
          <pre>{JSON.stringify(patients[0], null, 2)}</pre>

          <button onClick={() => handlePredict(patients[0])}>
            Predict Diabetes
          </button>

          {loading && <p>Loading prediction...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {prediction !== null && (
            <p>
              Prediction: {prediction === 1 ? 'Positive' : 'Negative'}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
