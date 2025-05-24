import express from 'express';
import { signup, saveCode } from '../controllers/authController';

const router = express.Router();

router.post('/signup', signup);
router.post('/save-code', saveCode);

export default router; 