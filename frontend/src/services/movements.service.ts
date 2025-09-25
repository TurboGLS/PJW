import { AxiosError } from "axios";
import { authAxiosInstance } from "../lib/axios";
import type { Movements } from "../entities/movements.entity";

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

  async fetchMovementsByCat(
    limit: number,
    categoryName: string,
    categoryType: string
  ): Promise<{ data: Movements[]; error: string | null }> {
    try {
      const response = await authAxiosInstance.get(
        `/api/movimentoConto/by-categoria?limit=${limit}&categoryName=${categoryName}&categoryType=${categoryType}`
      );
      return { data: response.data, error: null };
    } catch (error) {
      if (error && error instanceof AxiosError && error.status === 404) {
        console.log(error);
        return { data: [], error: error.response?.data?.message };
      }
      throw error;
    }
  }

  async fetchMovementsByDates(
    limit: number,
    dataInizio: Date,
    dataFine: Date
  ): Promise<{ data: Movements[]; error: string | null }> {
    const dateFromString = dataInizio.toISOString();
    const dateToString = dataFine.toISOString();
    const params = new URLSearchParams({
      limit: limit.toString(),
      dataInizio: dateFromString,
      dataFine: dateToString,
    });

    try {
      const response = await authAxiosInstance.get(
        `/api/movimentoConto/movimenti-between-dates?${params.toString()}`
      );
      return { data: response.data, error: null };
    } catch (error) {
      if (error && error instanceof AxiosError && error.status === 404) {
        console.log(error);
        return { data: [], error: error.response?.data?.message };
      }
      throw error;
    }
  }
}

const movementService = new MovementService();
export default movementService;
