import { useState, useEffect } from "react";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.pexels.com/photos/7699530/pexels-photo-7699530.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "Cuidamos tu bienestar",
      description: "Atención psicológica profesional"
    },
    {
      image: "https://images.pexels.com/photos/4101143/pexels-photo-4101143.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "Coaching personalizado",
      description: "Desarrolla tu mejor versión"
    },
    {
      image: "https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg?auto=compress&cs=tinysrgb&w=1200",
      title: "Sesiones online",
      description: "Atención desde cualquier lugar"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="bg-[#fffdf0] min-h-screen">

      {/* CAROUSEL */}
      <div className="flex justify-center mt-6 md:mt-10 px-4">
        <div className="w-full md:w-[90%] lg:w-[80%] max-w-6xl rounded-xl overflow-hidden shadow-xl relative">

          <div
            className="flex transition-transform duration-700"
            style={{
              transform: `translateX(-${currentSlide * 100}%)`
            }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className="min-w-full h-56 sm:h-72 md:h-96 relative"
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-white text-center p-4 md:p-6">
                  <h1 className="text-lg sm:text-xl md:text-3xl font-bold mb-2">
                    {slide.title}
                  </h1>

                  <p className="text-sm md:text-base">
                    {slide.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* INDICADORES */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, i) => (
              <div
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-3 h-3 rounded-full cursor-pointer transition ${
                  i === currentSlide ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* INFO */}
      <section className="py-10 md:py-16 px-4 md:px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-10 items-center">
        
        {/*RESPONSIVE PENDIENTE DE LA IMAGEN */}

        <img
          src="https://i.imgur.com/MDMV1GN.png"
          alt="Iris especialista"
          loading="lazy"
          className="rounded-xl shadow-lg w-full h-20 sm:h-20 md:h-132 object-cover"
        />

        <div>
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-[#781040]">
            Sobre Iris
          </h2>

          <p className="text-gray-600 mb-4 text-sm md:text-base">
            Iris es una profesional dedicada al bienestar emocional, ofreciendo
            acompañamiento cercano y personalizado en cada proceso.
            Su enfoque combina herramientas modernas con una atención humana
            que prioriza tu crecimiento personal.
          </p>

          <ul className="space-y-2 text-gray-700 text-sm md:text-base">
            <li>✔ Atención personalizada</li>
            <li>✔ Enfoque profesional y humano</li>
            <li>✔ Sesiones online y presenciales</li>
            <li>✔ Acompañamiento continuo</li>
          </ul>
        </div>
      </section>

      {/* BOTONES */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 pb-12 md:pb-16 px-4">
        
        <button className="w-full sm:w-auto bg-[#781040] text-white px-6 py-2 rounded hover:opacity-90 transition">
          Servicios
        </button>

        <button className="w-full sm:w-auto bg-[#781040] text-white px-6 py-2 rounded hover:opacity-90 transition">
          Especialistas
        </button>

        <button className="w-full sm:w-auto bg-[#5a0c30] text-white px-6 py-2 rounded hover:opacity-90 transition font-semibold">
          Agendar cita
        </button>

      </div>

    </div>
  );
};

export default Home;
