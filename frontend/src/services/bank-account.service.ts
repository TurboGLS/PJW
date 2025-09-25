import { authAxiosInstance } from "../lib/axios";

class BankAccountService {
  async fetchBankAccountInfo() {
    const response = authAxiosInstance.get(
      "https://left-tallou-itsmariovolpato-ffbe3dd4.koyeb.app/api/contoCorrente/myInfoConto"
    );
    return response;
  }
}

const bankAccountService = new BankAccountService();
export default bankAccountService;
