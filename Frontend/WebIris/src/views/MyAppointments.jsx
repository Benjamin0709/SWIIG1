import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const MyAppointments = () => {
  const { authStatus } = useContext(UserContext);
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      fecha: "2025-11-15",
      doctor: "Iris Galvéz",
      especialidad: "Psicóloga",
      phone: "+56 2 3456 7890",
      email: "I.Galvez@gmail.cl",
    },
  ]);

  const handleDeleteAppointment = (id) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  if (!authStatus) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F5F7FA]">
        <p className="text-gray-700 text-lg">
          Debes iniciar sesión.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-10 px-4 flex justify-center">
      <div className="w-full max-w-4xl">

        <h2 className="text-3xl font-semibold text-[#004AAD] mb-8 text-center">
          Mis Citas Médicas
        </h2>

        {appointments.map((a) => (
          <div
            key={a.id}
            className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 hover:shadow-md transition"
          >
            <div>
              <p><span className="font-semibold">Fecha:</span> {a.fecha}</p>
              <p><span className="font-semibold">Doctor:</span> {a.doctor}</p>
              <p><span className="font-semibold">Especialidad:</span> {a.especialidad}</p>
            </div>

            <div className="mt-3 sm:mt-0 text-sm text-gray-600">
              <p>{a.phone}</p>
              <p>{a.email}</p>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => navigate("/booking")}
                  className="bg-[#004AAD] text-white px-3 py-1 rounded-md hover:bg-[#00337A]"
                >
                  Cambiar
                </button>
                <button
                  onClick={() => handleDeleteAppointment(a.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default MyAppointments;