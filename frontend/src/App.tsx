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
import Sidebar from "./components/sidebar/sidebar";
import BankTransfer from "./components/bank-transfer/bank-transfer";
import VerifyMail from "./components/verify-mail/verify-mail";

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="main-layout">
    <div className="sidebar">
      <Sidebar />
    </div>
    <div className="content">{children}</div>
  </div>
);

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
        path: `/verify-email`,
        element: <VerifyMail />,
      },
      {
        path: "/homepage",
        element: (
          <AuthGuard>
            <AppLayout>
              <Homepage />
            </AppLayout>
          </AuthGuard>
        ),
      },
      {
        path: "/profile",
        element: (
          <AuthGuard>
            <AppLayout>
              <ProfilePage />
            </AppLayout>
          </AuthGuard>
        ),
      },
      {
        path: "/phone",
        element: (
          <AuthGuard>
            <AppLayout>
              <PhoneRecharge />
            </AppLayout>
          </AuthGuard>
        ),
      },
      {
        path: "/bank-transfer",
        element: (
          <AuthGuard>
            <AppLayout>
              <BankTransfer />
            </AppLayout>
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
