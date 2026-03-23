import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();


  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };


  return (
    <nav className="bg-[#fffdf0] shadow-md px-8 py-4 flex justify-between items-center border-b border-[#e52421]/20">


      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
        <img
          src="https://i.imgur.com/Y35q3Tf.png"
          alt="logo"
          className="w-10"
        />
        <span className="text-xl font-bold text-[#781040]">
          MindCare
        </span>
      </div>


      {/* Links */}
      <div className="hidden md:flex gap-8 font-medium text-[#781040]">
        <a href="/" className="hover:text-[#e52421] transition">Inicio</a>
        <a href="#services" className="hover:text-[#e52421] transition">Servicios</a>
        <a href="#equipo" className="hover:text-[#e52421] transition">Equipo</a>


        {/* SOLO SI ESTÁ LOGEADO */}
        {user && (
          <a href="/dashboard" className="hover:text-[#e52421] transition">
            Dashboard
          </a>
        )}
      </div>


      {/* Usuario */}
      <div className="flex items-center gap-4">


        {user ? (
          <>
            <span className="text-sm text-gray-700">
              {user.nombre}
            </span>


            <button
              onClick={logout}
              className="bg-[#e52421] text-white px-3 py-1 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-[#781040] text-white px-4 py-2 rounded-lg hover:bg-[#5a0c30] transition"
          >
            Ingresar
          </button>
        )}


      </div>


    </nav>
  );
};


export default Navbar;
