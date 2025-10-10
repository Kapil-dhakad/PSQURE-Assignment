import express from 'express';
import  {getAdminProfile, getProfile, getUserProfile, loginUser, logoutUser, registerUser}  from '../controllers/auth.controller.js';
import { isUser } from '../middleware/authUser.middleware.js';
import { isAdmin } from '../middleware/authAdmin.middleware.js';

const router = express.Router();

// /api/v1/auth/register
// /api/v1/auth/login
// /api/v1/auth/profile
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', isUser, getProfile); 
router.post('/logout', logoutUser)

// router.get('/profile', isUser, getUserProfile); 
// router.get('/profile', isAdmin, getAdminProfile); 
export default router;