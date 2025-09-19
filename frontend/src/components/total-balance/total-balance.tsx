import type { BalanceMovements } from "../../entities/balance-movements";
import s from "./total-balance.module.scss";
import Icon from "@mdi/react";
import { mdiScaleBalance } from "@mdi/js";

interface TotalBalanceProps {
  totalBalance: BalanceMovements;
}

const TotalBalance = ({ totalBalance }: TotalBalanceProps) => {
  return (
    <div className={s["main-container"]}>
      <div className={s["main-container__message"]}>
        <h3> SALDO TOTALE </h3>
        <Icon path={mdiScaleBalance} size={1} />
      </div>
      <div className={s["main-container__balance"]}>
        <p>{totalBalance.movimenti.map((movimento) => movimento.saldo)}$</p>
      </div>
    </div>
  );
};

export default TotalBalance;
