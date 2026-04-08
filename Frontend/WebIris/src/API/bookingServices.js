import api from "./apiClient";

export const getBookings = async() => {
    try {
        const response = await api.get("/api/bookings");
        return response.data;
    } catch (error) {
        console.error("Error al obtener reservas:", error);
        throw error;
    }
};

export const createBooking = async(bookingData) => {
    try {
        const response = await api.post("/api/bookings", bookingData);
        return response.data;
    } catch (error) {
        console.error("Error al crear reserva:", error);
        throw error;
    }
};

export const updateBooking = async(id, updatedData) => {
    try {
        const response = await api.put(`/api/bookings/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error("Error al actualizar reserva:", error);
        throw error;
    }
};

export const deleteBooking = async(id) => {
    try {
        const response = await api.delete(`/api/bookings/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error al eliminar reserva:", error);
        throw error;
    }
};