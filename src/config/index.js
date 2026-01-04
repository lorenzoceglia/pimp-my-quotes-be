"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configObject = void 0;
var path_1 = require("path");
var dotenv_1 = require("dotenv");
var environment = process.env.NODE_ENV || 'development';
var envFile = ".env.".concat(environment);
// Carica il file .env specifico per l'ambiente
(0, dotenv_1.config)({ path: (0, path_1.join)(process.cwd(), envFile) });
// Fallback al .env generico se esiste
(0, dotenv_1.config)({ path: (0, path_1.join)(process.cwd(), '.env') });
exports.configObject = {
    port: Number(process.env.PORT) || 3000,
    cors: {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
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
};
if (!exports.configObject.supabase.url)
    throw new Error('SUPABASE_URL is required');
if (!exports.configObject.supabase.anonKey)
    throw new Error('SUPABASE_ANON_KEY is required');
if (!exports.configObject.database.url)
    throw new Error('DATABASE_URL is required');
