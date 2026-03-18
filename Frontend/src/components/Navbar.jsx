import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user");
      return storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : null;
    } catch {
      return null;
    }
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between items-center shadow-lg">
      
      {/* LOGO */}
      <h1 
        className="text-xl font-bold cursor-pointer hover:text-gray-300 transition"
        onClick={() => navigate("/")}
      >
        CitasApp
      </h1>

      {/* MENU */}
      <div className="flex items-center gap-6">

        <Link to="/" className="hover:text-gray-300 transition">
          Inicio
        </Link>

        {!user ? (
          <>
            <Link to="/login" className="hover:text-gray-300 transition">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-300 transition">
              Registro
            </Link>
          </>
        ) : (
          <>
            <span className="text-gray-300 font-medium">
              Hola, {user.nombre}
            </span>

            <button
              onClick={handleLogout}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-1 rounded-lg transition"
            >
              Cerrar sesión
            </button>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
