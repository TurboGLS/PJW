import { useEffect, useState } from "react";
import ProfileInfos from "../profile-infos/profile-infos";
import s from "./sidebar.module.scss";
import authService from "../../services/auth.service";
import type { User } from "../../entities/user.entity";

const Sidebar = () => {
  const [user, setUser] = useState<User | null>();

  const fetchUser = async () => {
    const response = await authService.fetchUser();
    setUser(response);
    return response;
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return;
  }

  return (
    <div className={s["main-container"]}>
      <div>Bonifico</div>
      <div>Ricarica Telefonica</div>
      <ProfileInfos user={user}></ProfileInfos>
    </div>
  );
};

export default Sidebar;
