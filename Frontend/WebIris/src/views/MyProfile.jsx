import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const MyProfile = () => {
  const { authStatus } = useContext(UserContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);

  const mockup1 = {
    name: "Juan Perez",
    rut: "12.345.678-9",
    fechaNacimiento: "1990-05-12",
    age: 35,
    genero: "Masculino",
    alergias: "Ninguna",
    enfermedades: "Hipertensión controlada",
    direccion: "Av. Providencia 1234, Santiago",
    phone: "+56 9 1234 5678",
    email: "juanperez@email.com",
    tipoSangre: "O+",
  };

  const mockup2 = [
    {
      id: 1,
      fecha: "2025-11-15",
      doctor: "Dra. Ana Lopez",
      especialidad: "Cardiologia",
      phone: "+56 2 3456 7890",
      email: "ana.lopez@galenos.cl",
    },
  ];

  const [userData, setUserData] = useState(mockup1);
  const [appointments, setAppointments] = useState(mockup2);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => ({ ...prev, [id]: value }));
  };

  const handleDeleteAppointment = (id) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  if (!authStatus) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F5F7FA]">
        <p className="text-gray-700 text-lg">
          Debes iniciar sesión para ver tu perfil.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-10 px-4 flex justify-center">
      <div className="w-full max-w-5xl space-y-8">

        {/* PERFIL */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-2xl font-semibold text-[#004AAD] mb-6">
            Mi Perfil
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {Object.entries(userData).map(([key, value]) => (
              <div key={key}>
                <p className="text-sm text-gray-500 mb-1 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </p>

                {isEditing ? (
                  <input
                    id={key}
                    value={value}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#004AAD] outline-none"
                  />
                ) : (
                  <p className="font-medium text-gray-800">{value}</p>
                )}
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="mt-6 bg-[#004AAD] text-white px-5 py-2 rounded-lg hover:bg-[#00337A] transition"
          >
            {isEditing ? "Guardar Cambios" : "Editar Perfil"}
          </button>
        </div>

        {/* CITAS */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-[#004AAD]">
              Mis Citas
            </h2>
            <button
              onClick={() => navigate("/my-appointments")}
              className="text-[#004AAD] hover:underline text-sm"
            >
              Ver todas
            </button>
          </div>

          {appointments.map((a) => (
            <div
              key={a.id}
              className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3"
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
    </div>
  );
};

export default MyProfile;