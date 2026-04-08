import {Route, Routes} from 'react-router-dom'
import Home from './views/Home'
import About from './views/About'
import Contact from './views/Contact'
import Login from './views/Login'
import MyProfile from './views/MyProfile'
import MyAppointments from './views/MyAppointments'
import Booking from './views/Booking'
import { Navbar } from './components/Navbar'
import Footer from './components/Footer'
import Register from './views/Register'
import UserContext from './context/UserContext'
import { useContext } from 'react'
import Error from './views/Error'
import AdminPanel from './views/ADMIN'


const App = () => {
  const { authStatus } = useContext(UserContext);

  return (
    <div className='mx-4 sm:mx-[10%]'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {!authStatus && <Route path="/login" element={<Login />} />}
        {
          authStatus && (<Route path="/my-profile" element={<MyProfile />} />)
        }
        {
          authStatus && (<Route path="/my-appointments" element={<MyAppointments />} />)
        }
        <Route path="/booking" element={<Booking />} />
        {!authStatus && <Route path="/register" element={<Register />} />}
        
        {
          authStatus && <Route path="/MedicalDirector" element={<AdminPanel />} />
        }
        <Route path="*" element={<Error />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
