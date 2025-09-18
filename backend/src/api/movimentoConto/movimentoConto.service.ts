import { movimentoConto } from './movimentoConto.entity';
import { movimentoContoModel } from './movimentoConto.model';
import { contoCorrenteModel } from '../contoCorrente/contoCorrente.model'; // Importa il modello ContoCorrente
import { CategoryModel } from '../category/category.model'; // Importa il modello Category
import mongoose from 'mongoose';

export class MovimentoContoService {


    //  da gestire in base a che tipo di movimento volgio eseguire 
    async createMovimentoConto(movimentoData: movimentoConto): Promise<movimentoConto> {
        try {
            // 1. Verifica l'esistenza del ContoCorrenteID
            const existingContoCorrente = await contoCorrenteModel.findById(movimentoData.contoCorrenteID);

            if (!existingContoCorrente) {
                throw new Error(`ContoCorrente con ID ${movimentoData.contoCorrenteID} non trovato.`);
            }

            // 2. Verifica l'esistenza del CategoriaMovimentoID
            const category = await CategoryModel.findById(movimentoData.categoriaMovimentoID);
            if (!category) {
                throw new Error(`CategoriaMovimento con ID ${movimentoData.categoriaMovimentoID} non trovata.`);
            }
            
            const categoryName = category.categoryName;
            const categoryType = category.categoryType;

            // Usa l'ID del conto corrente come stringa per la ricerca dell'ultima operazione
            const movContoLastOp = await this.getLastOperationByContoId(movimentoData.contoCorrenteID);

            // Apertura conto come uscita
            if (categoryName === "Apertura Conto" && categoryType === "Uscita") {
                
            }

            // Bonifico ricevuto
            if (categoryName === "Bonifico" && categoryType === "Entrata") {

            }

            // Bonifico inviato
            if (categoryName === "Bonifico" && categoryType === "Uscita") {

            }

            // Prelievo contanti come uscita
            if (categoryName === "Prelievo Contanti" && categoryType === "Uscita") {

            }
            
            // Pagamento utenze come uscita
            if (categoryName === "Pagamento Utenze" && categoryType === "Uscita") {

            }
            
            // Ricarica effettuata
            if (categoryName === "Ricarica" && categoryType === "Uscita") {

            }

            // Versamento bancomat come entrata
            if (categoryName === "Versamento Bancomat" && categoryType === "Entrata") {

            }

            // Se entrambi esistono, procedi con la creazione del movimento
            const newMovimento = await movimentoContoModel.create(movimentoData);
            return newMovimento;

        } catch (error) {
            console.error("Errore durante la creazione del movimento conto:", error);
            throw error;
        }
    }

    // trova informazioni per un movimento id
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

    // prende tutti i movimenti del conto
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

    // trova le operazioni limitate dal numero inserito
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

    // Questo trova tutti i movimenti in base alla categoria
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

    // trova l'ultimo movimento di un certo conto corrente
    async getLastOperationByContoId(contoCorrenteId: mongoose.ObjectId): Promise<movimentoConto | null> {
        try {
            if (!contoCorrenteId) {
                throw new Error("È necessario fornire un contoCorrenteId valido.");
            }

            const ultimaOperazione = await movimentoContoModel.findOne({ contoCorrenteID: contoCorrenteId })
                .populate('contoCorrenteID')
                .populate('categoriaMovimentoID')
                .sort({ data: -1 }) // prendi il più recente
                .lean();

            return ultimaOperazione;
        } catch (error: any) {
            console.error(`Errore durante il recupero dell'ultima operazione per contoCorrenteId ${contoCorrenteId}:`, error.message);
            throw new Error(`Impossibile recuperare l'ultima operazione: ${error.message}`);
        }
    }

}