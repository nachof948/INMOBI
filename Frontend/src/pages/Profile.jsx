import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { LOGOUT } from '../constants'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navegar = useNavigate()

  const logout = () =>{
    dispatch({type: LOGOUT})
    navegar('/')
  }

  return(
    <section className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Perfil</h1>
      <form className='flex flex-col gap-4'>
        <img src={user?.result?.imageProfile} alt={user?.result?.username} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 '  />
        <input type="text" placeholder='Nombre de usuario'
          className='border p-3 rounded-lg'
          name='username'
          value={user?.result?.username}
        />
        <input type="text" placeholder='Email'
          className='border p-3 rounded-lg'
          name='email'
          value={user?.result?.email}
        />
        <input type="password" placeholder='Email'
          className='border p-3 rounded-lg'
          name='password'
          value={user?.result?.password}
        />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95'>Actualizar</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Eliminar mi cuenta</span>
        <span className='text-red-700 cursor-pointer' onClick={logout}>Cerrar Sesión</span>
      </div>
    </section>
  )
}

export { Profile }