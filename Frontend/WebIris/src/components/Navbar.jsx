import { NavLink, useNavigate } from 'react-router-dom'
import {assets} from '../assets/assets'
import { useState, useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'

export const Navbar = () => {

    const navigate = useNavigate();
    const { authStatus, signOut, infoUser, verifyToken } = useContext(UserContext);

    const [showMenu, setShowMenu] = useState(false);

    const [userName, setUserName] = useState("No conectado");
    
    useEffect(() => {
        const getInfoUser = async() => {
            await verifyToken()
            setUserName(infoUser);
        }
        getInfoUser()
        
    } , [userName])

    const handleLogout = (e) => {
        e.preventDefault();
        signOut();
        navigate('/');
    }
   
    console.log("infoUser: ", infoUser);
  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'>
        <div className='flex items-center gap-2 cursor-pointer'>
            <img className='w-20' src="https://i.imgur.com/Y35q3Tf.png" alt="Logo"/>
            <h3 className='text-lg font-bold'>Comunicadora/Psicóloga/Mg. Ética</h3>
        </div>
        <ul className='hidden md:flex items-center gap-5 font-medium'>
            <NavLink to="/">
                <li className='py-1'>Home</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to="/about">
                <li className='py-1'>Servicios</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to="/contact">
                <li className='py-1'>Contacto</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            <NavLink to="/booking">
                <li className='py-1'>Reserva</li>
                <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
            </NavLink>
            {   userName?.roles?.includes('admin') && authStatus && (
                        <NavLink to="/ADMIN">
                            <li className='py-1'>Gestion</li>
                            <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                        </NavLink>
                    )
            }
        </ul>
        <div className='flex items-center gap-4'>
            {
                authStatus 
                ? <div className='flex items-center gap-2 cursor-pointer group relative'>
                    <img className='w-8 rounded-full' src={assets.profile_pic} alt="Profile" onClick={() => setShowMenu(!showMenu)}/>
                    <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown" onClick={() => setShowMenu(!showMenu)}/>
                    <div className='absolute top-0 right-0 pt-18 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                        <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                            <p onClick={() => navigate('/my-profile')} className='hover:text-black cursor-pointer'>My Profile</p>
                            <p onClick={() => navigate('/my-appointments')} className='hover:text-black cursor-pointer'>My Appointments</p>
                            <p onClick={handleLogout} className='hover:text-black cursor-pointer'>Logout</p>
                        </div>
                    </div>
                </div> 
                : <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block cursor-pointer'>Sign In</button>
            }
        </div>
    </div>
  )
}
