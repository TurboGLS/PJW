import { authAxiosInstance } from "../lib/axios";

class BankAccountService {
  async fetchBankAccountInfo() {
    const response = authAxiosInstance.get("api/contoCorrente/myInfoConto");
    return response;
  }
}

const bankAccountService = new BankAccountService();
export default bankAccountService;
