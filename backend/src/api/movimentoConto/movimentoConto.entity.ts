import { ObjectId } from "mongoose";

export type movimentoConto = {
    id?: string;			
	contoCorrenteID: ObjectId;	 
	data: Date;
	importo: number;	
	saldo: number;				
	categoriaMovimentoID: ObjectId;		
	descrizioneEstesa: string;
}