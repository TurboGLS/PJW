import { authAxiosInstance } from "../lib/axios";

class MovementService {
  async fetchLimitedMovements() {
    const response = await authAxiosInstance.get(
      "/api/movimentoConto/limited?limit=5"
    );
    return response;
  }
}

const movementService = new MovementService();
export default movementService;
