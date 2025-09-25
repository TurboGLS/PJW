import s from "./login.module.scss";
import logo from "../../assets/intesa-mario-volpato-trasparent.png";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/auth.context";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  useEffect(() => {
    if (username || password) {
      const timer = setTimeout(() => {
        setUsername("");
        setPassword("");
        setError("");
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, [username, password]);

  const redirectToRegister = () => {
    navigate("/register");
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/homepage");
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };

  return (
    <div className={s["main-container"]}>
      <div className={s["login-container"]}>
        <div className={s["login-area"]}>
          <div className={s["main-title"]}>Login</div>
          <div className={s["register-button"]} onClick={redirectToRegister}>
            If you don't have an account, Click here
            <hr />
          </div>
          <form onSubmit={handleLogin} className={s["form-container"]}>
            <input
              className={s["form-button"]}
              type="email"
              name="Email"
              placeholder="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className={s["form-button"]}
              type="password"
              name="Password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error ? <p>{error}</p> : null}
            <input className={s["login-button"]} type="submit" value="Login" />
          </form>
        </div>
        <img className={s["image"]} src={logo} alt="Logo" />
      </div>
    </div>
  );
};

export default Login;
