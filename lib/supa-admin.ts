import { createClient } from '@supabase/supabase-js'

// This admin client is for server-side use ONLY, where RLS can be safely bypassed.
// It uses the SERVICE_ROLE_KEY, which should be kept secret.
export const supaAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
