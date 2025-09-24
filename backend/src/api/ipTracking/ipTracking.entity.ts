export type OperationLog = {
    userEmail: string;
    ipAddress: string;
    operation: 'MODIFICA_PASSWORD' | 'BONIFICO' | 'RICARICA';
    status: 'SUCCESS' | 'FAILED';
    description?: string;
    createdAt: Date;
}