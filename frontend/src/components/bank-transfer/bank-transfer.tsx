import { useState } from "react";
import s from "./bank-transfer.module.scss";
import movementService from "../../services/movements.service";
import { useNavigate } from "react-router";

const BankTransfer = () => {
  const [importo, setImporto] = useState<number>(0);
  const [ibanDestinatario, setIbanDestinatario] = useState<string>("");
  const [causale, setCausale] = useState<string>("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const sendWireTransfer = async (e: any) => {
    e.preventDefault();
    try {
      await movementService.sendWireTransfer(
        importo,
        ibanDestinatario,
        causale
      );
      navigate("/homepage");
    } catch (e: any) {
      setError(e.response.data.message)
    }
  };

  return (
    <div className={s["main-container"]}>
      <div className={s["title"]}>Invia bonifico</div>
      <div className={s["form-container"]}>
        <form className={s["form"]} onSubmit={sendWireTransfer}>
          <label>Importo</label>
          <input
            type="number"
            name="Import"
            placeholder="Importo"
            min={0}
            onChange={(e) => setImporto(Number(e.target.value))}
          />
          <label>Causale</label>
          <input
            type="text"
            placeholder="Causale"
            onChange={(e) => setCausale(e.target.value)}
          />
          <label>IBAN Destinatario</label>
          <input
            type="text"
            name="IBAN"
            placeholder="IBAN"
            onChange={(e) => setIbanDestinatario(e.target.value)}
          />
          {error ? <p className={s["error-msg"]}>{ error }</p> : null}
          <input type="submit" value="Submit" className={s["submit-button"]} />
        </form>
      </div>
    </div>
  );
};

export default BankTransfer;
