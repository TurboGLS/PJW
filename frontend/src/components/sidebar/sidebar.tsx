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
      <img className={s["logo"]} src={logo} />
      <div className={s["page-button"]}>
        <Icon path={mdiBank} size={1} />
        Bonifico
      </div>
      <div className={s["page-button"]}>
        <Icon path={mdiCellphoneArrowDownVariant} size={1} />
        Ricarica Telefonica
      </div>
      <div className={s["page-button"]}>
        <Icon path={mdiCashMultiple} size={1} />
        Saldo
      </div>
      <div className={s["user-area"]}>
        <ProfileInfos user={user}></ProfileInfos>
      </div>
    </div>
  );
};

export default Sidebar;
