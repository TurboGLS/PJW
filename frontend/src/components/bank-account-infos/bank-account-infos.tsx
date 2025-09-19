import type { BankAccount } from "../../entities/bank-account";

import s from "./bank-account-infos.module.scss";

interface BankAccountInfosProps {
  bankaccountInfos: BankAccount;
}

const BankAccountInfos = ({ bankaccountInfos }: BankAccountInfosProps) => {
  return (
    <div className={s["main-container"]}>
      <div>{bankaccountInfos.nomeTitolare}</div>
      <div>{bankaccountInfos.cognomeTitolare}</div>
      <div>{bankaccountInfos.email}</div>
      <div>{bankaccountInfos.iban}</div>
    </div>
  );
};

export default BankAccountInfos;
