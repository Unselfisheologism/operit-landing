import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cadlhnfgxvyzfddmchxw.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhZGxobmZneHZ5emZkZG1jaHh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMzMjE5MjAsImV4cCI6MjA5ODg5NzkyMH0.P4cZvE4xwSJr-Km1_e4K8UPPI5qa2Cmfz-g1ietgnq8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    detectSessionInUrl: true,
    flowType: "implicit",
    persistSession: true,
    autoRefreshToken: true,
  },
});
