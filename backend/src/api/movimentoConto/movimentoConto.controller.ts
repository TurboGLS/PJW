import { NextFunction, Request, Response } from 'express';
import { MovimentoContoService } from './movimentoConto.service'; // Assicurati che il percorso sia corretto
import { movimentoContoModel } from './movimentoConto.model'; // Assicurati che il percorso sia corretto e che MovimentoConto sia l'interfaccia
import { movimentoConto } from './movimentoConto.entity';
import mongoose from 'mongoose';
import ContoCorrenteSrv from '../contoCorrente/contoCorrente.service';
import operationLogSrv from "../ipTracking/ipTracking.service";

const movimentoContoService = new MovimentoContoService();

export class MovimentoContoController {
    public async getMovimentoContoById(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const movimento = await movimentoContoService.getMovimentoContoById(id);

            if (movimento) {
                res.status(200).json(movimento);
            } else {
                res.status(404).json({ message: "Movimento conto non trovato." });
            }
        } catch (error: any) {
            console.error("Errore nel controller getMovimentoContoById:", error.message);
            res.status(500).json({ message: "Errore durante il recupero del movimento conto.", error: error.message });
        }
    }


    public async getAllMovimentiConto(req: Request, res: Response): Promise<void> {
        try {
            const movimenti = await movimentoContoService.getAllMovimentiConto();

            res.status(200).json(movimenti);
        } catch (error: any) {
            console.error("Errore nel controller getAllMovimentiConto:", error.message);
            res.status(500).json({ message: "Errore durante il recupero di tutti i movimenti conto.", error: error.message });
        }
    }

    // FUNZIONA da pulire il dato in output
    public async getLimitedMovimentiConto(req: Request, res: Response): Promise<void> {
        try {
            const limit = parseInt(req.query.limit as string);
            const email = req.user?.email;

            if (isNaN(limit) || limit <= 0) {
                res.status(400).json({ message: "Il parametro 'limit' deve essere un numero intero positivo." });
                return;
            }

            if (!email) {
                res.status(400).json({ message: "Il parametro 'email' è obbligatorio." });
                return;
            }

            const contoCorrente = await ContoCorrenteSrv.getContoCorrenteByEmail(email);

            if (!contoCorrente?.id) {
                res.status(404).json({ message: 'Impossible trovare un contoCorrente correlato alla email inserita' });
                return;
            }

            const movimenti = await movimentoContoService.getLimitedMovimentiConto(limit, contoCorrente.id);

            const lastSaldo = await movimentoContoService.getLastOperationByContoId(contoCorrente.id);

            if (!lastSaldo) {
                res.status(400).json({ message: 'Ultimo saldo non trovato' });
                return;
            }

            res.status(200).json({ movimenti, lastSaldo });
        } catch (error: any) {
            console.error("Errore nel controller getLimitedMovimentiConto:", error.message);
            res.status(500).json({ message: "Errore durante il recupero dei movimenti conto limitati.", error: error.message });
        }
    }

    // FIXING
    public async getMovimentiByCategoria(req: Request, res: Response) {
        try {
            const limit = parseInt(req.query.limit as string);
            const email = req.user?.email;
            const categoryName = req.body.categoryName as string;
            const categoryType = req.body.categoryType as string;

            if (isNaN(limit) || limit <= 0) {
                res.status(400).json({ message: "Il parametro 'limit' deve essere un numero intero positivo." });
                return;
            }

            if (!email) {
                res.status(400).json({ message: "Il parametro 'email' è obbligatorio." });
                return;
            }

            if (!categoryName) {
                res.status(400).json({ message: 'Nome Categoria non inserito' });
                return;
            }

            if (!categoryType) {
                res.status(400).json({ message: 'Type Categoria non inserito' });
                return;
            }

            const contoCorrente = await ContoCorrenteSrv.getContoCorrenteByEmail(email);

            if (!contoCorrente?.id) {
                res.status(404).json({ message: 'Impossible trovare un contoCorrente correlato alla email inserita' });
                return;
            }

            const categoryId = await movimentoContoService.getCategoryIdByName(categoryName, categoryType);

            if (!categoryId) {
                res.status(400).json({ message: 'CategoryId non trovato' });
                return;
            }

            const movimenti = await movimentoContoService.getMovimentiByCategoria(limit, contoCorrente.id, categoryId);

            if (!movimenti || movimenti.length === 0) {
                res.status(200).json({ message: 'Nessun movimento trovato per questa categoria.' });
                return;
            }

            res.status(200).json(movimenti);
        } catch (error: any) {
            console.error("Errore nel controller getLimitedMovimentiConto:", error.message);
            res.status(500).json({ message: "Errore durante il recupero dei movimenti conto limitati.", error: error.message });
        }
    }

    // Ricarcia Telefonica
    public async postRicarica(req: Request, res: Response, next: NextFunction) {
        try {
            // per il log
            const ipAddressRaw = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            const ipAddress = Array.isArray(ipAddressRaw) ? ipAddressRaw[0] : (ipAddressRaw || 'UNKNOWN');

            const email = req.user?.email;
            const { importo, numeroTelefono } = req.body;

            if (!importo) {
                res.status(400).json({ message: 'Importo mancante' });
                await operationLogSrv.createLog(
                    email!,
                    ipAddress,
                    'RICARICA',
                    'FAILED',
                    'Importo mancante'
                );
                return;
            }

            if (!numeroTelefono) {
                res.status(400).json({ message: 'Numero mancante' });
                await operationLogSrv.createLog(
                    email!,
                    ipAddress,
                    'RICARICA',
                    'FAILED',
                    'Numero mancante'
                );
                return;
            }

            if (!email) {
                res.status(400).json({ message: 'Email non trovata' });
                await operationLogSrv.createLog(
                    email!,
                    ipAddress,
                    'RICARICA',
                    'FAILED',
                    'Email non trovata'
                );
                return;
            }

            const contoCorrente = await ContoCorrenteSrv.getContoCorrenteByEmail(email);

            if (!contoCorrente) {
                res.status(400).json({ message: 'Conto Corrente non trovato' });
                await operationLogSrv.createLog(
                    email!,
                    ipAddress,
                    'RICARICA',
                    'FAILED',
                    'Conto Corrente non trovato'
                );
                return;
            }

            if (!contoCorrente.id) {
                res.status(400).json({ message: 'Id del conto corrente non trovato' });
                await operationLogSrv.createLog(
                    email!,
                    ipAddress,
                    'RICARICA',
                    'FAILED',
                    'Id del conto corrente non trovato'
                );
                return;
            }

            const lastMovimento = await movimentoContoService.getLastOperationByContoId(contoCorrente.id);

            if (!lastMovimento) {
                res.status(400).json({ message: 'Ultima operazione non trovata' });
                await operationLogSrv.createLog(
                    email!,
                    ipAddress,
                    'RICARICA',
                    'FAILED',
                    'Ultima operazione non trovata'
                );
                return;
            }

            const newMovimento = await movimentoContoService.ricaricaUscita(lastMovimento, importo, numeroTelefono);

            if (!newMovimento) {
                res.status(400).json({ message: 'Rircari fallita' });
                await operationLogSrv.createLog(
                    email!,
                    ipAddress,
                    'RICARICA',
                    'FAILED',
                    'Rircari fallita'
                );
                return;
            }

            // Log di successo
            await operationLogSrv.createLog(
                email,
                ipAddress,
                'RICARICA',
                'SUCCESS',
                'Password modificata correttamente'
            );

            res.status(201).json(newMovimento);
        } catch (err: any) {
            // Log di errore
            const email = req.user?.email;
            const ipAddressRaw = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            const ipAddress = Array.isArray(ipAddressRaw) ? ipAddressRaw[0] : (ipAddressRaw || 'UNKNOWN');

            if (email) {
                await operationLogSrv.createLog(
                    email,
                    ipAddress,
                    'RICARICA',
                    'FAILED',
                    err.message
                );
            }
            res.status(400).json({ message: err.message });

        }
    }

    // FUNZIONA: pagamento utenze    
    public async postPagamentoUtenze(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.user?.email;
            const { importo } = req.body;
            if (!importo) {
                res.status(400).json("importo non inserito")
                return;
            }
            if (!email) {
                res.status(400).json("Email non trovata")
                return;
            }
            const contoCorrente = await ContoCorrenteSrv.getContoCorrenteByEmail(email);
            if (!contoCorrente) {
                res.status(400).json("Conto corrente mittente non trovato per l'email specificata");
                return;
            }
            if (!contoCorrente.id) {
                res.status(400).json("Conto correnteID non trovato");
                return;
            }
            const lastMovimento = await movimentoContoService.getLastOperationByContoId(contoCorrente.id);
            if (!lastMovimento) {
                res.status(400).json("ultima operazione non trovata");
                return;
            }
            const newMovimento = await movimentoContoService.pagamentoUtenze(lastMovimento, importo);
            if (!newMovimento) {
                res.status(400).json("pagamento non eseguito con successo");
                return;
            }
            res.status(201).json(newMovimento);
        } catch (error) {
            next(error);
        }
    }

    // FUNZIONA: funzione prelievo 
    public async postPrelievo(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.user?.email;
            const { importo } = req.body;

            if (!importo) {
                res.status(400).json("importo non inserito")
                return;
            }
            if (!email) {
                res.status(400).json("Email non trovata")
                return;
            }

            const contoCorrente = await ContoCorrenteSrv.getContoCorrenteByEmail(email);
            if (!contoCorrente) {
                res.status(400).json("Conto corrente mittente non trovato per l'email specificata");
                return;
            }
            if (!contoCorrente.id) {
                res.status(400).json("Conto correnteID non trovato");
                return;
            }

            const lastMovimento = await movimentoContoService.getLastOperationByContoId(contoCorrente.id);

            if (!lastMovimento) {
                res.status(400).json("ultimo prelievo non trovato");
                return;
            }

            const newMovimento = await movimentoContoService.prelievoContanti(lastMovimento, importo);

            if (!newMovimento) {
                res.status(400).json("prelievo non eseguito con successo");
                return;
            }
            res.status(201).json(newMovimento);
        } catch (error) {
            next(error);
        }
    }

    // FUNZIONA: funzione per il versamento con il bancomat
    public async postVersamentoBancomat(req: Request, res: Response, next: NextFunction) {
        try {
            const email = req.user?.email;
            const { importo } = req.body;
            if (!importo) {
                throw new Error("importo non inserito");
            }
            if (!email) {
                throw new Error("Email non trovata");
            }
            const contoCorrente = await ContoCorrenteSrv.getContoCorrenteByEmail(email);
            if (!contoCorrente) {
                throw new Error("Conto corrente mittente non trovato per l'email specificata");
            }
            if (!contoCorrente.id) {
                throw new Error("Conto correnteID non trovato");
            }
            const lastMovimento = await movimentoContoService.getLastOperationByContoId(contoCorrente.id);
            if (!lastMovimento) {
                throw new Error("ultima operazione non trovata");
            }
            const newMovimento = await movimentoContoService.versamentoBancomat(lastMovimento, importo);
            if (!newMovimento) {
                throw new Error("versamento bancomat non eseguito con successo");
            }
            res.status(201).json(newMovimento);
        } catch (error) {
            next(error);
        }
    }

    // Bonifico 
    public async postBonificoUscita(req: Request, res: Response, next: NextFunction) {
        try {
            // per i log
            const ipAddressRaw = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            const ipAddress = Array.isArray(ipAddressRaw) ? ipAddressRaw[0] : (ipAddressRaw || 'UNKNOWN');

            const email = req.user?.email;
            const { ibanDestinatario, importo, causale: causale } = req.body;

            if (!email) {
                res.status(400).json({ message: "Email non trovata" });
                await operationLogSrv.createLog(
                    email!,
                    ipAddress,
                    'BONIFICO',
                    'FAILED',
                    "Email non trovata"
                );
                return;
            }

            if (!ibanDestinatario) {
                res.status(400).json({ message: "Iban non inserito" });
                await operationLogSrv.createLog(
                    email!,
                    ipAddress,
                    'BONIFICO',
                    'FAILED',
                    "Iban non inserito"
                );
                return;
            }

            if (!importo) {
                res.status(400).json({ message: "Importo non inserito" });
                await operationLogSrv.createLog(
                    email!,
                    ipAddress,
                    'BONIFICO',
                    'FAILED',
                    "Importo non inserito"
                );
                return;
            }

            const contoCorrenteMittente = await ContoCorrenteSrv.getContoCorrenteByEmail(email);
            const contoCorrenteDestinatario = await ContoCorrenteSrv.getContoCorrenteByIban(ibanDestinatario);

            if (!contoCorrenteMittente) {
                res.status(404).json({ message: "Conto corrente mittente non trovato per l'email specificata" });
                await operationLogSrv.createLog(
                    email!,
                    ipAddress,
                    'BONIFICO',
                    'FAILED',
                    "Conto corrente mittente non trovato per l'email specificata"
                );
                return;
            }

            if (!contoCorrenteMittente.id) {
                res.status(404).json({ message: "Conto corrente ID del mittente non trovato" });
                await operationLogSrv.createLog(
                    email!,
                    ipAddress,
                    'BONIFICO',
                    'FAILED',
                    "Conto corrente ID del mittente non trovato"
                );
                return;
            }
            if (!contoCorrenteDestinatario) {
                res.status(404).json({ message: "Conto corrente destinatario non trovato per l'IBAN specificato" });
                await operationLogSrv.createLog(
                    email!,
                    ipAddress,
                    'BONIFICO',
                    'FAILED',
                    "Conto corrente destinatario non trovato per l'IBAN specificato"
                );
                return;
            }

            if (!contoCorrenteDestinatario.id) {
                res.status(404).json({ message: "Conto corrente ID del destinatario non trovato" });
                await operationLogSrv.createLog(
                    email!,
                    ipAddress,
                    'BONIFICO',
                    'FAILED',
                    "Conto corrente ID del destinatario non trovato"
                );
                return;
            }

            const lastMovimentoMittente = await movimentoContoService.getLastOperationByContoId(contoCorrenteMittente.id);
            const lastMovimentoDestinatario = await movimentoContoService.getLastOperationByContoId(contoCorrenteDestinatario.id);

            if (!lastMovimentoMittente) {
                res.status(404).json({ message: "Ultimo movimento del mittente non trovato" });
                await operationLogSrv.createLog(
                    email!,
                    ipAddress,
                    'BONIFICO',
                    'FAILED',
                    "Ultimo movimento del mittente non trovato"
                );
                return;
            }
            if (!lastMovimentoDestinatario) {
                res.status(404).json({ message: "Ultimo movimento del destinatario non trovato" });
                await operationLogSrv.createLog(
                    email!,
                    ipAddress,
                    'BONIFICO',
                    'FAILED',
                    "Ultimo movimento del destinatario non trovato"
                );
                return;
            }

            const newMovimento = await movimentoContoService.bonificoUscita(lastMovimentoMittente, lastMovimentoDestinatario, importo, causale);

            if (!newMovimento) {
                res.status(500).json({ message: "Errore nella creazione del movimento" });
                await operationLogSrv.createLog(
                    email!,
                    ipAddress,
                    'BONIFICO',
                    'FAILED',
                    "Errore nella creazione del movimento"
                );
                return;
            }

            // Log di successo
            await operationLogSrv.createLog(
                email,
                ipAddress,
                'BONIFICO',
                'SUCCESS',
                'Bonifico effettuato con successo'
            );

            res.status(201).json(newMovimento);
        } catch (err: any) {
            // Log di errore
            const email = req.user?.email;
            const ipAddressRaw = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
            const ipAddress = Array.isArray(ipAddressRaw) ? ipAddressRaw[0] : (ipAddressRaw || 'UNKNOWN');

            if (email) {
                await operationLogSrv.createLog(
                    email,
                    ipAddress,
                    'BONIFICO',
                    'FAILED',
                    err.message
                );
            }
            res.status(400).json({ message: err.message });
        }
    }

    public async lastMovimentiBetweenDates(req: Request, res: Response, next: NextFunction) {
        try {
            const limit = parseInt(req.query.limit as string);
            const email = req.user?.email;
            const { dataInizio, dataFine } = req.body;

            if (!limit || limit <= 0) {
                res.status(400).json('Limite operazioni inserito incorretto');
                return;
            }

            if (!email) {
                res.status(400).json(`Impposibile recuperare le informazioni associate alla email ${email}`);
                return;
            }

            if (!dataInizio || !dataFine) {
                res.status(400).json('Date inserite non valide');
                return;
            }

            const startDate = new Date(dataInizio);
            const endDate = new Date(dataFine);

            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                res.status(400).json({ message: 'Formato data non valido. Usa un formato ISO valido (es. YYYY-MM-DD).' });
                return;
            }

            const contoCorrenteId = await ContoCorrenteSrv.getContoCorrenteByEmail(email);

            if (!contoCorrenteId?.id) {
                res.status(400).json(`Impossibile trovare il conto corrente associato alla email ${email}`);
                return;
            }

            const lastMovimentiDates = await movimentoContoService.getLimitedMovimentiBetweenDates(contoCorrenteId.id, startDate, endDate, limit);

            if (!lastMovimentiDates) {
                res.status(400).json(`Impossibile trovare gli ultimi movimenti tra data ${dataInizio} e ${dataFine}`);
                return;
            }

            if (!lastMovimentiDates || lastMovimentiDates.length === 0) {
                res.status(404).json({ message: `Nessuna operazione trovata tra le date ${dataInizio} e ${dataFine}` });
                return;
            }

            res.status(200).json(lastMovimentiDates);
        } catch (err) {
            next(err);
        }
    }
}

