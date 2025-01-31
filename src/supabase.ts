import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL as string;
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase credentials! Check your .env file.");
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

