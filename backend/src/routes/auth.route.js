import express from 'express';
import  {loginUser, registerUser}  from '../controllers/auth.controller.js';
import { isUser } from '../middleware/authUser.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;