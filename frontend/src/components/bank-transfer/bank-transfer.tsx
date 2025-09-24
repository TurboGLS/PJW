import { useState } from "react";
import s from "./bank-transfer.module.scss";
import movementService from "../../services/movements.service";
import { useNavigate } from "react-router";

const BankTransfer = () => {
  const [importo, setImporto] = useState<number>(0);
  const [ibanDestinatario, setIbanDestinatario] = useState<string>("");
  const [causale, setCausale] = useState<string>("");
  const navigate = useNavigate();

  const sendWireTransfer = async (e: any) => {
    e.preventDefault();
    try {
      const transfer = await movementService.sendWireTransfer(
        importo,
        ibanDestinatario,
        causale
      );
      console.log(transfer);
      navigate("/homepage");
    } catch (e: any) {
      alert(e.response.data.message.tostring());
    }
  };

  return (
    <div className={s["main-container"]}>
      <div className={s["title"]}>Invia bonifico</div>
      <div className={s["form-container"]}>
        <div>Invia bonifico</div>
        <form className={s["form"]}>
          <input type="number" name="Import" placeholder='Importo' min={0} />
          <input type="text" name="Cause" placeholder='Causale' />
          <input type="text" name="IBAN" placeholder='IBAN' />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
};

export default BankTransfer;
