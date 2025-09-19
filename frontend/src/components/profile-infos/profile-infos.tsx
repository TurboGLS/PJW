import { useNavigate } from "react-router";
import type { User } from "../../entities/user.entity";
import authService from "../../services/auth.service";
import Icon from '@mdi/react';
import { mdiLogout } from '@mdi/js';
import s from "./profile-infos.module.scss"

interface ProfileInfosProps {
  user: User;
}

const ProfileInfos = ({ user }: ProfileInfosProps) => {
  const navigate = useNavigate();
  
  const logout = async (event: React.MouseEvent) => {
    event.stopPropagation();
    authService.logout();
    navigate("/login");
  };
  
  return (
    <div className={s["user-container"]}>
      <div className={s["username-container"]}>
        <img src="https://cdn-icons-png.freepik.com/256/12225/12225881.png?semt=ais_white_label"/>
        <label>{user.firstName} {user.lastName}</label>
        <div className={s["logout-container"]} onClick={logout}>
          <Icon path={mdiLogout} className={s["logout-button"]} size={1} />
        </div>
      </div>
    </div>
  );
};

export default ProfileInfos;
