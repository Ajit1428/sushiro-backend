import express from 'express';
import { signup, saveCode, login } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/save-code', saveCode);

export default router; 