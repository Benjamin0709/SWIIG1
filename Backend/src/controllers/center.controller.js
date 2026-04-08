import Center from "../models/center.model.js";
import Booking from "../models/booking.model.js";

// Obtener todos los centros médicos
export const getCenters = async (req, res) => {
  try {
    const centers = await Center.find();
    res.json(centers);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener centros", error });
  }
};

// Crear centros (para poblar base inicialmente)
export const createCenters = async (req, res) => {
  try {
    await Center.insertMany(req.body);
    res.status(201).json({ message: "Centros creados correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear centros", error });
  }
};

// Obtener reservas existentes
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas", error });
  }
};

// Crear una nueva reserva
export const createBooking = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    // Verificar si el doctor ya tiene esa hora reservada
    const existing = await Booking.findOne({ doctorId, date, time });
    if (existing) {
      return res.status(400).json({ message: "Este horario ya está reservado." });
    }

    const booking = new Booking({ doctorId, date, time });
    await booking.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: "Error al crear reserva", error });
  }
};

// Editar Booking.js

export const updateBooking = async (req, res) => {
  try {
    const { id } = req.params;
    const { doctorId, date, time } = req.body;

    // Verificar si la reserva existe
    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({ message: "Reserva no encontrada" });
    }

    // Actualizar solo los campos enviados
    if (doctorId !== undefined) booking.doctorId = doctorId;
    if (date !== undefined) booking.date = date;
    if (time !== undefined) booking.time = time;

    // Guardar los cambios
    const updatedBooking = await booking.save();

    res.status(200).json({
      message: "Reserva actualizada correctamente",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("Error al actualizar la reserva:", error);
    res.status(500).json({ message: "Error al actualizar la reserva", error: error.message });
  }
};

// Eliminar reserva (opcional)
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    await Booking.findByIdAndDelete(id);
    res.json({ message: "Reserva eliminada" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar reserva", error });
  }
};
