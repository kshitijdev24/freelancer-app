import type { Request, Response } from 'express';
import Job from '../models/Job.js';

export const createJob = async (req: Request, res: Response) => {
    try {
        const { title, description, budget, category } = req.body;
        const job = await Job.create({
            client: (req as any).user.id,
            title,
            description,
            budget,
            category
        });
        res.status(201).json(job);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getJobs = async (req: Request, res: Response) => {
    try {
        const jobs = await Job.find({ status: 'open' }).populate('client', 'username profileImage');
        res.json(jobs);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyJobs = async (req: Request, res: Response) => {
    try {
        const jobs = await Job.find({ client: (req as any).user.id });
        res.json(jobs);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getJobById = async (req: Request, res: Response) => {
    try {
        const job = await Job.findById(req.params.id).populate('client', 'username profileImage');
        if (!job) return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
