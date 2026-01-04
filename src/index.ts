import { configObject } from '@/config/index.js';
import { router } from '@/routes/index.js';
import cors from 'cors';
import express from 'express';

const app = express();

// Middleware
app.use(cors(configObject.cors));

app.use(express.json());

app.use(router);
// Start server
app.listen(configObject.port, '0.0.0.0', () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode on port ${configObject.port}`);
  console.log(`👉 Database: ${configObject.database.url}`);
  console.log(`👉 CORS origin: ${configObject.cors.origin}`);
});
