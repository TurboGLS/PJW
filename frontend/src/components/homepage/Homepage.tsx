import { useEffect, useState } from "react";
import balanceService from "../../services/balance.service";
import Sidebar from "../sidebar/sidebar";
import s from "./homepage.module.scss";
import TotalBalance from "../total-balance/total-balance";

const homepage = () => {
  const [balance, setBalance] = useState();
  const fetchTotalBalance = async () => {
    const response = await balanceService.fetchCurrentBalance();
    setBalance(response.data);
    return response;
  };
  useEffect(() => {
    fetchTotalBalance();
  }, [TotalBalance]);

  if (!balance) {
    return;
  }
  return (
    <div className={s["main-container"]}>
      <div className={s["main-container__sidebar-container"]}>
        <Sidebar />
      </div>
      <div className={s["main-container__home"]}>
        <div>Benvenuto/a!</div>
      </div>
      <TotalBalance totalBalance={balance}></TotalBalance>
    </div>
  );
};

export default homepage;
