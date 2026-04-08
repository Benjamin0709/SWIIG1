const Footer = () => {
  return (
    <div className="md:mx-10">
        <div className="flex flex-col sm:grid sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            <div>
                {/* sección de la izquierda */}
                <div className="flex items-center gap-2 mb-2">
                    <img className="w-20 mb-3" src="https://i.imgur.com/Y35q3Tf.png" alt="Logo-Footer"/>
                    <h3 className="text-lg font-semibold">Centro Psicólogico/Couching</h3>
                </div>
                <p className="w-full md:w-2/3 text-gray-600 leading-6">
                Iris Gálvez es una consultora psicológica
                chilena liderada por una psicóloga peruana con
                más de 20 años de experiencia, especializada
                en el desarrollo humano, el buen trato y las
                habilidades blandas. Su propósito es promover
                el bienestar y la empatía en personas y
                organizaciones, entregando capacitaciones y
                experiencias formativas de alto impacto. <br /><br />
                La marca ofrece talleres y capacitaciones
                presenciales y online personalizadas dirigidas
                a empresas, instituciones, comunidades
                migrantes y público general, enfocándose en
                fortalecer la comunicación, la empatía y la
                gestión emocional en los equipos de trabajo y a
                nivel organizacional.</p>
            </div>
                {/* sección del centro */}
            <div>
                <p className="text-xl font-medium mb-5">CENTRO</p>
                <ul className="flex flex-col gap-2 text-gray-600">
                    <li className="cursor-pointer hover:text-black">Home</li>
                    <li className="cursor-pointer hover:text-black">Servicios</li>
                    <li className="cursor-pointer hover:text-black">Contacto</li>
                    <li className="cursor-pointer hover:text-black">Privacy Policy</li>
                </ul>
            </div>
            {/* sección de la derecha */}
            <div>
                <p className="text-xl font-medium mb-5">Contactanos</p> 
                <ul className="flex flex-col gap-2 text-gray-600">
                    <li className="text-gray-600"> Dirección:  Antonio Varas 810, 7500735 Providencia, Región Metropolitana</li>
                    <li className="text-gray-600"> Télefono :  +56 2 1234 5678</li>
                    <li className="text-gray-600"> Correo   :  info@psicologo.cl</li>
                </ul>
            </div>
        </div>
        {/* copyright */}
        <div>
            <hr />
            <p className="py-5 text-sm text-center text-gray-600">© 2026 IrisGalvez. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer