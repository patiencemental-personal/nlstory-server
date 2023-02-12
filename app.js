import cors from 'cors';
import express from 'express';
import keywordNoteRouter from './router/keywordNote.js';
import { config } from './lib/config.js';

const PORT = process.env.PORT || 8080

const app = express();

const corsOption = {
  origin: config.cors.allowedOrigin,
  credentials: process.env.NODE_ENV === 'production',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOption));
app.use(express.json());

app.use('/keywordNote', keywordNoteRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(PORT);