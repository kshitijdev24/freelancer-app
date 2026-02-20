import Job from '../models/Job.js';
export const createJob = async (req, res) => {
    try {
        const { title, description, budget, category } = req.body;
        const job = await Job.create({
            client: req.user.id,
            title,
            description,
            budget,
            category
        });
        res.status(201).json(job);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ status: 'open' }).populate('client', 'username profileImage');
        res.json(jobs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getMyJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ client: req.user.id });
        res.json(jobs);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getJobById = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id).populate('client', 'username profileImage');
        if (!job)
            return res.status(404).json({ message: 'Job not found' });
        res.json(job);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//# sourceMappingURL=jobController.js.map