import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Login = () => {

  const { loginUser } = useContext(UserContext);

  const initialValues = {
    email: "", 
    password: "" 
  };

  const [formData, setFormData] = useState(initialValues);
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Por favor completa todos los campos");
      return;
    }

    loginUser(formData);
    setFormData(initialValues);
    navigate("/my-profile");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md border border-[#fcf1d7]">
        
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-[#781040] mb-2">
          Iniciar Sesión
        </h1>

        <p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
          Accede a tu cuenta
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="text-sm font-medium">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="ejemplo@correo.com"
              onChange={handleChange}
              value={formData.email}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e52421] transition"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="********"
              onChange={handleChange}
              value={formData.password}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e52421] transition"
            />
          </div>

          <div className="text-right">
            <a href="#" className="text-sm text-[#781040] hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-[#e52421] hover:bg-[#c81e1b] text-white p-3 rounded-lg font-semibold border-2 border-[#fcf1d7] transition"
          >
            Entrar
          </button>

          <p className="text-center text-sm text-gray-600">
            ¿No tienes cuenta?{" "}
            <a href="/register" className="text-[#781040] font-medium hover:underline">
              Regístrate
            </a>
          </p>

        </form>
      </div>
    </div>
  );
};

export default Login;