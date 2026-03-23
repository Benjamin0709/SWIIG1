const Services = () => {
  const servicios = [
    {
      titulo: "Coaching Personal",
      desc: "Desarrolla tu máximo potencial con acompañamiento profesional."
    },
    {
      titulo: "Apoyo Psicológico",
      desc: "Espacio seguro para trabajar emociones y bienestar mental."
    },
    {
      titulo: "Gestión del Estrés",
      desc: "Aprende técnicas efectivas para mejorar tu calidad de vida."
    }
  ];

  return (
    <div id="services" className="text-center">

      <h3 className="text-3xl font-bold text-gray-800 mb-10">
        Nuestros Servicios
      </h3>

      <div className="grid md:grid-cols-3 gap-8">
        {servicios.map((s, i) => (
          <div 
            key={i}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <h4 className="text-xl font-semibold mb-3 text-gray-800">
              {s.titulo}
            </h4>

            <p className="text-gray-600">
              {s.desc}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Services;
