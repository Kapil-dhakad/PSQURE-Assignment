import mongoose from 'mongoose';
import Booking from '../models/booking.model.js';
import Trip from '../models/trip.model.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiErrors.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const createBooking = asyncHandler(async (req, res) => {
    const { tripId, seats } = req.body;
    const userId = req.user.id;

    if (!tripId || !Array.isArray(seats) || seats.length === 0) {
        throw new ApiError(400, 'Trip ID and seats array are required');
    }

    if (!userId) {
        throw new ApiError(401, 'User authentication required');
    }

    const session = await mongoose.startSession();
    
    try {
        session.startTransaction();

        const trip = await Trip.findOne({ _id: tripId }).session(session);
        if (!trip) {
            throw new ApiError(404, 'Trip not found');
        }

        const alreadyBookedSeats  = seats.filter(seat => !trip.availableSeats.includes(seat));
        if (alreadyBookedSeats.length > 0) {
            throw new ApiError(400, `Seats already booked: ${alreadyBookedSeats.join(', ')}`);
        }

        trip.availableSeats = trip.availableSeats.filter(seat => !seats.includes(seat));

        await trip.save({ session });

        const [booking] = await Booking.create([{
            trip: tripId,
            user: userId,
            seats,
            paymentInfo: {
                method: req.body.paymentMethod || 'mock',
                paid: false,
                txnId: ''
            }
        }], { session });

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json(
            new ApiResponse(201, booking[0], 'Booking created successfully')
        );
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
    }
})

const getUserBookings = asyncHandler(async (req, res) => {
    const userId = req.user.id; 

    if (!userId) {
    throw new ApiError(401, 'User authentication required');
  }

    const bookings = await Booking.find({ user: userId }).populate({
      path: 'trip',
      select: 'from to date time price'
    })
     .sort({ bookingDate: -1 }) 
    .lean();

    const now = new Date();
  const upcomingBookings = [];
  const pastBookings = [];

  bookings.forEach(booking => {
    if (
      booking.status === 'booked' &&
      booking.trip &&
      new Date(booking.trip.date).getTime() >= now.getTime()
    ) {
      upcomingBookings.push(booking);
    } else {
      pastBookings.push(booking);
    }
  });

    return res.status(200).json(
    new ApiResponse(200, { upcomingBookings, pastBookings }, 'User bookings fetched successfully')
  );
});

const getAllBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find()
    .populate('user', 'name email')
    .populate('trip', 'from to date time price')
    .sort({ bookingDate: -1 })
    .lean();
    return res.status(200).json(
        new ApiResponse(200, bookings, 'All bookings fetched successfully')
    );
});

const cancelBooking = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new ApiError(400, "Invalid booking ID");
    }

    const booking = await Booking.findById(id);
    if (!booking) {
        throw new ApiError(404, 'Booking not found');
    }

    booking.status = 'cancelled';

   const trip = await Trip.findById(booking.trip);
    if (trip) {
        trip.availableSeats.push(...booking.seats);
        await trip.save();
    }

    await booking.save();

    return res.status(200).json(
        new ApiResponse(200, booking, 'Booking cancelled successfully')
    );
});

export { createBooking, getUserBookings, getAllBookings, cancelBooking };
