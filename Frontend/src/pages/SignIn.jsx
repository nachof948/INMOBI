import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signin } from '../redux/actions/auth'
import { Loading } from '../components/Loading'
import { useNavigate } from 'react-router-dom'
import iniciarSesion from '../assets/Iniciar Sesion.jpg'
import { OAuth } from '../components/OAuth'

const SignIn = () => {
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({})
  const navegar = useNavigate()
  
  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(signin(formData))
    setFormData({})
    navegar('/')
  }

  return(
    <section className="p-3 max-w-[80rem] mx-auto flex items-center gap-10 mt-10"> 
    <img src={iniciarSesion} alt="Casa" className='w-[37rem] h-[37rem] rounded-lg' />
    <div>
        <h1 className="text-5xl text-center font-semibold mt-7 mb-12">
          Iniciar Sesion
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-10 ">
          <input type="text" placeholder="Email" className="border p-3 bg-slate-800 placeholder:text-white rounded-lg w-[25rem]" name="email" onChange={handleChange} />
          <input type="text" placeholder="Contraseña" className="border p-3 bg-slate-800 placeholder:text-white rounded-lg w-[25rem]" name="password" onChange={handleChange} />
          {isLoading ? 
          <Loading />
          : <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90">Iniciar Sesion</button>}
          <OAuth />
        </form>
        {error && <p>{error.message}</p>}
        <div className='flex items-center gap-3 mt-3'>
          <p>No tienes una cuenta?</p>
          <Link to={'/sign-up'}>
            <span className='text-blue-800'>Registrate</span>
          </Link>
        </div>
      </div>
    </section>
  )
}

export { SignIn }