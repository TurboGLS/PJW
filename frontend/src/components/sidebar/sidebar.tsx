import { useEffect, useState } from "react";
import ProfileInfos from "../profile-infos/profile-infos";
import s from "./sidebar.module.scss";
import authService from "../../services/auth.service";
import type { User } from "../../entities/user.entity";
import logo from "../../assets/intesa-mario-volpato-trasparent.png"
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';
import { mdiBank } from '@mdi/js';
import { mdiCellphoneArrowDownVariant } from '@mdi/js';
import { mdiCashMultiple } from '@mdi/js';
import { useNavigate } from "react-router";

const Sidebar = () => {
  const [user, setUser] = useState<User | null>();
  const [collapsed, setCollapsed] = useState(false);
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

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  }

  return (
    <div className={`${s["main-container"]} ${collapsed ? s["collapsed"] : ""}`}>
      <div className={s["logo-container"]}>
        <div onClick={toggleSidebar}><Icon path={mdiMenu} size={1} /></div>
        <img className={s["logo"]} src={logo} />
      </div>
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
      { 
        !collapsed ? 
          <div className={s["user-area"]} onClick={redirectToProfile}>
            <ProfileInfos user={user}></ProfileInfos>
          </div>
        :
          <img onClick={redirectToProfile} src="https://cdn-icons-png.freepik.com/256/12225/12225881.png?semt=ais_white_label"/>
      }
    </div>
  );
};

export default Sidebar;
