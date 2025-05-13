
import { createClient } from '@supabase/supabase-js';
import type { Database } from './schema';

const SUPABASE_URL = "https://zyyfjscerflpvhmwfgvk.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5eWZqc2NlcmZscHZobXdmZ3ZrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4NzEyNTAsImV4cCI6MjA2MDQ0NzI1MH0.mNfsdv07KrfUtmljGNIQA0M3v3GpnozFILalr0fr9d0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
