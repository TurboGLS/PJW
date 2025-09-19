import { useEffect, useState } from "react";
import bankAccountService from "../../services/bank-account.service";
import BankAccountInfos from "../bank-account-infos/bank-account-infos";
import type { BankAccount } from "../../entities/bank-account";
import ModifyPasswords from "../modify-password/modify-password";
import s from "./profile-page.module.scss";

const ProfilePage = () => {
  const [userInfo, setUserInfo] = useState<BankAccount | null>();

  const fetchUserInfo = async () => {
    const user = await bankAccountService.fetchBankAccountInfo();
    setUserInfo(user.data);
    return user;
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return;
  }
  return (
    <div className={s["main-container"]}>
      <h1>IL TUO PROFILO</h1>
      <BankAccountInfos bankaccountInfos={userInfo} />
      <ModifyPasswords />
    </div>
  );
};

export default ProfilePage;
