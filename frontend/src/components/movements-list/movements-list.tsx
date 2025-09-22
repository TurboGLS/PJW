import type { Movements } from "../../entities/movements.entity";
import MovementCard from "../movement-card/movement-card";
import s from "./movements-list.module.scss";

interface MovementsListProps {
  movements: Movements[];
}

const MovementsList = ({ movements }: MovementsListProps) => {
  return (
    <div className={s["main-container"]}>
      {movements.map((movement) => {
        return (
          <MovementCard movement={movement} key={movement._id}></MovementCard>
        );
      })}
    </div>
  );
};

export default MovementsList;
