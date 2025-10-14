import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const Dashboard = () => {
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase.from('your_table_name').select('*');
      if (error) {
        console.error('Supabase error:', error.message);
      } else {
        console.log('Supabase data:', data);
      }
    };

    testConnection();
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
