import './App.css'
import Dashboard from './pages/Dashboard'
import { createBrowserRouter,  RouterProvider } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import YoutubeContent from './pages/YoutubeContent'
import TwitterContent from './pages/TwitterContent'
import { PublicRoute, PrivateRoute } from './lib/route'

function App() {
  const router = createBrowserRouter([
    {
      element: <PublicRoute />,
      children: [
        { path: '/sign-in', element: <SignIn />},
        { path: '/sign-up', element: <SignUp />}
      ]
    },
    {
      element: <PrivateRoute />,
      children: [
        { path: '/', element: <Dashboard /> },
        { path: '/youtube-content', element: <YoutubeContent /> },
        { path: '/twitter-content', element: <TwitterContent /> },
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
