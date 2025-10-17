import type { Request, Response, NextFunction } from 'express';
import { type Payload } from './authorization.js';
declare global {
    namespace Express {
        interface Request {
            user?: Payload;
        }
    }
}
export declare const requireAuth: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export declare const tableName = "jwt";
//# sourceMappingURL=middleware.d.ts.map