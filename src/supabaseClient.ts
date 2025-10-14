import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  "REACT_APP_SUPABASE_URL=https://qheaipmaejruztlulply.supabase.co"
"REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoZWFpcG1hZWpydXp0bHVscGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNjY0NTQsImV4cCI6MjA3NTg0MjQ1NH0.G2xFaWv_1I45ZepGHfEZ_r5NRra5rrdowaRYfCM_IV4"                         
);

export default supabase;
