import { join } from 'path';
import { config as loadEnv } from 'dotenv';

const environment = process.env.NODE_ENV || 'development';
const envFile = `.env.${environment}`;

// Carica il file .env specifico per l'ambiente
loadEnv({ path: join(process.cwd(), envFile) });

// Fallback al .env generico se esiste
loadEnv({ path: join(process.cwd(), '.env') });

export const configObject = {
  port: Number(process.env.PORT) || 3000,
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
  frontend: process.env.FRONT_END_URL || 'http://localhost:5173',
  supabase: {
    url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  database: {
    url: process.env.DATABASE_URL,
    directUrl: process.env.DIRECT_DATABASE_URL,
  },
} as const;

if (!configObject.supabase.url) throw new Error('SUPABASE_URL is required');
if (!configObject.supabase.anonKey) throw new Error('SUPABASE_ANON_KEY is required');
if (!configObject.database.url) throw new Error('DATABASE_URL is required');
