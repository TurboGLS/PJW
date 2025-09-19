import { useEffect, useState } from "react";
import ProfileInfos from "../profile-infos/profile-infos";
import s from "./sidebar.module.scss";
import authService from "../../services/auth.service";
import type { User } from "../../entities/user.entity";
import { useNavigate } from "react-router";

const Sidebar = () => {
  const [user, setUser] = useState<User | null>();
  const navigate = useNavigate();

  const fetchUser = async () => {
    const response = await authService.fetchUser();
    setUser(response);
    return response;
  };

  const logout = async () => {
    authService.logout();
    navigate("/login");
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return;
  }

  return (
    <div className={s["main-container"]}>
      <div className={s["page-button"]}>Bonifico</div>
      <div className={s["page-button"]}>Ricarica Telefonica</div>
      <ProfileInfos user={user}></ProfileInfos>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Sidebar;
