import { authAxiosInstance } from "../lib/axios";

class BalanceService {
  async fetchCurrentBalance() {
    const response = await authAxiosInstance.get("api/movimentoConto/limited", {
      params: { limit: 5 },
    });
    return response;
  }
}

const balanceService = new BalanceService();
export default balanceService;
