const Error = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#F5F7FA] text-center px-4">

      {/* 404 */}
      <h1 className="text-8xl sm:text-9xl font-bold text-orange-500 mb-4 drop-shadow-md">
        404
      </h1>

      {/* Título */}
      <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-2">
        Página no encontrada
      </h2>

      {/* Mensaje */}
      <p className="text-gray-600 max-w-md mb-8 text-sm sm:text-base">
        A veces los equipos también se pierden pero siempre hay forma de retomar la ruta.
      </p>

      {/* Botón */}
      <a
        href="/"
        className="bg-[#004AAD] text-white px-6 py-2 rounded-lg hover:bg-[#00337A] transition duration-200"
      >
        Volver al inicio
      </a>

    </div>
  );
};

export default Error;