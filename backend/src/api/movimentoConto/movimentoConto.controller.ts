import { Request, Response } from 'express';
import { MovimentoContoService } from './movimentoConto.service'; // Assicurati che il percorso sia corretto
import { movimentoContoModel } from './movimentoConto.model'; // Assicurati che il percorso sia corretto e che MovimentoConto sia l'interfaccia
import { movimentoConto } from './movimentoConto.entity';
import mongoose from 'mongoose';


const movimentoContoService = new MovimentoContoService();

export class MovimentoContoController {

    // da gestire in base a che tipo di movimento bisogna eseguire 
    public async createMovimentoConto(req: Request, res: Response): Promise<void> {
        try {
            const movimentoData: Omit<movimentoConto, '_id'> = req.body;
            const tipoMovimentoID: Omit<movimentoConto, 'categoriaMovimentoID'> = req.body;

            //  qui 

            const newMovimento = await movimentoContoService.createMovimentoConto(movimentoData);


            res.status(201).json(newMovimento);
        } catch (error: any) {
            console.error("Errore nel controller createMovimentoConto:", error.message);
            res.status(400).json({ message: error.message });
        }
    }

   
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

    public async getLimitedMovimentiConto(req: Request, res: Response): Promise<void> {
        try {
            const limit = parseInt(req.query.limit as string);

            if (isNaN(limit) || limit <= 0) {
                res.status(400).json({ message: "Il parametro 'limit' deve essere un numero intero positivo." });
                return;
            }

            const movimenti = await movimentoContoService.getLimitedMovimentiConto(limit);
            res.status(200).json(movimenti);
        } catch (error: any) {
            console.error("Errore nel controller getLimitedMovimentiConto:", error.message);
            res.status(500).json({ message: "Errore durante il recupero dei movimenti conto limitati.", error: error.message });
        }
    }

    public async getMovimentiByCategoria(req: Request, res: Response): Promise<void> {
        try {
            const { categoriaId } = req.params; 

            if (!mongoose.Types.ObjectId.isValid(categoriaId)) {  // < - - - - - -  qui mi da un errore ma forse è un problema mio di una libreria che ho attiva 
                res.status(400).json({ message: "ID categoria non valido." });
                return;
            }

            const movimenti = await movimentoContoService.getMovimentiByCategoria(categoriaId);
            res.status(200).json(movimenti);
        } catch (error: any) {
            console.error("Errore nel controller getMovimentiByCategoria:", error.message);
            res.status(500).json({ message: "Errore durante il recupero dei movimenti per categoria.", error: error.message });
        }
    }
}