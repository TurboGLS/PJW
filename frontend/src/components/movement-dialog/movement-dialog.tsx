import { useEffect } from "react";
import type { Movements } from "../../entities/movements.entity";
import s from "./movement-dialog.module.scss";

interface MovementDialogProps {
  movement: Movements;
  onClose: () => void;
}

const MovementDialog = ({ movement, onClose }: MovementDialogProps) => {
  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  let previousBalance: number;
  if (movement.categoriaMovimentoID.categoryType === 'uscita') {
    previousBalance = movement.saldo + movement.importo;
  } else {
    previousBalance = movement.saldo - movement.importo;
  }

  const formattedDate = new Date(movement.data).toLocaleDateString("it-IT", {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const isUscita = movement.categoriaMovimentoID.categoryType === 'uscita';
  
  const formatCurrency = (value: number) => {
    return value.toLocaleString('it-IT', { style: 'currency', currency: 'EUR' });
  };

  return (
    <div className={s["overlay"]} onClick={onClose}>
      <div className={s["dialog-content"]} onClick={handleContentClick}>
        <div className={s["dialog-title"]}>Dettagli Movimento</div>
        <p className={s["description"]}>{movement.descrizioneEstesa}</p>
        <div className={s["details-grid"]}>
          <span>Data</span>
          <span>{formattedDate}</span>
          <span>Importo</span>
          <span className={isUscita ? s.uscita : s.entrata}>
            {isUscita ? `- ${formatCurrency(movement.importo)}` : `+ ${formatCurrency(movement.importo)}`}
          </span>
          <span>Saldo Precedente</span>
          <span>{formatCurrency(previousBalance)}</span>
          <span>Saldo Finale</span>
          <span>{formatCurrency(movement.saldo)}</span>
        </div>
        <div className={s["footer"]}>
          <button onClick={onClose} className={s["close-button"]}>Chiudi</button>
        </div>
      </div>
    </div>
  );
};

export default MovementDialog;