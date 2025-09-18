import { contoCorrenteModel } from './contoCorrente.model';
import { contoCorrente } from './contoCorrente.entity';

export class ContoCorrenteService {

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


    public async getContoCorrenteById(id: string): Promise<contoCorrente | null> {
        try {
            const contoCorrente = await contoCorrenteModel.findById(id);
            return contoCorrente ? contoCorrente.toJSON() as contoCorrente : null;
        } catch (error: any) {
            console.error(`[Service] Errore nel recupero del conto corrente con ID ${id}:`, error);
            throw new Error(`Errore durante il recupero del conto corrente: ${error.message}`);
        }
    }
}

export default new ContoCorrenteService;