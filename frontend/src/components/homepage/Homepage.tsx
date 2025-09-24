import { useEffect, useState } from "react";
import balanceService from "../../services/balance.service";
import s from "./homepage.module.scss";
import TotalBalance from "../total-balance/total-balance";
import MovementsList from "../movements-list/movements-list";
import movementService from "../../services/movements.service";
import type { Movements } from "../../entities/movements.entity";
import type { BankAccount } from "../../entities/bank-account";
import bankAccountService from "../../services/bank-account.service";
import MovementsFilters from "../movements-filters/movements-filters";

const LIMIT = 5;

const homepage = () => {
  const [balance, setBalance] = useState();
  const [movements, setMovements] = useState<Movements[]>();
  const [user, setUser] = useState<BankAccount | null>();
  const [limit, setLimit] = useState(LIMIT);
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState("");

  const onLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value);
    setLimit(newLimit);
    movementService.fetchLimitedMovements(newLimit).then((response) => {
      setMovements(response.data.movimenti);
    });
  };

  const onCatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  const [selectedName, selectedType] = e.target.value.split("|");
  setCategoryName(selectedName);
  setCategoryType(selectedType);
  movementService
    .fetchMovementsByCat(limit, selectedName, selectedType)
    .then((response) => {
      setMovements(response.data.movimenti);
    });
};

  const fetchUserInfo = async () => {
    const userInfo = await bankAccountService.fetchBankAccountInfo();
    setUser(userInfo.data);
  };
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
    fetchUserInfo();
  }, [TotalBalance, categoryName]);

  if (!movements || !balance || !user) {
    return;
  }

  return (
    <div className={s["main-container"]}>
      <div className={s["main-container__home"]}>
        <div className={s["main-container__home__infos"]}>
          <TotalBalance
            totalBalance={balance}
            bankAccount={user}
          ></TotalBalance>
        </div>
        <MovementsFilters
          movements={movements}
          limit={limit}
          onChange={onLimitChange}
          onCatChange={onCatChange}
          categoryName={categoryName}
          categoryType={categoryType}
        ></MovementsFilters>
        <MovementsList movements={movements}></MovementsList>
      </div>
    </div>
  );
};

export default homepage;
