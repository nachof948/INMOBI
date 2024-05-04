
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import LOGO from '../assets/Logo.jpg'

import { SearchInput } from './SearchInput'

const Header = () => {
  const { user } = useSelector((state) => state.auth)


  return(
    <header className="bg-slate-800 shadow-sm">
      <div className="flex justify-between items-center max-w-[100rem] mx-auto p-3">
        <Link to='/' className='flex items-center gap-3'>
          <img src={LOGO} alt="Logo de la empresa" className='w-20 h-20 rounded-full' />
          <span className='text-5xl text-blue-300'>INMOBI</span>
        </Link>
        <SearchInput />
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