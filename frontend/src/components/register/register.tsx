import s from "./register.module.scss";
import BankLogo from "../../assets/intesa-mario-volpato-trasparent.png";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router";
import { useState } from "react";

const register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<String>("");
  const [surname, setSurname] = useState<String>("");
  const [username, setUsername] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [repeatedPassword, setRepeatedPassword] = useState<String>("");
  const [error, setError] = useState<String>("");

  const redirectToLogin = () => {
    navigate("/login");
  };

  const register = async (e: any) => {
    e.preventDefault();
    try {
      const user = await authService.register(
        name,
        surname,
        username,
        password
      );
      navigate("/login");
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };

  return (
    <div className={s["main-container"]}>
      <div className={s["main-container__register-container"]}>
        <div className={s["main-container__register-container-left"]}>
          <div className={s["main-container__register-container-infos"]}>
            <h1>Sign-Up</h1>
            <div className={s["register-button"]} onClick={redirectToLogin}>
              Already a client? Click here!
              <hr></hr>
            </div>
          </div>
          <form
            className={s["main-container__register-container-form"]}
            onSubmit={register}
          >
            <input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Surname"
              onChange={(e) => setSurname(e.target.value)}
            />
            <input
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              placeholder="Repeat Password"
              onChange={(e) => setRepeatedPassword(e.target.value)}
            />
            {password !== repeatedPassword ? (
              <>
                <p>Passwords are not the same</p>
                <button type="submit" disabled>
                  Sign In
                </button>
              </>
            ) : (
              <button type="submit" onSubmit={register}>
                Sign In
              </button>
            )}
            {error ? <p>{error}</p> : null}
          </form>
        </div>
        <div className={s["main-container__register-container-right"]}>
          <img src={BankLogo}></img>
        </div>
      </div>
    </div>
  );
};

export default register;
