import { configObject } from '@/config/index.js';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  configObject.supabase.url!,
  configObject.supabase.serviceRoleKey!,
);
export async function deleteUser(userId: string): Promise<number> {
  if (!userId) return 400;

  const { error } = await supabaseAdmin.auth.admin.deleteUser(userId);

  if (error) {
    console.error('Errore nella cancellazione utente:', error.message);
    return 500;
  }

  return 200;
}
