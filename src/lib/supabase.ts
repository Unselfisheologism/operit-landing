import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cadlhnfgxvyzfddmchxw.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNhbGRoZmZneHZ5emZkbWNoeHciLCJyb2xlIjoiYW5vbiIsImlhdCI6MTc2MzA1NzMwNywiZXhwIjoyMDc4NjMzMzA3fQ.PI5qa2Cmfz-g1ietgnq8";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
