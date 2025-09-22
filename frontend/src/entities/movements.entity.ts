export type Movements = {
  _id: string;
  saldo: number;
  importo: number;
  categoriaMovimentoID: {
    categoryName: string;
  };
  descrizioneEstesa: string;
};
