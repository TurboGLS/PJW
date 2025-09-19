import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Homepage from "./components/homepage/Homepage";
import "./App.scss";
import AuthGuard from "./utils/auth.guard";
import { AuthProvider } from "./contexts/auth.context";
import IsLoggedGuard from "./utils/isLogged.guard";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <Navigate to="/homepage" replace />,
      },
      {
        path: "/login",
        element: (
          <IsLoggedGuard>
            <Login />
          </IsLoggedGuard>
        ),
      },
      {
        path: "/register",
        element: (
          <IsLoggedGuard>
            <Register />
          </IsLoggedGuard>
        ),
      },
      {
        path: "/homepage",
        element: (
          <AuthGuard>
            <Homepage />
          </AuthGuard>
        ),
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
