import { authAxiosInstance } from "../lib/axios";

class MovementService {
  async fetchLimitedMovements(limit: number = 5) {
    const response = await authAxiosInstance.get(
      `/api/movimentoConto/limited?limit=${limit}`
    );
    return response;
  }

  async sendWireTransfer(
    importo: number,
    ibanDestinatario: string,
    causale: string
  ) {
    const response = await authAxiosInstance.post(
      "/api/movimentoConto/bonifico-uscita",
      { importo, ibanDestinatario, causale }
    );
    return response;
  }

  async getAllcategories() {
    const response = await authAxiosInstance.get(
      `/api/categoryTypes/allCategory`
    );
    return response;
  }

  async fetchMovementsByCat(limit: number, categoryName: string) {
    const response = await authAxiosInstance.get(
      `/api/movimentoConto/by-categoria?limit=${limit}&categoryName=${categoryName}`
    );
    return response;
  }
}

const movementService = new MovementService();
export default movementService;
