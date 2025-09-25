import { authAxiosInstance } from "../lib/axios";
import { type Value } from "react-phone-number-input/input";

class PhoneService {
  async phoneRecharge(importo: number, numeroTelefono: Value | undefined) {
    try {
      const pRecharge = authAxiosInstance.post(
        "https://left-tallou-itsmariovolpato-ffbe3dd4.koyeb.app/api/movimentoConto/ricarica-telefono",
        { importo, numeroTelefono }
      );
      return pRecharge;
    } catch (e: any) {
      return e;
    }
  }

  async getPhoneOperators() {
    try {
      const operators = authAxiosInstance.get(
        "https://left-tallou-itsmariovolpato-ffbe3dd4.koyeb.app/api/phoneOperators/allOperators"
      );
      return operators;
    } catch (e: any) {
      return e;
    }
  }
}

const phoneSrv = new PhoneService();
export default phoneSrv;
