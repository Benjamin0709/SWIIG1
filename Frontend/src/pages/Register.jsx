import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, email, password })
      });

      const data = await res.json();

      if (res.ok) {
        setMsg("Usuario registrado correctamente");

        // redirigir al login
        setTimeout(() => {
          navigate("/login");
        }, 1200);

      } else {
        setMsg(" X " + data.msg);
      }

    } catch (error) {
      console.log(error);
      setMsg("Error de conexión");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      
      <form 
        onSubmit={handleRegister} 
        className="bg-gray-800 text-white p-8 rounded-2xl shadow-2xl w-80"
      >
        
        <h2 className="text-2xl font-bold mb-6 text-center">
          Crear Cuenta
        </h2>

        {/* NOMBRE */}
        <input
          type="text"
          placeholder="Nombre completo"
          className="w-full mb-4 p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-gray-400"
          onChange={(e) => setNombre(e.target.value)}
        />

        {/* EMAIL */}
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full mb-4 p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-gray-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-4 p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-gray-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* MENSAJE */}
        {msg && (
          <p className="text-sm text-center mb-3">
            {msg}
          </p>
        )}

        {/* BOTÓN */}
        <button className="w-full bg-gray-600 hover:bg-gray-500 transition duration-300 py-2 rounded font-semibold">
          Registrarse
        </button>

        {/* LINK LOGIN */}
        <p className="text-center text-sm mt-4 text-gray-400">
          ¿Ya tienes cuenta?{" "}
          <span 
            className="text-gray-300 hover:underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Inicia sesión
          </span>
        </p>

      </form>
    </div>
  );
};

export default Register;

