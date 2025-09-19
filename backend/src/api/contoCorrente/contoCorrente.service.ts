import { contoCorrenteModel } from './contoCorrente.model';
import { contoCorrente } from './contoCorrente.entity';
import { movimentoContoModel } from '../movimentoConto/movimentoConto.model';
import { movimentoConto } from '../movimentoConto/movimentoConto.entity';

export class ContoCorrenteService {
    // Apertura Conto Corrente
    public async addContoCorrente(contoCorrenteData: Omit<contoCorrente, 'id'>): Promise<contoCorrente> {
        try {
            const newContoCorrente = new contoCorrenteModel(contoCorrenteData);
            const createdAccount = await newContoCorrente.save();

            console.log(`[Service] Conto Corrente aggiunto:`, createdAccount.toJSON());
            return createdAccount.toJSON() as contoCorrente;
        } catch (error: any) {
            if (error.code === 11000) {  // < - - - - - -  QUI VA CAMBIATO CON L'ERRORE CHE GENERA MONGO QUANDO ENTRA IN QUASTO CASO 
                throw new Error(`Un conto corrente con i dati forniti (es. IBAN o Email) esiste già.`);
            }
            console.error('[Service] Errore nella creazione del conto corrente:', error);
            throw new Error(`Errore durante la creazione del conto corrente: ${error.message}`);
        }
    }

    public async getContoCorrenteById(id: string): Promise<movimentoConto | null> {
        try {
            const movimentoConto = await movimentoContoModel.findById(id);
            return movimentoConto ? movimentoConto.toJSON() as movimentoConto : null;
        } catch (error: any) {
            console.error(`[Service] Errore nel recupero del conto corrente con ID ${id}:`, error);
            throw new Error(`Errore durante il recupero del conto corrente: ${error.message}`);
        }
    }

    public async getContoCorrenteByEmail(email: string): Promise<contoCorrente | null> {
        try {
            const contoCorrente = await contoCorrenteModel.findOne({ email: email });
            return contoCorrente;
        } catch (error: any) {
            console.error(`[Service] Errore nel recupero del conto corrente con email ${email}:`, error);
            throw new Error(`Errore durante il recupero del conto corrente: ${error.message}`);
        }
    }

    public async getContoCorrenteByIban(iban: string): Promise<contoCorrente | null> {
        try {
            const contoCorrente = await contoCorrenteModel.findOne({ iban: iban });
            return contoCorrente ? contoCorrente.toJSON() as contoCorrente : null;
        } catch (error: any) {
            console.error(`[Service] Errore nel recupero del conto corrente con iban ${iban}:`, error);
            throw new Error(`Errore durante il recupero del conto corrente: ${error.message}`);
        }
    }
}

export default new ContoCorrenteService;