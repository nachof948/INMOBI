import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout } from '../redux/actions/auth'
import { useNavigate } from 'react-router-dom'
import { UploadImage } from '../components/UploadImage'
import { useState } from 'react'
import { userUpdate } from '../redux/actions/user'


const Profile = () => {
  const {user} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navegar = useNavigate()
  const [formData, setFormData] = useState({
    username: user?.result?.username,
    email: user?.result?.email,
    password: user?.result?.password,
    imageProfile: user?.result?.imageProfile,
  })

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.name]: e.target.value})
  }
  
  const handleImageChange = (imageUrl) =>{
    setFormData({...formData, imageProfile: imageUrl})
  }

  const logOut = () =>{
    dispatch(logout())
    navegar('/')
  }

  const handleUpdateUser = (e) =>{
    e.preventDefault()
    dispatch(userUpdate(formData, user?.result?._id))
  }

  return(
    <section className='p-3 max-w-lg mx-auto'>
      <h1 className="text-3xl font-semibold text-center my-7">Perfil</h1>
      <form onSubmit={handleUpdateUser} className='flex flex-col gap-4'>
        <UploadImage onImageChange={handleImageChange} />
        <input type="text" placeholder='Nombre de usuario'
          className="border p-3 bg-slate-800 placeholder:text-white rounded-lg text-lg w-[30.5rem] text-white"
          name='username'
          value={formData.username}
          onChange={handleChange}
        />
        <input type="text" placeholder='Email'
          className="border p-3 bg-slate-800 placeholder:text-white rounded-lg text-lg w-[30.5rem] text-white"
          name='email'
          value={formData.email}
          onChange={handleChange}
        />
        <input type="password" placeholder='Contraseña'
          className="border p-3 bg-slate-800 placeholder:text-white rounded-lg text-lg w-[30.5rem] text-white"
          name='password'
          value={formData.password}
          onChange={handleChange}
        />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95' onClick={handleUpdateUser}>Actualizar</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Eliminar mi cuenta</span>
        <span className='text-red-700 cursor-pointer' onClick={logOut}>Cerrar Sesión</span>
      </div>
    </section>
  )
}

export { Profile }