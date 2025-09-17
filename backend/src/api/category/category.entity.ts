export type Category = {
    id?: string;
    categoryName: 'Apertura Conto' | 'Bonifico' | 'Prelievo Contanti' | 'Pagamento Utenze' | 'Ricarica' | 'Versamento Bancomat';
    categoryType: 'Entrata' | 'Uscita';
}