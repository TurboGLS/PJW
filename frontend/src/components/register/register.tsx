import s from "./register.module.scss";
import BankLogo from "../../assets/banklogo.jpeg";

const register = () => {
  return (
    <div className={s["main-container"]}>
      <div className={s["main-container__register-container"]}>
        <div className={s["main-container__register-container-left"]}>
          <div className={s["main-container__register-container-infos"]}>
            <h1>Sign-Up</h1>
            <div className={s["register-button"]}>
              Sei già registrato? Registrati
              <hr></hr>
            </div>
          </div>
          <div className={s["main-container__register-container-form"]}>
            <input placeholder="Nome" />
            <input placeholder="Cognome" />
            <input placeholder="Email" />
            <input placeholder="Password" />
            <input placeholder="Ripeti Password" />
            <button>Registrati</button>
          </div>
        </div>
        <div className={s["main-container__register-container-right"]}>
          <img src={BankLogo}></img>
        </div>
      </div>
    </div>
  );
};

export default register;
