import React from 'react';
import { Briefcase, DollarSign, ArrowRight, User, Layers } from 'lucide-react';
import Link from 'next/link';

interface JobCardProps {
    job: {
        _id: string;
        title: string;
        description: string;
        budget: number;
        category: string;
        client: {
            username: string;
            profileImage?: string;
        };
        createdAt: string;
    };
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
    return (
        <div className="bg-card p-10 rounded-[3.5rem] border border-border hover:border-primary hover:shadow-[0_40px_80px_-20px_rgba(37,99,235,0.15)] transition-all duration-700 group relative">
            <div className="flex justify-between items-start mb-8">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:-rotate-12">
                    <Briefcase className="w-8 h-8" strokeWidth={3} />
                </div>
                <div className="bg-accent/10 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-accent">
                    Open Protocol
                </div>
            </div>

            <h3 className="text-2xl font-black text-foreground mb-4 tracking-tighter leading-tight group-hover:text-primary transition-colors">{job.title}</h3>
            <p className="text-foreground/40 font-medium text-sm mb-8 line-clamp-3 leading-relaxed">
                {job.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
                <div className="flex items-center gap-2 bg-foreground/5 px-4 py-2 rounded-xl border border-border">
                    <DollarSign className="w-3 h-3 text-accent" />
                    <span className="text-[10px] font-black text-foreground uppercase tracking-widest">${job.budget}</span>
                </div>
                <div className="flex items-center gap-2 bg-foreground/5 px-4 py-2 rounded-xl border border-border">
                    <Layers className="w-3 h-3 text-primary" />
                    <span className="text-[10px] font-black text-foreground uppercase tracking-widest">{job.category}</span>
                </div>
            </div>

            <div className="flex items-center justify-between pt-8 border-t border-border">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-foreground/5 rounded-xl flex items-center justify-center text-foreground/20 font-black text-sm">
                        {job.client.username[0].toUpperCase()}
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-foreground uppercase tracking-widest">{job.client.username}</p>
                        <p className="text-[8px] font-bold text-foreground/20 uppercase tracking-[0.2em] mt-1">Origin Node</p>
                    </div>
                </div>
                <Link href={`/jobs/${job._id}`} className="w-10 h-10 bg-foreground text-card rounded-xl flex items-center justify-center hover:bg-primary transition-all group/btn">
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
};

export default JobCard;
