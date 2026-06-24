import { Navigate, Outlet } from "react-router-dom";

export const PublicRoute = () => {
  const isLoggedIn = !!localStorage.getItem("token")
  return !isLoggedIn ? <Outlet /> : <Navigate to='/' />
}

export const PrivateRoute = () => {
  const isLoggedIn = !!localStorage.getItem("token")
  return isLoggedIn ? <Outlet /> : <Navigate to='/sign-in' />
}