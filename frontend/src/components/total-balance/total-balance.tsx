import type { BalanceMovements } from "../../entities/balance-movements";
import s from "./total-balance.module.scss";
import sun from "../../assets/sun-fill.svg";

interface TotalBalanceProps {
  totalBalance: BalanceMovements;
}

const TotalBalance = ({ totalBalance }: TotalBalanceProps) => {
  return (
    <div className={s["main-container"]}>
      <img src={sun} />
      <div className={s["main-container__balance"]}>
        <h2>{totalBalance.lastSaldo.saldo}$</h2>
      </div>
    </div>
  );
};

export default TotalBalance;
