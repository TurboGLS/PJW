import { authAxiosInstance } from "../lib/axios";

class PhoneService {
  async phoneRecharge(importo: number, numeroTelefono: string) {
    try {
      const pRecharge = authAxiosInstance.post(
        "/api/movimentoConto/ricarica-telefono",
        { importo, numeroTelefono }
      );
      return pRecharge;
    } catch (e: any) {
      console.log(
        "There was an error at pRecharge in PhoneService " + e.error.message
      );
      return e;
    }
  }
}

const phoneSrv = new PhoneService();
export default phoneSrv;
