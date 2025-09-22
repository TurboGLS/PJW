import { useEffect, useState } from "react";
import balanceService from "../../services/balance.service";
import Sidebar from "../sidebar/sidebar";
import s from "./homepage.module.scss";
import TotalBalance from "../total-balance/total-balance";
import MovementsList from "../movements-list/movements-list";
import movementService from "../../services/movements.service";
import type { Movements } from "../../entities/movements.entity";

const homepage = () => {
  const [balance, setBalance] = useState();
  const [movements, setMovements] = useState<Movements[]>();
  const fetchTotalBalance = async () => {
    const response = await balanceService.fetchCurrentBalance();
    setBalance(response.data);
    return response;
  };
  const fetchMovements = async () => {
    const response = await movementService.fetchLimitedMovements();
    setMovements(response.data.movimenti);
    console.log(movements);
  };
  useEffect(() => {
    fetchTotalBalance();
    fetchMovements();
  }, [TotalBalance]);

  if (!balance) {
    return;
  }
  if (!movements) {
    return;
  }
  return (
    <div className={s["main-container"]}>
      <div className={s["main-container__sidebar-container"]}>
        <Sidebar />
      </div>

      <div className={s["main-container__home"]}>
        <div className={s["main-container__home__infos"]}>
          <TotalBalance totalBalance={balance}></TotalBalance>
        </div>

        <MovementsList movements={movements}></MovementsList>
      </div>
    </div>
  );
};

export default homepage;
