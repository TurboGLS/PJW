import { useEffect, useState } from "react";
import UserService from "../../services/user.service";
import ProfileInfos from "../profile-infos/profile-infos";
import s from "./sidebar.module.scss";

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const userSrv = new UserService();

  const fetchUser = async () => {
    try {
      const user = await userSrv.user();
      setUser(user.data);
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [user]);

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
