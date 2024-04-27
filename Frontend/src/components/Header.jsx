import { FaSearch } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LOGO from '../assets/Logo.jpg'

const Header = () => {
  const { user } = useSelector((state) => state.auth)


  return(
    <header className="bg-slate-800 shadow-sm">
      <div className="flex justify-between items-center max-w-[100rem] mx-auto p-3">
        <Link to='/' className='flex items-center gap-3'>
          <img src={LOGO} alt="Logo de la empresa" className='w-20 h-20 rounded-full' />
          <span className='text-5xl text-blue-300'>INMOBI</span>
        </Link>
        <form className="border p-3 rounded-lg flex items-center">
          <input 
            type="text" 
            placeholder="Busca tu casa ideal..."
            className="bg-transparent outline-none w-24 md:w-80 sm:w-40 text-white placeholder:text-white "
          />
          <FaSearch className='text-slate-300 cursor-pointer'/>
        </form>
        <nav className='flex items-center gap-12 text-blue-400 font-semibold text-md md:text-lg'>
          <Link className='hidden sm:inline transition-all duration-200 hover:text-slate-50' to="/">Inicio</Link>
          <Link className='hidden sm:inline transition-all duration-200 hover:text-slate-50' to="/sobre-nosotros">Sobre Nosotros</Link>
          
          <Link className='transition-all duration-200 hover:text-slate-50' to="/profile">
          {user?.result ? (<img src={user.result.imageProfile} className='w-12 rounded-full cursor-pointer'/>) : 
            (<li className='list-none'>
                Iniciar Sesión
            </li>)}
          </Link>
        </nav>
      </div>
    </header>
  )
}

export { Header }