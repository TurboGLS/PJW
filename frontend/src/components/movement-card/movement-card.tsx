import Icon from "@mdi/react";
import type { Movements } from "../../entities/movements.entity";
import s from "./movement-card.module.scss";
import { mdiBankTransfer } from "@mdi/js";

interface MovementCardProps {
  movement: Movements;
}

const MovementCard = ({ movement }: MovementCardProps) => {
  return (
    <div className={s["main-container"]}>
      <div className={s["main-container__top"]}>
        <Icon path={mdiBankTransfer} size={1} />
      </div>
      <div>{movement.categoriaMovimentoID.categoryName}</div>
      <div>{movement.importo}$</div>
    </div>
  );
};

export default MovementCard;
