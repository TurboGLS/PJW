export type Movements = {
  _id: string;
  saldo: number;
  importo: number;
  categoriaMovimentoID: {
    categoryName: string;
    categoryType: string;
  };
  descrizioneEstesa: string;
  data: Date;
};
