import express from 'express';
import { cancelBooking, createBooking, getAllBookings, getUserBookings } from '../controllers/booking.controller.js';
import { isUser } from '../middleware/authUser.middleware.js';
import { isAdmin } from '../middleware/authAdmin.middleware.js';


const router = express.Router();

router.post('/create', isUser, createBooking);
router.get('/getUserBookings', isUser, getUserBookings);

router.get('/getAllBookings', isAdmin, getAllBookings);
router.post('/cancel/:id', isAdmin, cancelBooking);

export default router;