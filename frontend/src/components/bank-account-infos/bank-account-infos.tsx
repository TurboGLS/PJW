import type { BankAccount } from "../../entities/bank-account";

import s from "./bank-account-infos.module.scss";

interface BankAccountInfosProps {
  bankaccountInfos: BankAccount;
  logout: () => void;
}

const BankAccountInfos = ({ bankaccountInfos, logout }: BankAccountInfosProps) => {
  const date = bankaccountInfos.dataApertura.toString().slice(0, 10);

  return (
    <div className={s["main-container"]}>
      <img className={s["profile-picture"]} src="https://cdn-icons-png.freepik.com/256/12225/12225881.png?semt=ais_white_label"/>
      <div className={s["profile-container"]}>
        <div>
          <div>
            <div className={s["label-title"]}>Nome Titolare</div>
            <label className={s["val"]}>{bankaccountInfos.nomeTitolare} {bankaccountInfos.cognomeTitolare}</label>
          </div>
        </div>
        <div>
          <div className={s["label-title"]}>Email</div>
          <label className={s["val"]}>{bankaccountInfos.email}</label>
        </div>
        <div>
          <div className={s["label-title"]}>Data Creazione Account</div>
          <label className={s["val"]}>{date}</label>
        </div>
        <div>
          <div className={s["label-title"]}>IBAN</div>
          <div className={s["iban"]}>
            <label className={s["val"]}>{bankaccountInfos.iban}</label>
            <button onClick={() => navigator.clipboard.writeText(bankaccountInfos.iban)}>Copia</button>
          </div>
        </div>
        <div className={s["logout-container"]}>
          <button onClick={logout} className={s["logout-button"]}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default BankAccountInfos;
