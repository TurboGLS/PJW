import { useState } from "react";
import profileService from "../../services/profile.service";

const ModifyPasswords = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const modifyPassword = async (e: any) => {
    e.preventDefault();
    try {
      const response = await profileService.changePassword(
        oldPassword,
        newPassword
      );
      setSuccessMessage(response.data.message);
      alert(successMessage);
    } catch (e: any) {
      setError(e.response.data.message);
      alert(error);
    }
  };

  return (
    <div>
      <form onSubmit={modifyPassword}>
        <input
          placeholder="Vecchia Password"
          onChange={(e) => setOldPassword(e.target.value)}
        ></input>
        <input
          placeholder="Nuova Password"
          onChange={(e) => setNewPassword(e.target.value)}
        ></input>
        <button type="submit" onSubmit={modifyPassword}>
          Modifica
        </button>
      </form>
    </div>
  );
};

export default ModifyPasswords;
