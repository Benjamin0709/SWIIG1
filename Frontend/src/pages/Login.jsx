import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

    if (!email || !password) {
      setMsg("Todos los campos son obligatorios");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setUser(data.user);
        setMsg("Login exitoso");

        setTimeout(() => navigate("/"), 1000);

      } else {
        setMsg(data.msg || "Error al iniciar sesión");
      }

    } catch (error) {
      console.log(error);
      setMsg("Error de conexión");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#fffdf0]">
      <form
        onSubmit={handleLogin}
        className="bg-[#fcf1d7] p-8 rounded-2xl shadow-xl w-80 border border-[#e52421]/20"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-[#781040]">
          Iniciar Sesión
        </h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#e52421]"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-4 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#e52421]"
          onChange={(e) => setPassword(e.target.value)}
        />

        {msg && (
          <p className={`text-sm text-center mb-3 ${
            msg === "Login exitoso" ? "text-green-500" : "text-red-500"
          }`}>
            {msg}
          </p>
        )}

        <button
          disabled={loading}
          className="w-full bg-[#781040] hover:bg-[#5a0c30] text-white py-2 rounded-lg"
        >
          {loading ? "Cargando..." : "Ingresar"}
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          ¿No tienes cuenta?{" "}
          <a href="/register" className="text-[#e52421] font-semibold hover:underline">
            Regístrate
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;

