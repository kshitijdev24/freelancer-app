import type { Request, Response } from 'express';
export declare const createJob: (req: Request, res: Response) => Promise<void>;
export declare const getJobs: (req: Request, res: Response) => Promise<void>;
export declare const getMyJobs: (req: Request, res: Response) => Promise<void>;
export declare const getJobById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=jobController.d.ts.map