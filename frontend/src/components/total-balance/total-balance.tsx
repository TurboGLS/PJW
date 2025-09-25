import type { BalanceMovements } from "../../entities/balance-movements";
import s from "./total-balance.module.scss";
import type { BankAccount } from "../../entities/bank-account";

interface TotalBalanceProps {
  totalBalance: BalanceMovements;
  bankAccount: BankAccount;
}

const TotalBalance = ({ totalBalance, bankAccount }: TotalBalanceProps) => {
  return (
    <div className={s["profile-area"]}>
      <div className={s["profile-name"]}>Benvenuto, <label>{bankAccount.nomeTitolare} {bankAccount.cognomeTitolare}</label></div>
      <div className={s["profile-money"]}>${totalBalance.lastSaldo.saldo}</div>
    </div>
  );
};

export default TotalBalance;
