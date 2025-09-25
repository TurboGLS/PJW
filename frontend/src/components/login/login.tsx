import s from "./login.module.scss";
import logo from "../../assets/intesa-mario-volpato-trasparent.png";
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/auth.context";
import loaderGif from "../../assets/1474.gif";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isloading, setLoading] = useState(false);
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
      setLoading(true);
      await login(username, password);
      navigate("/homepage");
    } catch (e: any) {
      setLoading(false);
      setError(e.response.data.message);
    }
  };

  return (
    <div>
       {isloading ? (
        <div className={s["loader"]}>
          <img src={loaderGif}></img>
        </div>
      ) : null}
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
              <input
                className={s["login-button"]}
                type="submit"
                value="Login"
              />
            </form>
          </div>
          <img className={s["image"]} src={logo} alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default Login;
