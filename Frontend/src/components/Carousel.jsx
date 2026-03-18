import { useEffect, useState } from "react";

const cursos = [
  "Gestión del Estrés",
  "Inteligencia Emocional",
  "Coaching Personal",
  "Marketing Digital"
];

const Carousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % cursos.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 text-white py-16 text-center">
      
      <h2 className="text-3xl font-bold mb-8">
        Cursos más solicitados
      </h2>

      <div className="flex justify-center">
        <div className="bg-gray-700 px-12 py-8 rounded-2xl shadow-xl transition-all duration-500">
          <h3 className="text-xl">{cursos[index]}</h3>
        </div>
      </div>

    </div>
  );
};

export default Carousel;

