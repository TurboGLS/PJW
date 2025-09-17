import { movimentoConto } from './movimentoConto.entity';
import { movimentoContoModel } from './movimentoConto.model';
import { contoCorrenteModel } from '../contoCorrente/contoCorrente.model'; // Importa il modello ContoCorrente
import { CategoryModel } from '../category/category.model'; // Importa il modello Category

export class MovimentoContoService {


    //  DA RIVEDERE 
    async createMovimentoConto(movimentoData: Omit<movimentoConto, '_id'>): Promise<movimentoConto> {
        try {
            // 1. Verifica l'esistenza del ContoCorrenteID
            const existingContoCorrente = await contoCorrenteModel.findById(movimentoData.contoCorrenteID);
            if (!existingContoCorrente) {
                throw new Error(`ContoCorrente con ID ${movimentoData.contoCorrenteID} non trovato.`);
            }

            // 2. Verifica l'esistenza del CategoriaMovimentoID
            const existingCategory = await CategoryModel.findById(movimentoData.categoriaMovimentoID);
            if (!existingCategory) {
                throw new Error(`CategoriaMovimento con ID ${movimentoData.categoriaMovimentoID} non trovata.`);
            }

            // Se entrambi esistono, procedi con la creazione del movimento
            const newMovimento = await movimentoContoModel.create(movimentoData);
            return newMovimento;

        } catch (error) {
            console.error("Errore durante la creazione del movimento conto:", error);
            throw error; 
        }
    }

    async getMovimentoContoById(id: string): Promise<movimentoConto | null> {
        try {
            const movimento = await movimentoContoModel.findById(id)
                                                      .populate('contoCorrenteID')
                                                      .populate('categoriaMovimentoID')
                                                      .lean();
            return movimento;
        } catch (error: any) {
            console.error(`Errore durante il recupero del movimento conto con ID ${id}:`, error.message);
            throw new Error(`Impossibile recuperare il movimento conto con ID ${id}: ${error.message}`);
        }
    }

    async getAllMovimentiConto(): Promise<movimentoConto[]> {
        try {
            const movimenti = await movimentoContoModel.find({})
                                                      .populate('contoCorrenteID')
                                                      .populate('categoriaMovimentoID')
                                                      .sort({ data: -1 }) // <--- Qui ordini per data in ordine decrescente
                                                      .lean();
            return movimenti;
        } catch (error: any) {
            console.error("Errore durante il recupero di tutti i movimenti conto:", error.message);
            throw new Error(`Impossibile recuperare tutti i movimenti conto: ${error.message}`);
        }
    }

    async getLimitedMovimentiConto(limit: number): Promise<movimentoConto[]> {
        try {
            // Assicurati che il limite sia un numero positivo
            if (limit <= 0) {
                throw new Error("Il limite deve essere un numero positivo.");
            }

            const movimenti = await movimentoContoModel.find({})
                                                      .populate('contoCorrenteID')
                                                      .populate('categoriaMovimentoID')
                                                      .sort({ data: -1 }) // Ordine decrescente per data (più recenti per primi)
                                                      .limit(limit)       // <--- Qui applichiamo il limite
                                                      .lean();
            return movimenti;
        } catch (error: any) {
            console.error(`Errore durante il recupero di ${limit} movimenti conto:`, error.message);
            throw new Error(`Impossibile recuperare i movimenti conto limitati: ${error.message}`);
        }
    }

    async getMovimentiByCategoria(categoriaId: string): Promise<movimentoConto[]> {
        try {
            const movimenti = await movimentoContoModel.find({ categoriaMovimentoID: categoriaId }) // <--- Filtra per categoriaMovimentoID
                                                      .populate('contoCorrenteID')
                                                      .populate('categoriaMovimentoID')
                                                      .sort({ data: -1 }) // Ordine decrescente per data (più recenti per primi)
                                                      .lean();
            return movimenti;
        } catch (error: any) {
            console.error(`Errore durante il recupero dei movimenti per categoria ${categoriaId}:`, error.message);
            throw new Error(`Impossibile recuperare i movimenti per categoria: ${error.message}`);
        }
    }
}