import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Register = () => {

  const { registerUser } = useContext(UserContext);
  const [useRUT, setUseRUT] = useState(true);

  const initialValues = {
    rut: "",
    name: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  };

  const [formData, setFormData] = useState(initialValues);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    registerUser(formData);
    setFormData(initialValues);
    navigate("/my-profile");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">

      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#fcf1d7]">

        <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#781040] mb-2">
          Crear Cuenta
        </h1>

        <p className="text-center text-gray-500 mb-6">
          Regístrate para continuar
        </p>

        <div className="flex justify-center gap-2 mb-6">
          <button
            type="button"
            onClick={() => setUseRUT(true)}
            className={`px-4 py-2 rounded-lg border transition ${
              useRUT
                ? "bg-[#e52421] text-white border-[#fcf1d7]"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            RUT
          </button>

          <button
            type="button"
            onClick={() => setUseRUT(false)}
            className={`px-4 py-2 rounded-lg border transition ${
              !useRUT
                ? "bg-[#e52421] text-white border-[#fcf1d7]"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            Pasaporte
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input id="rut" placeholder={useRUT ? "12.345.678-9" : "AB1234567"} onChange={handleChange} value={formData.rut} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#e52421]" />

          <input id="name" placeholder="Nombres" onChange={handleChange} value={formData.name} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#e52421]" />

          <input id="lastname" placeholder="Apellidos" onChange={handleChange} value={formData.lastname} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#e52421]" />

          <input id="email" type="email" placeholder="Correo" onChange={handleChange} value={formData.email} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#e52421]" />

          <input id="phone" placeholder="+56 9 1234 5678" onChange={handleChange} value={formData.phone} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#e52421]" />

          <input id="password" type="password" placeholder="Contraseña" onChange={handleChange} value={formData.password} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#e52421]" />

          <input id="confirmPassword" type="password" placeholder="Confirmar contraseña" onChange={handleChange} value={formData.confirmPassword} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#e52421]" />

          <button
            type="submit"
            className="w-full bg-[#e52421] hover:bg-[#c81e1b] text-white p-3 rounded-lg font-semibold border-2 border-[#fcf1d7] transition"
          >
            Registrarse
          </button>

          <p className="text-center text-sm text-gray-600">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-[#781040] font-medium hover:underline">
              Inicia sesión
            </a>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Register;