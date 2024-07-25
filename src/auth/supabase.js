import { createClient } from "@supabase/supabase-js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const supabaseUrl = "https://wdylwouqozgzhdnqkrnx.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(
  supabaseUrl,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndkeWx3b3Vxb3pnemhkbnFrcm54Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE2MTgyNzIsImV4cCI6MjAzNzE5NDI3Mn0._bC30f8zNlzoZRJ8TV_gKMhHDtgynf16j6UW0bUXp-I",
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
