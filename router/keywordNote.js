import express from 'express';
import 'express-async-errors';
import * as keywordNoteController from '../controller/keywordNote.js';

const router = express.Router();

router.get('/daily', keywordNoteController.getDailyKeywordNote);
router.get('/:pageId', keywordNoteController.getKeywordNoteDetail);
router.patch('/:pageId', keywordNoteController.updateKeywordNoteProperties);

export default router;