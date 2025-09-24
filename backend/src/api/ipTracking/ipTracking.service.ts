import { OperationLog } from './ipTracking.entity';
import { OperationLogModel } from './ipTracking.model';

export class OperationLogService {
    async createLog(userEmail: string, ipAddress: string, operation: 'MODIFICA_PASSWORD' | 'BONIFICO' | 'RICARICA', status: 'SUCCESS' | 'FAILED', description?: string): Promise<OperationLog> {
        try {
            const log = await OperationLogModel.insertOne({ userEmail, ipAddress, operation, status, description });
            return log;
        } catch (err) {
            console.error('Errore durante il salvataggio del log:', err);
            throw err;
        }
    }
}

export default new OperationLogService();
