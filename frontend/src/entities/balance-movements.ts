import type { Movements } from "./movements.entity";

export type BalanceMovements = {
  movimenti: Movements[];
  lastSaldo: {
    saldo: number;
  };
};
