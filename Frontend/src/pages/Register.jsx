import { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    nombre: "",
    rut: "",
    email: "",
    telefono: "",
    password: ""
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const validar = () => {
    const { nombre, rut, email, telefono, password } = form;

    const nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/;
    const rutRegex = /^\d{7,8}-[0-9kK]{1}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^\+56\s9\s\d{4}\s\d{4}$/;

    if (!nombreRegex.test(nombre)) {
      return "Nombre inválido (solo letras)";
    }

    if (!rutRegex.test(rut)) {
      return "RUT inválido (ej: 21799825-5)";
    }

    if (!emailRegex.test(email)) {
      return "Correo inválido";
    }

    if (!telefonoRegex.test(telefono)) {
      return "Teléfono inválido (+56 9 1234 5678)";
    }

    if (password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    const error = validar();
    if (error) {
      setMsg(error);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        setMsg("Usuario registrado correctamente");
        setForm({
          nombre: "",
          rut: "",
          email: "",
          telefono: "",
          password: ""
        });
      } else {
        setMsg(data.msg || "Error al registrar");
      }

    } catch (error) {
      console.log(error);
      setMsg("Error de conexión");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#fffdf0]">

      <form
        onSubmit={handleSubmit}
        className="bg-[#fcf1d7] p-8 rounded-2xl shadow-xl w-96 border border-[#e52421]/20"
      >

        <h2 className="text-2xl font-bold mb-6 text-center text-[#781040]">
          Crear Cuenta
        </h2>

        <input
          type="text"
          name="nombre"
          placeholder="Nombre completo"
          value={form.nombre}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e52421]"
        />

        <input
          type="text"
          name="rut"
          placeholder="RUT (21799825-5)"
          value={form.rut}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e52421]"
        />

        <input
          type="email"
          name="email"
          placeholder="Correo"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e52421]"
        />

        <input
          type="text"
          name="telefono"
          placeholder="+56 9 1234 5678"
          value={form.telefono}
          onChange={handleChange}
          className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e52421]"
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e52421]"
        />

        {msg && (
          <p className={`text-sm text-center mb-3 ${
            msg === "Usuario registrado correctamente"
              ? "text-green-500"
              : "text-red-500"
          }`}>
            {msg}
          </p>
        )}

        <button className="w-full bg-[#781040] hover:bg-[#5a0c30] text-white py-2 rounded-lg transition duration-300">
          Registrarse
        </button>

        {/* VOLVER A LOGIN */}
        <p className="text-sm text-center mt-4 text-gray-600">
          ¿Ya tienes cuenta?{" "}
          <a href="/login" className="text-[#e52421] font-semibold hover:underline">
            Inicia sesión
          </a>
        </p>

      </form>
    </div>
  );
};

export default Register;
