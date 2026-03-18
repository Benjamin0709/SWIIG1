const services = [
  "Gestión de citas psicológicas",
  "Videos de coaching",
  "Marketing digital",
  "Videos promocionales"
];

const Services = () => {
  return (
    <div className="py-16 px-6 text-center bg-gray-100">
      
      <h2 className="text-3xl font-bold mb-10 text-gray-800">
        Servicios
      </h2>

      <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 transition"
          >
            <p className="text-gray-700 font-medium">{service}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Services;
