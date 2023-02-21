import express from 'express';
import 'express-async-errors';
import * as authController from '../controller/auth.js';

const router = express.Router();

router.post('/login', authController.login);
router.get('/login/success', authController.loginSuccess);
router.post('/logout', authController.logout);

export default router;