import express from 'express';
import { createTrip, deleteTripById, getTripById, getTrips } from '../controllers/trip.controller.js';

const router = express.Router();

router.post('/create', createTrip);
router.get('/get', getTrips);
router.get('/get/:id', getTripById);
router.delete('/delete/:id', deleteTripById);

export default router;