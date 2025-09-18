import s from './login.module.scss'
import logo from '../../assets/intesa-mario-volpato-trasparent.png'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { useAuth } from '../../contexts/auth.context'

const login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const { login } = useAuth()
  
  const redirectToRegister = () => {
    navigate("/register");
  };

  const handleLogin = async (e: any) => {
    e.preventDefault()
    try {
      await login(username, password)
      navigate("/homepage")
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
          <form onSubmit={handleLogin} className={s["form-container"]}>
            <input className={s["form-button"]} type="email" name="Email" placeholder='Email' onChange={(e) => setUsername(e.target.value)} />
            <input className={s["form-button"]} type="password" name="Password" placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
            <input className={s["login-button"]} type="submit" value="Login" />
          </form>
        </div>
        <img className={s["image"]} src={logo} alt="Logo"></img>
      </div>
    </div>
  );
};

export default login;
