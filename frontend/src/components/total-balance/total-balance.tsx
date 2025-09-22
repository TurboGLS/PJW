import type { BalanceMovements } from "../../entities/balance-movements";
import s from "./total-balance.module.scss";

interface TotalBalanceProps {
  totalBalance: BalanceMovements;
}

const TotalBalance = ({ totalBalance }: TotalBalanceProps) => {
  return (
    <div className={s["main-container"]}>
      <div className={s["main-container__message"]}>
        <h4> SALDO </h4>
      </div>
      <div className={s["main-container__balance"]}>
        <h2>{totalBalance.lastSaldo.saldo}$</h2>
      </div>
    </div>
  );
};

export default TotalBalance;
