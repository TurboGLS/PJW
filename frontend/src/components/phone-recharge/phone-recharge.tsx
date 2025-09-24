import { useEffect, useState } from "react";
import phoneSrv from "../../services/phone.service";
import PhoneInput, {
  isValidPhoneNumber,
  type Value,
} from "react-phone-number-input/input";
import "react-phone-number-input/style.css";
import type { PhoneOperator } from "../../entities/phone-operator.entity";

const PhoneRecharge = () => {
  const [importo, setImporto] = useState<number>(0);
  const [numeroTelefono, setNumeroTelefono] = useState<Value | undefined>();
  const [error, setError] = useState<String>("");
  const [operators, setOperators] = useState<PhoneOperator[]>();

  const getAllOperators = async () => {
    const ops = await phoneSrv.getPhoneOperators();
    setOperators(ops.data);
    return ops;
  };

  const phoneRecharge = async (e: any) => {
    e.preventDefault();
    try {
      const phone = await phoneSrv.phoneRecharge(importo, numeroTelefono);
      console.log(phone);
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
    <form onSubmit={phoneRecharge}>
      <select>
        {operators.map((operator, index) => (
          <option key={index} value={operator.name}>
            {operator.name}
          </option>
        ))}
      </select>
      <select onChange={(e) => setImporto(Number(e.target.value))}>
        <option value="default">Seleziona importo</option>
        <option value="20">20</option>
        <option value="15">15</option>
        <option value="10">10</option>
        <option value="5">5</option>
      </select>
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
      <button type="submit">Ricarica</button>
      {error && <p>{error}</p>} 
    </form>
  );
};

export default PhoneRecharge;
