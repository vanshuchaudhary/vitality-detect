import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://qheaipmaejruztlulply.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFoZWFpcG1hZWpydXp0bHVscGx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNjY0NTQsImV4cCI6MjA3NTg0MjQ1NH0.G2xFaWv_1I45ZepGHfEZ_r5NRra5rrdowaRYfCM_IV4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
