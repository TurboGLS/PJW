export type movimentoConto = {
    id?: string;			
	contoCorrenteID: string;		 
	data: Date;				
	importo: number;	
	saldo: number;				
	categoriaMovimentoID: string;		
	descrizioneEstesa: string;
}