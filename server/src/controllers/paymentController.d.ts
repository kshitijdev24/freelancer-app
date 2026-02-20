import type { Request, Response } from 'express';
export declare const createPaymentIntent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const confirmPayment: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=paymentController.d.ts.map