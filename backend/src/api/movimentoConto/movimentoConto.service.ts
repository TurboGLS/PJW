import { movimentoConto } from './movimentoConto.entity';
import { movimentoContoModel } from './movimentoConto.model';
import { contoCorrenteModel } from '../contoCorrente/contoCorrente.model'; // Importa il modello ContoCorrente
import { CategoryModel } from '../category/category.model'; // Importa il modello Category
import mongoose from 'mongoose';
import { Category } from '../category/category.entity';

export class MovimentoContoService {
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

    // trova le operazioni limitate dal numero inserito, FUNZIONA
    async getLimitedMovimentiConto(limit: number, contoCorrenteId: string): Promise<movimentoConto[]> {
        try {
            // Assicurati che il limite sia un numero positivo
            if (limit <= 0) {
                throw new Error("Il limite deve essere un numero positivo.");
            }

            const movimenti = await movimentoContoModel.find({ contoCorrenteID: contoCorrenteId })
                .populate('contoCorrenteID', 'iban')
                .populate('categoriaMovimentoID', 'categoryName')
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
    async getMovimentiByCategoria(limit: number, contoCorrenteId: string, categoriaMovimentoId: string): Promise<movimentoConto[]> {
        try {
            const movimenti = await movimentoContoModel.find({ contoCorrenteID: contoCorrenteId, categoriaMovimentoID: categoriaMovimentoId })
                .populate('contoCorrenteID', 'iban')
                .populate('categoriaMovimentoID', 'categoryName', 'categoryType')
                .sort({ data: -1 }) // Ordine decrescente per data (più recenti per primi)
                .limit(limit)
                .lean();
            return movimenti;
        } catch (error: any) {
            console.error(`Errore durante il recupero dei movimenti per categoria ${categoriaMovimentoId} nel conto corrente ${contoCorrenteId}:`, error.message);
            throw new Error(`Impossibile recuperare i movimenti per categoria: ${error.message}`);
        }
    }

    // Trova CategoryName per CategoryId
    async getCategoryIdByName(categoryName: string, categoryType: string): Promise<string | null> {
        try {
            const categoria = await CategoryModel.findOne({ categoryName, categoryType }).select('_id').lean();

            if (!categoria) {
                return null;
            }

            return categoria._id.toString();
        } catch (error: any) {
            console.error(`Errore nel recupero della categoria ${categoryName} (${categoryType}):`, error.message);
            throw new Error(`Impossibile recuperare la categoria: ${error.message}`);
        }
    }

    // trova l'ultimo movimento di un certo conto corrente, FUNZIONA
    async getLastOperationByContoId(contoCorrenteId: mongoose.ObjectId | string): Promise<movimentoConto | null> {
        try {
            if (!contoCorrenteId) {
                throw new Error("È necessario fornire un contoCorrenteId valido.");
            }

            const ultimaOperazione = await movimentoContoModel.findOne({ contoCorrenteID: contoCorrenteId })
                .sort({ data: -1 }) // prendi il più recente
                .lean();

            return ultimaOperazione;
        } catch (error: any) {
            console.error(`Errore durante il recupero dell'ultima operazione per contoCorrenteId ${contoCorrenteId}:`, error.message);
            throw new Error(`Impossibile recuperare l'ultima operazione: ${error.message}`);
        }
    }

    // Funzione Apertura Conto FUNZIONA
    async aperturaConto(contoCorrenteId: mongoose.ObjectId, importoIniziale = 0) {
        const contoCorrente = await contoCorrenteModel.findById(contoCorrenteId);

        if (!contoCorrente) {
            throw new Error('Nessun conto corrente trovato');
        }

        let categoria = await CategoryModel.findOne({ categoryName: 'Apertura Conto' });

        if (!categoria) {
            throw new Error('Categoria non trovata.');
        }

        // Creaiamo il movimento
        const movimentoIniziale = {
            contoCorrenteID: contoCorrente._id,
            data: new Date(),
            importo: importoIniziale,
            saldo: importoIniziale,
            categoriaMovimentoID: categoria._id,
            descrizioneEstesa: 'Apertura del Conto Corrente'
        }

        const newMovimento = await movimentoContoModel.create(movimentoIniziale);

        return newMovimento;
    }

    // RICARCIA cellulare
    async ricaricaUscita(movimentoData: movimentoConto, importo: number, numeroTelefono: number) {
        if (movimentoData.saldo < importo) {
            throw new Error('saldo insufficiente');
        }

        const saldoFinale = movimentoData.saldo -importo;

        let categoria = await CategoryModel.findOne({ categoryName: 'Ricarica', categoryType: 'Uscita' });

        if (!categoria) {
            throw new Error('Categoria non trovate');
        }

        const movRicarica = {
            contoCorrenteID: movimentoData.contoCorrenteID,
            data: new Date(),
            importo: importo,
            saldo: saldoFinale,
            categoriaMovimentoID: categoria._id,
            descrizioneEstesa: `Ricarca in uscita verso numero ${numeroTelefono}`
        }

        const newMovimento = await movimentoContoModel.create(movRicarica);

        if (!newMovimento) {
            throw new Error('Errore durante la ricarica');
        }

        return newMovimento
    }


    // FUNZIONA  -->  funzione per gagamento delle utenze 
    async pagamentoUtenze(movimentoData: movimentoConto, importo: number){
        if (movimentoData.saldo<importo){
            throw new Error ("saldo insufficente");
        }

        const saldoFinale = movimentoData.saldo - importo;
        let categoria = await CategoryModel.findOne({ categoryName: 'Pagamento Utenze', categoryType : 'Uscita'});

        if (!categoria){
            throw new Error ('categoria non trovata');
        }

        const movPagamentoUtenze = {
            contoCorrenteID: movimentoData.contoCorrenteID,
            data: new Date(),
            importo: importo,
            saldo: saldoFinale,
            categoriaMovimentoID: categoria._id,
            descrizioneEstesa: 'Pagamento Utenze'
        }

        const newMovimento = await movimentoContoModel.create(movPagamentoUtenze);

        if(!newMovimento){
            throw new Error ("errore nella creazione del movimento")
        }
        return newMovimento;

    }    

    // FUNZIONA --> funzione per il prelievo contanti dal conto 
    async prelievoContanti(movimentoData: movimentoConto, importo: number){
        if (movimentoData.saldo<importo){
            throw new Error ("saldo insufficente");
        }
        
        const saldoFinale = movimentoData.saldo - importo;
        let categoria = await CategoryModel.findOne({ categoryName: 'Prelievo Contanti', categoryType : 'Uscita'});
        
        if (!categoria){
            throw new Error ('categoria non trovata');
        }
        
        const movimentoPrelievoContanti = {
            contoCorrenteID: movimentoData.contoCorrenteID,
             data: new Date(),
            importo: importo,
            saldo: saldoFinale,
            categoriaMovimentoID: categoria._id,
            descrizioneEstesa: 'Prelievo Contanti'
        }

        const newMovimento = await movimentoContoModel.create(movimentoPrelievoContanti);

        if(!newMovimento){
            throw new Error ("errore nella creazione del movimento")
        }
        return newMovimento;
    }

    // FUNZIONA: funzione per il versamento on il bancomat
    async versamentoBancomat(movimentoData: movimentoConto, importo: number){
        
        const saldoFinale = movimentoData.saldo + importo;
        let categoria = await CategoryModel.findOne({ categoryName: 'Versamento Bancomat', categoryType : 'Entrata'});

        if (!categoria){
            throw new Error ('categoria non trovata');
        }

        const movRicarica = {
            contoCorrenteID: movimentoData.contoCorrenteID,
            data: new Date(),
            importo: importo,
            saldo: saldoFinale,
            categoriaMovimentoID: categoria._id,
            descrizioneEstesa: 'versamento bancomat'
        }

        const newMovimento = await movimentoContoModel.create(movRicarica);

        if(!newMovimento){
            throw new Error ("errore durante la ricarica")
        }
        return newMovimento;
    }

    // TO FIX
    async bonificoUscita(movimentoDataMittente: movimentoConto, movimentoDataDestinatario: movimentoConto, importo: number) {

        const saldoDisponibile = movimentoDataMittente.saldo;
        const saldoDestinatario = movimentoDataDestinatario.saldo;

        if (importo > saldoDisponibile) {
            throw new Error('Saldo utente insufficiente')
        }

        const saldoFinaleMittente = saldoDisponibile - importo;
        const saldoFinaleDestinatario = saldoDestinatario + importo;

        let categoriaUscita = await CategoryModel.findOne({ categoryName: 'Bonifico', categoryType: 'Uscita' });
        let categoriaEntrata = await CategoryModel.findOne({ categoryName: 'Bonifico', categoryType: 'Entrata' });

        if (!categoriaUscita) {
            throw new Error('categoria non trovata');
        }

        if (!categoriaEntrata) {
            throw new Error('categoria non trovata');
        }
        const movimentoBonificoMittente = {
            contoCorrenteID: movimentoDataMittente.contoCorrenteID,    
            data: new Date(),
            importo: importo,
            saldo: saldoFinaleMittente,
            categoriaMovimentoID: categoriaUscita._id,
            descrizioneEstesa: `Bonifico in uscita`
        }
        const movimentoBonificoDestinatario = {
            contoCorrenteID: movimentoDataDestinatario.contoCorrenteID,  
            data: new Date(),
            importo: importo,
            saldo: saldoFinaleDestinatario,
            categoriaMovimentoID: categoriaEntrata._id,
            descrizioneEstesa: 'Bonifico in entrata'
        }


        const newMovimentoUscita = await movimentoContoModel.create(movimentoBonificoMittente);
        const newMovimentoEntrata = await movimentoContoModel.create(movimentoBonificoDestinatario);

        if (!newMovimentoUscita) {
            throw new Error("errore nella creazione del movimento uscita");
        }
        if (!newMovimentoEntrata) {
            throw new Error("errore nella creazione del movimento entrata");
        }

        const bonificoCompleto = {
            movimentoUscita: newMovimentoUscita,
            movimentoEntrata: newMovimentoEntrata
        };


        if (!bonificoCompleto){
            throw new Error("errore nella generazione del output");
        }

        return bonificoCompleto;

    }   
}

export default new MovimentoContoService;