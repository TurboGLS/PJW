import { useEffect, useState } from "react";
import ProfileInfos from "../profile-infos/profile-infos";
import s from "./sidebar.module.scss";
import authService from "../../services/auth.service";
import type { User } from "../../entities/user.entity";
import logo from "../../assets/intesa-mario-volpato-trasparent.png"
import Icon from '@mdi/react';
import { mdiBank } from '@mdi/js';
import { mdiCellphoneArrowDownVariant } from '@mdi/js';
import { mdiCashMultiple } from '@mdi/js';
import { useNavigate } from "react-router";

const Sidebar = () => {
  const [user, setUser] = useState<User | null>();
  const navigate = useNavigate();

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

  const redirectToProfile = () => {
    navigate("/profile");
  }

  return (
    <div className={s["main-container"]}>
      <img className={s["logo"]} src={logo} />
      <div className={s["page-button"]}>
        <Icon path={mdiBank} size={1} />
        <label>Bonifico</label>
      </div>
      <div className={s["page-button"]}>
        <Icon path={mdiCellphoneArrowDownVariant} size={1} />
        <label>Ricarica Telefonica</label>
      </div>
      <div className={s["page-button"]}>
        <Icon path={mdiCashMultiple} size={1} />
        <label>Saldo</label>
      </div>
      <div className={s["user-area"]} onClick={redirectToProfile}>
        <ProfileInfos user={user}></ProfileInfos>
      </div>
    </div>
  );
};

export default Sidebar;
