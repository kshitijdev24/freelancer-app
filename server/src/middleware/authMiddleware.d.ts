import type { Response, NextFunction } from 'express';
export declare const protect: (req: any, res: Response, next: NextFunction) => Promise<void>;
export declare const sellerOnly: (req: any, res: Response, next: NextFunction) => void;
//# sourceMappingURL=authMiddleware.d.ts.map