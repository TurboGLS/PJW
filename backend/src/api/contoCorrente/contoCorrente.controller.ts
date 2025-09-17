import { Request, Response } from 'express';
import { ContoCorrenteService } from './contoCorrente.service';

const contoCorrenteService = new ContoCorrenteService();

export class ContoCorrenteController {

    public async createContoCorrente(req: Request, res: Response): Promise<void> {
        try {
            const { email, password, cognomeTitolare, nomeTitolare, dataApertura, iban } = req.body;

            if (!email || !password || !cognomeTitolare || !nomeTitolare || !iban) {
                res.status(400).json({ message: 'Tutti i campi obbligatori (email, password, cognomeTitolare, nomeTitolare, iban) devono essere forniti.' });
                return;
            }

            let aperturaDate: Date;
            if (dataApertura) {
                aperturaDate = new Date(dataApertura);
                if (isNaN(aperturaDate.getTime())) {
                    res.status(400).json({ message: 'Il campo dataApertura non è una data valida.' });
                    return;
                }
            } else {
                aperturaDate = new Date();
            }


            const newContoCorrenteData = {
                email,
                password,
                cognomeTitolare,
                nomeTitolare,
                dataApertura: aperturaDate,
                iban,
            };

            const createdAccount = await contoCorrenteService.addContoCorrente(newContoCorrenteData);
            res.status(201).json(createdAccount); 
        } catch (error: any) {
            console.error('[Controller] Errore nella creazione del conto corrente:', error.message);
            if (error.message.includes('esiste già')) {
                res.status(409).json({ message: error.message }); 
            } else if (error.message.includes('Errore di validazione')) { 
                res.status(400).json({ message: error.message });
            }
            else {
                res.status(500).json({ message: 'Errore interno del server durante la creazione del conto corrente.' });
            }
        }
    }

    
    public async getContoCorrenteById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const contoCorrente = await contoCorrenteService.getContoCorrenteById(id);

            if (!contoCorrente) {
                res.status(404).json({ message: `Conto corrente con ID ${id} non trovato.` });
                return;
            }
            res.status(200).json(contoCorrente);
        } catch (error: any) {
            console.error(`[Controller] Errore nel recupero del conto corrente con ID ${req.params.id}:`, error.message);
            res.status(500).json({ message: 'Errore interno del server durante il recupero del conto corrente.' });
        }
    }
}