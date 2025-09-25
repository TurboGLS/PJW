import { useEffect, useState } from "react";
import phoneSrv from "../../services/phone.service";
import s from "./phone-recharge.module.scss";
import PhoneInput, {
  isValidPhoneNumber,
  type Value,
} from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
import type { PhoneOperator } from "../../entities/phone-operator.entity";
import { useNavigate } from "react-router";

const PhoneRecharge = () => {
  const [importo, setImporto] = useState<number>(0);
  const [numeroTelefono, setNumeroTelefono] = useState<Value | undefined>();
  const [error, setError] = useState<String>("");
  const [operators, setOperators] = useState<PhoneOperator[]>();
  const navigate = useNavigate();

  const getAllOperators = async () => {
    try {
      const ops = await phoneSrv.getPhoneOperators();
      setOperators(ops.data);
      return ops;
    } catch(e: any) {
      setError(e.response.data.message);
      return null;
    }
  };

  const phoneRecharge = async (e: any) => {
    e.preventDefault();
    try {
      await phoneSrv.phoneRecharge(importo, numeroTelefono);
      navigate("/homepage");
    } catch (e: any) {
      setError(e.response.data.message);
    }
  };

  useEffect(() => {
    getAllOperators();
  }, []);

  if (!operators) {
    return;
  }
  return (
    <div className={s["main-container"]}>
      <div className={s["title"]}>Ricarica Telefonica</div>
      <div className={s["form-container"]}>
        <form onSubmit={phoneRecharge} className={s["form"]}>
          <label>Operatore</label>
          <select>
            {operators.map((operator, index) => (
              <option key={index} value={operator.name}>
                {operator.name}
              </option>
            ))}
          </select>
          <label>Importo</label>
          <select onChange={(e) => setImporto(Number(e.target.value))}>
            <option hidden disabled selected value="def">Seleziona importo</option>
            <option value="20">20</option>
            <option value="15">15</option>
            <option value="10">10</option>
            <option value="5">5</option>
          </select>
          <label>Numero di telefono</label>
          <PhoneInput
            international
            country="IT"
            defaultCountry="IT"
            placeholder="Numero di telefono"
            value={numeroTelefono}
            onChange={setNumeroTelefono}
            error={
              numeroTelefono
                ? isValidPhoneNumber(numeroTelefono)
                  ? undefined
                  : "Invalid phone number"
                : "Phone number required"
            }
          />
          {error && <p className={s["error-msg"]}>{error}</p>} 
          <button type="submit" className={s["submit-button"]}>Ricarica</button>
        </form>
      </div>
    </div>
  );
};

export default PhoneRecharge;
