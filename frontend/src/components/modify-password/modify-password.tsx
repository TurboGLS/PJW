import { useState } from "react";
import profileService from "../../services/profile.service";
import s from "./modify-password.module.scss"

const ModifyPasswords = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [response, setResponse] = useState("");

  const modifyPassword = async (e: any) => {
    e.preventDefault();
    try {
      const response = await profileService.changePassword(
        oldPassword,
        newPassword
      );
      setResponse(response.data.message);
    } catch (e: any) {
      setResponse(e.response.data.message);
    }
  };

  return (
    <div className={s["main-container"]}>
      <div className={s["title"]}>Modifica Password</div>
      <form onSubmit={modifyPassword} className={s["form"]}>
        <label>Vecchia Password</label>
        <input
          placeholder="Vecchia Password"
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <label>Nuova Password</label>
        <input
          placeholder="Nuova Password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        { response ? <p className={s["response-msg"]}>{ response }</p> : null }
        <button type="submit" onSubmit={modifyPassword} className={s["change-password-button"]}>
          Modifica
        </button>
      </form>
    </div>
  );
};

export default ModifyPasswords;
