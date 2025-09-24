import { authAxiosInstance } from "../lib/axios";

class MovementService {
  async fetchLimitedMovements() {
    const response = await authAxiosInstance.get(
      "/api/movimentoConto/limited?limit=5"
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
}

const movementService = new MovementService();
export default movementService;
