import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
    index: true,
  },
  to: {
    type: String,
    required: true,
    index: true,
  },
  date: {
    type: Date,
    required: true,
    index: true,
  },
  time: {
    type: String,
    required: true, 
  },
  price: {
    type: Number,
    required: true,
  },
  totalSeats: {
    type: Number,
    required: true,
    min: 1,
  },
  availableSeats: {
    type: [Number],
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const Trip = mongoose.model("Trip", tripSchema);

export default Trip;
