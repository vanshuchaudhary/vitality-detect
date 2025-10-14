import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Prediction {
  condition: string;
  probability: number;
  trend: string;
  recommendation: string;
}

const [predictions, setPredictions] = useState<Prediction[]>([]);

useEffect(() => {
  const fetchPredictions = async () => {
    const { data, error } = await supabase.from('predictions').select('*');
    if (error) {
      console.error('Error fetching predictions:', error.message);
    } else {
      setPredictions(data);
    }
  };

  fetchPredictions();
}, []);
