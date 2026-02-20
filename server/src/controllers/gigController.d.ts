import type { Request, Response } from 'express';
export declare const createGig: (req: any, res: Response) => Promise<void>;
export declare const getGigs: (req: Request, res: Response) => Promise<void>;
export declare const getGigById: (req: Request, res: Response) => Promise<void>;
export declare const updateGig: (req: any, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteGig: (req: any, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=gigController.d.ts.map