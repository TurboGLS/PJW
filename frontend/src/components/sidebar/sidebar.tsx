import { useEffect, useState } from "react";
import ProfileInfos from "../profile-infos/profile-infos";
import s from "./sidebar.module.scss";
import authService from "../../services/auth.service";
import type { User } from "../../entities/user.entity";
import logo from "../../assets/intesa-mario-volpato-trasparent.png"
import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';
import { mdiHomeCityOutline } from '@mdi/js';
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

  const redirect = (to: string) => {
    navigate(to);
  }

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  }

  return (
    <div className={`${s["main-container"]} ${collapsed ? s["collapsed"] : ""}`}>
      <div className={s["logo-container"]}>
        <div onClick={toggleSidebar}><Icon path={mdiMenu} size={1} /></div>
        <img className={s["logo"]} src={logo}/>
      </div>
      <div className={s["page-button"]} onClick={() => redirect("/homepage")}>
        <Icon path={mdiHomeCityOutline} size={1} />
        <label>Dashboard</label>
      </div>
      <div className={s["page-button"]} onClick={() => redirect("/bank-transfer")}>
        <Icon path={mdiBank} size={1} />
        <label>Bonifico</label>
      </div>
      <div className={s["page-button"]} onClick={() => redirect("/phone")}>
        <Icon path={mdiCellphoneArrowDownVariant} size={1} />
        <label>Ricarica Telefonica</label>
      </div>
      <div className={s["page-button"]}>
        <Icon path={mdiCashMultiple} size={1} />
        <label>Saldo</label>
      </div>
      { 
        !collapsed ? 
          <div className={s["user-area"]} onClick={() => redirect("/profile")}>
            <ProfileInfos user={user}></ProfileInfos>
          </div>
        :
          <img onClick={() => redirect("/profile")} src="https://cdn-icons-png.freepik.com/256/12225/12225881.png?semt=ais_white_label"/>
      }
    </div>
  );
};

export default Sidebar;
