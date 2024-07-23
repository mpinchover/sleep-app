import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://wdylwouqozgzhdnqkrnx.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(
  supabaseUrl,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkeWx3b3Vxb3pnemhkbnFrcm54Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyMTYxODI3MiwiZXhwIjoyMDM3MTk0MjcyfQ.LNiGCSpsrFKAvgZwR44mcVhT3eZVRt74VobbpF4BGv4",
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  }
);

export default supabase;
