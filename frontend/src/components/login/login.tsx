import s from "./login.module.scss";
import logo from "../../assets/intesa-mario-volpato-trasparent.png";
import { useNavigate } from "react-router";
import UserService from "../../services/userService";
import { useState } from "react";

const login = () => {
  const userService = new UserService();

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const redirectToRegister = () => {
    navigate("/register");
  };

  const login = async (e: any) => {
    e.preventDefault();
    try {
      const user = await userService.login(username, password);
      console.log(user);
      // TODO : Login
    } catch (e: any) {
      setError(e.response.data.message);
      // TODO : Error notification
    }
  };

  return (
    <div className={s["main-container"]}>
      <div className={s["login-container"]}>
        <div className={s["login-area"]}>
          <div className={s["main-title"]}>Login</div>
          <div className={s["register-button"]} onClick={redirectToRegister}>
            If you don't have an account, Click here
            <hr></hr>
          </div>
          <form onSubmit={login} className={s["form-container"]}>
            <input
              className={s["form-button"]}
              type="email"
              name="Email"
              placeholder="Email"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              className={s["form-button"]}
              type="password"
              name="Password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input className={s["login-button"]} type="submit" value="Login" />
          </form>
        </div>
        <img className={s["image"]} src={logo} alt="Logo"></img>
      </div>
    </div>
  );
};

export default login;
