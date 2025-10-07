import express from 'express';
import { createTrip, deleteTripById, editTripById, getTripById, getTrips } from '../controllers/trip.controller.js';
import { isAdmin } from '../middleware/authAdmin.middleware.js';

const router = express.Router();

router.post('/create', isAdmin, createTrip);
router.get('/get', getTrips);
router.get('/get/:id', getTripById);
router.put('/edit/:id', isAdmin, editTripById);
router.delete('/delete/:id', isAdmin, deleteTripById);

export default router;