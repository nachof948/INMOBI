import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import {app} from '../../src/firebase'
import { useDispatch } from 'react-redux'
import { signinGoogle } from '../redux/actions/auth'
import { useNavigate } from 'react-router-dom'

const OAuth = () => {
  const navegar = useNavigate()
  const dispatch = useDispatch()
  const handleGoogleClick = async () =>{
    try{
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app)
        const result = await signInWithPopup(auth, provider)
        const formData = {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL
        }
        dispatch(signinGoogle(formData))
        navegar('/')
      }catch(error){
      console.log('No pudiste conectar con google', error)
    }
  }

  return(
    <button 
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-75">
      Continuar con Google
    </button>
  )
}

export { OAuth }