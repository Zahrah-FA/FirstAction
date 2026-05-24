import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vfueuavvsupkokjwcoyq.supabase.co';
const supabaseKey = 'sb_publishable_1UN-065MSUEuyaeE8nOscQ_jmovrKu2';

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);