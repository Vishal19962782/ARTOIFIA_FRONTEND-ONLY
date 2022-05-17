import { Outlet,Navigate } from 'react-router-dom'

function protectedRoutes({isLogged}) {
    // isLogged = true
  return !isLogged?<Outlet/>:<Navigate to="/"/>
}

export default protectedRoutes

