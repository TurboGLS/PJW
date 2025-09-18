import { createBrowserRouter, Navigate, RouterProvider } from 'react-router'
import Login from './components/login/login'
import Register from './components/register/register'
import Homepage from './components/homepage/Homepage'
import "./App.scss"
import AuthGuard from './utils/auth.guard'
import { AuthProvider } from './contexts/auth.context'

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
        path: "/homepage",
        element: (
          <AuthGuard>
            <Homepage />
          </AuthGuard>
        )
      },
    ]
  }
])


function App(){
  return(
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  )
}



export default App