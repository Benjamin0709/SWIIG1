import express from "express";
import { auth, authorizeRoles } from "../middleware/auth.js";

import {
  getCenters,
  createCenters,
  getBookings,
  createBooking,
  updateBooking,
  deleteBooking,
} from "../controllers/center.controller.js";

const router = express.Router();

// Centros médicos
router.get("/centers", getCenters);
router.post("/centers", auth, authorizeRoles('admin', 'superadmin'), createCenters);

// Reservas
router.get("/bookings", auth, authorizeRoles('assistant', 'user', 'doctor'), getBookings);
router.post("/bookings", createBooking);
router.put("/bookings/:id", auth, authorizeRoles('assistant', 'user'), updateBooking);
router.delete("/bookings/:id", auth, authorizeRoles('assistant', 'user'), deleteBooking);

export default router;
