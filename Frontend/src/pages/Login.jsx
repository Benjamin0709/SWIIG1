import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");

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
        localStorage.setItem("user", JSON.stringify(data.user))
        setMsg("Login exitoso");
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
        onSubmit={handleLogin} 
        className="bg-gray-800 text-white p-8 rounded-2xl shadow-2xl w-80"
      >
        
        <h2 className="text-2xl font-bold mb-6 text-center">
          Iniciar Sesión
        </h2>

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
          Ingresar
        </button>

      </form>
    </div>
  );
};

export default Login;


