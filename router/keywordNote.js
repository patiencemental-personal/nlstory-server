import express from 'express';
import 'express-async-errors';
import * as keywordNoteController from '../controller/keywordNote.js';
import { isAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/daily', isAuth, keywordNoteController.getDailyKeywordNote);
router.get('/:pageId', isAuth, keywordNoteController.getKeywordNoteDetail);
router.patch('/:pageId', isAuth, keywordNoteController.updateKeywordNoteProperties);

export default router;