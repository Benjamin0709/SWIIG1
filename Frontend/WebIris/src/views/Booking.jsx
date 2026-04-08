import { useState, useEffect } from "react";
import Calendar from "../components/Calendar";
import BookingModal from "../components/BookingModal";
import { getBookings, createBooking } from "../API/bookingServices";
import { getCenters } from "../API/centerService";

const Booking = () => {

  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [reservedAppointments, setReservedAppointments] = useState([]);
  const [centers, setCenters] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getBookings();
        setReservedAppointments(data);
      } catch (error) {
        console.error("Error cargando reservas:", error);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    const fetchCenters = async () => {
      const data = await getCenters();
      setCenters(data);
    };
    fetchCenters();
  }, []);

  const handleCreateBooking = async (newBooking) => {
    try {
      const saved = await createBooking(newBooking);
      setReservedAppointments((prev) => [...prev, saved]);
      alert("Reserva creada con éxito");
    } catch (error) {
      console.error("Error creando reserva:", error);
      alert("Error al crear la reserva");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2e1065] via-[#4c1d95] to-[#6d28d9] p-6 sm:p-10">
      
      <h1 className="text-3xl sm:text-5xl font-bold text-center mb-8 sm:mb-10 text-white">
        Reserva tu Cita
      </h1>

      <div className="flex items-center justify-center">
        <div className="w-full max-w-2xl">

          <Calendar
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
          />

          <div className="flex justify-center items-center bg-white p-4 sm:p-6 rounded-2xl mt-4 shadow-lg">
            <button
              className="bg-[#e52421] hover:bg-[#c81e1b] text-white 
                         py-2 sm:py-3 px-4 sm:px-6 
                         rounded-lg text-base sm:text-lg font-semibold 
                         border-2 border-[#fcf1d7] 
                         transition transform hover:scale-105"
              onClick={() => {
                if (!selectedDate) return alert("Selecciona una fecha primero.");
                setShowModal(true);
              }}
            >
              Reservar cita
            </button>
          </div>

        </div>
      </div>

      <BookingModal
        open={showModal}
        onClose={() => setShowModal(false)}
        selectedDate={selectedDate}
        centers={centers}
        reservedAppointments={reservedAppointments}
        setReservedAppointments={setReservedAppointments}
        onCreateBooking={handleCreateBooking}
      />
    </div>
  );
};

export default Booking;