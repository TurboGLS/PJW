import { authAxiosInstance } from "../lib/axios";

class BalanceService {
  async fetchCurrentBalance() {
    const response = await authAxiosInstance.get(
      "https://left-tallou-itsmariovolpato-ffbe3dd4.koyeb.app/api/movimentoConto/limited",
      {
        params: { limit: 5 },
      }
    );
    return response;
  }
}

const balanceService = new BalanceService();
export default balanceService;
