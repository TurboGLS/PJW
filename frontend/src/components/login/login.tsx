import s from './login.module.scss'
import logo from '../../assets/intesa-mario-volpato-trasparent.png'
import { useNavigate } from 'react-router'


const login = () => {
  const navigate = useNavigate()
  
  const redirectToRegister = () => {
    navigate("/register")
  }

  return (
    <div className={s["main-container"]}>
      <div className={s["login-container"]}>
        <div className={s["login-area"]}>
          <div className={s["main-title"]}>
            Login
          </div>
          <div className={s["register-button"]} onClick={redirectToRegister}>
            If you don't have an account, Click here
            <hr></hr>
          </div>
          <form className={s["form-container"]}>
            <input className={s["form-button"]} type="email" name="Email" placeholder='Email' />
            <input className={s["form-button"]} type="password" name="Password" placeholder='Password' />
            <input className={s["login-button"]} type="submit" value="Login" />
          </form>
        </div>
        <img className={s["image"]} src={logo} alt="Logo"></img>
      </div>
    </div>
  )
}

export default login
