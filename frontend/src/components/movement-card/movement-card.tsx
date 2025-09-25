import { mdiDotsHorizontalCircleOutline } from "@mdi/js";
import Icon from "@mdi/react";
import type { Movements } from "../../entities/movements.entity";
import s from "./movement-card.module.scss";

interface MovementCardProps {
  movement: Movements;
}

const MovementCard = ({ movement }: MovementCardProps) => {
  const dataParse = new Date(movement.data);
  const dataParseToString = dataParse.toLocaleDateString("it-IT")
  return (
    <div className={s["main-container"]}>
      <div className={s["main-container__wrap"]}>
        <div>{movement.descrizioneEstesa}</div>
        <div>{movement.importo}$</div>
        <div>Data: {dataParseToString}</div>
      </div>
      <div className={s["main-container__details-button"]}>
        <button>
          <Icon path={mdiDotsHorizontalCircleOutline} size={1} />
        </button>
      </div>
    </div>
  );
};

export default MovementCard;
