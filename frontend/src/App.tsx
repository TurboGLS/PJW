import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Login from "./components/login/login";
import Register from "./components/register/register";
import Homepage from "./components/homepage/Homepage";
import "./App.scss";
import AuthGuard from "./utils/auth.guard";
import { AuthProvider } from "./contexts/auth.context";
import IsLoggedGuard from "./utils/isLogged.guard";
import ProfilePage from "./components/profile-page/profile-page";
import PhoneRecharge from "./components/phone-recharge/phone-recharge";

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
      {
        path: "/profile",
        element: (
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        ),
      },
      {
        path: "/phone-top-up",
        element: (
          <AuthGuard>
            <PhoneRecharge />
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
