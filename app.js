import keywordNoteRouter from './router/keywordNote.js';
import express from 'express';
const app = express();

app.use(express.json());

app.use('/keywordNote', keywordNoteRouter);

app.use((req, res, next) => {
  res.sendStatus(404);
});

app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(8080);