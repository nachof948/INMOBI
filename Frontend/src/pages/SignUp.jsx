import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signup } from '../redux/actions/auth'
import { Loading } from '../components/Loading'
import { useNavigate } from 'react-router-dom'
import REGISTRARSE from '../assets/Registrarse.jpg'
import { OAuth } from '../components/OAuth'

const SignUp = () => {
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector((state) => state.auth)
  const [formData, setFormData] = useState({})
  const navegar = useNavigate()
  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  
  const handleSubmit = (e) =>{
    e.preventDefault();
    dispatch(signup(formData))
    setFormData({})
    navegar('/')
  }

  return(
    <section className="p-3 max-w-[80rem] mx-auto flex items-center gap-10 mt-10"> 
    <img src={REGISTRARSE} alt="Casa" className='w-[36rem] rounded-lg' />
    <div>
      <h1 className="text-5xl text-center font-semibold mt-7 mb-12">
        Registrarse
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-10 ">
        <input type="text" placeholder="Nombre de Usuario" className="border p-3 bg-slate-800 text-white placeholder:text-white rounded-lg w-[25rem]" name="username" onChange={handleChange} />
        <input type="text" placeholder="Email" className="border p-3 rounded-lg bg-slate-800 text-white placeholder:text-white w-[25rem]" name="email" onChange={handleChange} />
        <input type="text" placeholder="Contraseña" className="border p-3 rounded-lg bg-slate-800 text-white placeholder:text-white w-[25rem]" name="password" onChange={handleChange} />
        {isLoading ? 
        <Loading />
        : <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-90">Registrarse</button>}
        <OAuth />
      </form>
      {error && <p>{error.message}</p>}
      <div className='flex items-center gap-3 mt-3'>
        <p>Tienes una cuenta?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-800'>Iniciar Sesion</span>
        </Link>
      </div>
    </div>
      
    </section>
  )
}

export { SignUp }