import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Services from "../components/Services";
import Carousel from "../components/Carousel";

const Home = () => {

  const [user] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });

  return (
    <div className="bg-[#fffdf0] min-h-screen flex flex-col">

      {/* NAVBAR */}
      <Navbar user={user} />

      {/* CONTENIDO */}
      <main className="grow">

        {/* CAROUSEL */}
        <section className="bg-[#781040] py-10 px-6 md:px-10">
          <Carousel />
        </section>

        {/* SERVICES */}
        <section className="bg-[#fcf1d7] py-16 px-6 md:px-10">
          
          <h2 className="text-3xl font-bold text-center text-[#781040] mb-10">
            Nuestros Servicios
          </h2>

          <Services />
        </section>

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default Home;
