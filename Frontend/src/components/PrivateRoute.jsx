import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

const PrivateRoute = () => {
  const {user} = useSelector((state) => state.auth)
  
  return (user?.result ? <Outlet /> : <Navigate to={'/sign-in'} />)
}

export { PrivateRoute }