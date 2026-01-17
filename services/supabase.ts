
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uvgnawiblpatnqhjeqmc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2Z25hd2libHBhdG5xaGplcW1jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg0NTk4NjQsImV4cCI6MjA4NDAzNTg2NH0.batX38ekRdkqbVOto8gDOxHeDYSyGHE1DIgfebC8GVw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
