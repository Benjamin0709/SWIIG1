import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  doctorId: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
});

export default mongoose.model("Booking", bookingSchema);
