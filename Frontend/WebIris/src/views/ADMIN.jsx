import { useState } from "react";

const AdminPanel = () => {
  const [Especialista, setEspecialista] = useState([]);

  const [nuevoEspecialista, setNuevoEspecialista] = useState({
    nombre: "",
    especialidad: "",
    area: "",
    dias: "",
    disponible: true,
  });

  const handleAddSpecialist = () => {
    setEspecialista([...Especialista, { ...nuevoEspecialista, id: Date.now() }]);
    setNuevoEspecialista({
      nombre: "",
      especialidad: "",
      area: "",
      dias: "",
      disponible: true,
    });
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] py-10 px-6">

      <h2 className="text-3xl font-semibold text-[#004AAD] text-center mb-8">
        Panel de Administración
      </h2>

      <div className="bg-white p-6 rounded-2xl shadow-md max-w-3xl mx-auto border border-gray-100 mb-10">
        <h3 className="text-xl font-semibold mb-4">Agregar Especialista</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input placeholder="Nombre"
            className="p-2 border rounded-lg focus:ring-2 focus:ring-[#004AAD]"
            value={nuevoEspecialista.nombre}
            onChange={(e)=>setNuevoEspecialista({...nuevoEspecialista,nombre:e.target.value})}
          />
          <input placeholder="Especialidad"
            className="p-2 border rounded-lg focus:ring-2 focus:ring-[#004AAD]"
            value={nuevoEspecialista.especialidad}
            onChange={(e)=>setNuevoEspecialista({...nuevoEspecialista,especialidad:e.target.value})}
          />
        </div>

        <button
          onClick={handleAddSpecialist}
          className="mt-4 bg-[#004AAD] text-white px-5 py-2 rounded-lg hover:bg-[#00337A]"
        >
          Agregar
        </button>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {doctors.map((d) => (
          <div key={d.id}
            className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex justify-between"
          >
            <p>{d.nombre}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default AdminPanel;