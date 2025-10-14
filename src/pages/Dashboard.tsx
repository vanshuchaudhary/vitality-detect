import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

const BASE_URL = 'http://127.0.0.1:8000'; // FastAPI backend

const Dashboard = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [prediction, setPrediction] = useState<number | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      const { data, error } = await supabase.from('patients').select('*');
      if (error) {
        console.error('Supabase error:', error.message);
      } else {
        setPatients(data);
        console.log('Supabase data:', data);
      }
    };

    fetchPatients();
  }, []);

  const handlePredict = async (features: number[]) => {
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
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>

      {patients.length > 0 && (
        <div>
          <h2>First Patient</h2>
          <pre>{JSON.stringify(patients[0], null, 2)}</pre>

          <button
            onClick={() =>
              handlePredict([
                patients[0].Pregnancies,
                patients[0].Glucose,
                patients[0].BloodPressure,
                patients[0].SkinThickness,
                patients[0].Insulin,
                patients[0].BMI,
                patients[0].DiabetesPedigreeFunction,
                patients[0].Age,
              ])
            }
          >
            Predict Diabetes
          </button>

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
