import { useEffect, useState } from "react";
import bankAccountService from "../../services/bank-account.service";
import BankAccountInfos from "../bank-account-infos/bank-account-infos";
import type { BankAccount } from "../../entities/bank-account";
import ModifyPasswords from "../modify-password/modify-password";
import s from "./profile-page.module.scss";
import authService from "../../services/auth.service";
import { useNavigate } from "react-router";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState<BankAccount | null>();
  const navigate = useNavigate()

  const fetchUserInfo = async () => {
    const user = await bankAccountService.fetchBankAccountInfo();
    setUserInfo(user.data);
    return user;
  };

  const logout = async () => {
    authService.logout();
    navigate("/login");
  }

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return;
  }

  return (
    <div className={s["main-container"]}>
      <div className={s["title"]}>IL TUO PROFILO</div>
      <div className={s["profile-container"]}>
        <div className={s["profile"]}>
          <BankAccountInfos bankaccountInfos={userInfo} logout={logout}/>
          <hr className={s["vertical-line"]} />
          <ModifyPasswords />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
