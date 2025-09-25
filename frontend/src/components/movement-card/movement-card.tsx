import Icon from "@mdi/react";
import type { Movements } from "../../entities/movements.entity";
import s from "./movement-card.module.scss";
import { mdiDotsVertical } from '@mdi/js';

interface MovementCardProps {
  movement: Movements;
}

const MovementCard = ({ movement }: MovementCardProps) => {
  const dataParse = new Date(movement.data);
  const dataParseToString = dataParse.toLocaleDateString("it-IT");
  return (
    <div className={s["main-container"]}>
      <div className={s["wrap"]}>
        <div className={s["desc"]}>{movement.descrizioneEstesa}</div>
        <div className={s["importo"]}>{movement.importo}$</div>
        <div className={s["data"]}>Data: {dataParseToString}</div>
      </div>
      <Icon path={mdiDotsVertical} size={1} className={s["dots-icon"]} />
    </div>
  );
};

export default MovementCard;
