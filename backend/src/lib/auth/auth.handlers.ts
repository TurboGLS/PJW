import './local/local-strategy';
import './jwt/jwt-strategy';
import { User as iUser } from '../../api/user/user.entity';

declare global {
    namespace Express {
        interface User extends iUser { }
    }
}