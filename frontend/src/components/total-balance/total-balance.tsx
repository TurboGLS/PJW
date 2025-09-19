import type { BalanceMovements } from "../../entities/balance-movements";

interface TotalBalanceProps {
  totalBalance: BalanceMovements;
}

const TotalBalance = ({ totalBalance }: TotalBalanceProps) => {
  return (
    <div>{totalBalance.movimenti.map((movimento) => movimento.saldo)}</div>
  );
};

export default TotalBalance;
