import { useSelector } from "react-redux"




const Home = () => {
  const {user} = useSelector((state) => state.auth)
  return(
    <div>
      {user?.result ? <img src={user.result.imageProfile} alt="" /> : <p>No estoy logueado</p>}
    </div>
  )
}

export { Home }