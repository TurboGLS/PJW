import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import Homepage from './components/homepage/homepage'
import Login from './components/login/login'
import Register from './components/register/register'

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Navigate to="/home" replace />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: "/home",
        element: <Homepage />
      },
    ]
  }
])


function App(){
  return(
    <RouterProvider router={router} />
  )
}



export default App