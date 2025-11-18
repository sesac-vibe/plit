import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { contentRouter } from './routes/content.js';
import { healthRouter } from './routes/health.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/health', healthRouter);
app.use('/api/content', contentRouter);

app.use('/storage', express.static(process.env.LOCAL_STORAGE_PATH || './storage'));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
