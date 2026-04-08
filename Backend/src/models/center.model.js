import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  id: Number,
  name: String,
  slots: [String],
});

const specialtySchema = new mongoose.Schema({
  id: Number,
  name: String,
  doctors: [doctorSchema],
});

const centerSchema = new mongoose.Schema({
  id: Number,
  name: String,
  specialties: [specialtySchema],
});

export default mongoose.model("Center", centerSchema);
