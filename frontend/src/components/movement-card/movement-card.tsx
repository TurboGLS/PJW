import Icon from "@mdi/react";
import type { Movements } from "../../entities/movements.entity";
import s from "./movement-card.module.scss";
import { mdiInformationSymbol } from "@mdi/js";
import { useState } from "react";
import MovementDialog from "../movement-dialog/movement-dialog";

interface MovementCardProps {
  movement: Movements;
}

const MovementCard = ({ movement }: MovementCardProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const dataParse = new Date(movement.data);
  const dataParseToString = dataParse.toLocaleDateString("it-IT");

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <div className={s["main-container"]}>
      <div className={s["wrap"]}>
        <div className={s["desc"]}>{movement.descrizioneEstesa}</div>
        <div className={s["importo"]}>{movement.importo}$</div>
        <div className={s["data"]}>Data: {dataParseToString}</div>
      </div>
      <div onClick={handleOpenDialog}>
        <Icon
          path={mdiInformationSymbol}
          size={1.5}
          className={s["dots-icon"]}
        />
      </div>

      {isDialogOpen && (
        <MovementDialog movement={movement} onClose={handleCloseDialog} />
      )}
    </div>
  );
};

export default MovementCard;
