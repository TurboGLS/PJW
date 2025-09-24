import type { BalanceMovements } from "../../entities/balance-movements";
import s from "./total-balance.module.scss";
import type { BankAccount } from "../../entities/bank-account";

interface TotalBalanceProps {
  totalBalance: BalanceMovements;
  bankAccount: BankAccount;
}

const TotalBalance = ({ totalBalance, bankAccount }: TotalBalanceProps) => {
  return (
    <div className={s["main-container"]}>
      <div className={s["main-container__balance"]}>
        <h3>
          Benvenuto, {bankAccount.nomeTitolare} {bankAccount.cognomeTitolare}
        </h3>
        <h2>{totalBalance.lastSaldo.saldo}$</h2>
      </div>
    </div>
  );
};

export default TotalBalance;
