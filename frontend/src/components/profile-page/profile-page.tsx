import { useEffect, useState } from "react";
import bankAccountService from "../../services/bank-account.service";
import BankAccountInfos from "../bank-account-infos/bank-account-infos";
import type { BankAccount } from "../../entities/bank-account";

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
    <>
      <BankAccountInfos bankaccountInfos={userInfo} />
    </>
  );
};

export default ProfilePage;
