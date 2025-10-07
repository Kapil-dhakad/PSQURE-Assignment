import express from 'express';
import { createBooking, getUserBookings } from '../controllers/booking.controller.js';
import { isUser } from '../middleware/authUser.middleware.js';


const router = express.Router();

router.post('/create', isUser, createBooking);
router.get('/getUserBookings', isUser, getUserBookings);

export default router;