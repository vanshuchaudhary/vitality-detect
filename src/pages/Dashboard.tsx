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
      try {
        const { data, error } = await supabase.from('patients').select('*');
        if (error) {
          console.error('Supabase error:', error.message);
          setError('Failed to fetch patients');
        } else if (data && data.length > 0) {
          setPatients(data);
          console.log('Supabase data:', data);
        } else {
          setError('No patient data found');
        }
      } catch (err) {
        console.error('Unexpected error:', err);
        setError('Something went wrong while fetching patients');
      }
    };

    fetchPatients();
  }, []);

  const handlePredict = async (patient: any) => {
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

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

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
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {patients.length === 0 && !error && <p>Loading patient data...</p>}

      {patients.length > 0 && (
        <div>
          <h2>First Patient</h2>
          <pre>{JSON.stringify(patients[0], null, 2)}</pre>

          <button onClick={() => handlePredict(patients[0])} disabled={loading}>
            {loading ? 'Predicting...' : 'Predict Diabetes'}
          </button>

          {prediction !== null && (
            <p style={{ marginTop: '1rem' }}>
              Prediction: <strong>{prediction === 1 ? 'Positive' : 'Negative'}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
