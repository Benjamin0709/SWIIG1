const Carousel = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between">

      {/* Texto */}
      <div className="max-w-xl">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          Tu bienestar emocional importa
        </h2>

        <p className="text-gray-60 mb-6">
          Acompañamos tu crecimiento personal con herramientas de coaching y apoyo psicológico profesional.
        </p>

        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-600 transition">
          Comenzar
        </button>
      </div>

      {/* Imagen */}
      <img 
        src="https://i.imgur.com/MDMV1GN.png" 
        alt="hero"
        className="w-80 mt-8 md:mt-0"
      />

    </div>
  );
};

export default Carousel;


