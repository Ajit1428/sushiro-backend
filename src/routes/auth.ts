import express from 'express';
import { signup, saveCode, login, verifyCode, updateCode } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/save-code', saveCode);
router.post('/verify-code', verifyCode);
router.post('/update-code', updateCode);

export default router; 