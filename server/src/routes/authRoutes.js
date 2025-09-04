import { Router } from 'express';
import { register, login } from '../controllers/authController.js';
import { registerValidators, loginValidators } from '../utils/validators.js';

const router = Router();
router.post('/register', registerValidators, register);
router.post('/login', loginValidators, login);
export default router;
