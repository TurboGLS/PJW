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
  
  const logout = async () => {
    authService.logout();
    navigate("/login");
  };
  
  return (
    <div className={s["user-container"]}>
      <div>{user.firstName} {user.lastName}</div>
      <div onClick={logout}>
        <Icon path={mdiLogout} size={1} />
      </div>
    </div>
  );
};

export default ProfileInfos;
