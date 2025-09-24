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
      <div className={s["title"]}>IL TUO PROFILO</div>
      <div className={s["profile-container"]}>
        <div className={s["profile"]}>
          <BankAccountInfos bankaccountInfos={userInfo} />
          <hr className={s["vertical-line"]} />
          <ModifyPasswords />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
