'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Briefcase, Database, LayoutPanelLeft, Terminal, Rocket, Palmtree } from 'lucide-react';
import JobCard from '@/components/gig/JobCard';

const JobsMarketplacePage = () => {
    const [jobs, setJobs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    const fetchJobs = async () => {
        setIsLoading(true);
        try {
            const queryParams = new URLSearchParams();
            if (search) queryParams.append('search', search);
            if (category) queryParams.append('category', category);

            const response = await fetch(`http://localhost:3000/api/jobs?${queryParams.toString()}`);
            const data = await response.json();
            setJobs(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching jobs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, [category]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchJobs();
    };

    return (
        <div className="min-h-screen py-24 px-6 md:px-12 bg-background relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[100px] -mr-64 -mt-64" />

            <div className="container mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-24 gap-12">
                    <div className="text-center lg:text-left">
                        <span className="text-accent font-black text-[10px] uppercase tracking-[0.4em] mb-6 block">Supply Chain Protocol</span>
                        <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6 tracking-tighter leading-[0.9]"> requirement <br /><span className="text-accent">registry.</span></h1>
                        <p className="text-foreground/50 font-medium text-lg max-w-xl">Browse active client requirements and deploy your professional expertise where it's needed most.</p>
                    </div>

                    <form onSubmit={handleSearch} className="flex w-full lg:w-auto gap-3 bg-card p-3 rounded-[2.5rem] shadow-2xl shadow-accent/5 border border-border">
                        <div className="flex-grow flex items-center px-4 gap-4">
                            <Search className="w-5 h-5 text-foreground/20" strokeWidth={3} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search for active requirements..."
                                className="py-4 bg-transparent outline-none w-full md:w-80 font-bold text-foreground placeholder:text-foreground/20"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-accent text-card px-10 py-5 rounded-2xl font-black hover:scale-[1.02] transition-all shadow-xl shadow-accent/20 active:scale-95"
                        >
                            Search
                        </button>
                    </form>
                </div>

                <div className="bg-card p-4 rounded-[4rem] border border-border mb-20 shadow-xl flex items-center gap-6 overflow-x-auto scrollbar-hide">
                    <div className="flex items-center gap-3 px-8 border-r border-border shrink-0">
                        <Filter className="w-5 h-5 text-foreground" />
                        <span className="font-black text-xs uppercase tracking-[0.2em] text-foreground">Sort By</span>
                    </div>
                    <div className="flex gap-4 pr-8">
                        {[
                            { id: '', label: 'All Jobs', icon: LayoutPanelLeft },
                            { id: 'Web Development', label: 'Development', icon: Terminal },
                            { id: 'Graphic Design', label: 'Creative', icon: Palmtree },
                            { id: 'AI Services', label: 'AI & Data', icon: Database },
                            { id: 'Video Editing', label: 'Multimedia', icon: Rocket },
                        ].map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setCategory(cat.id)}
                                className={`flex items-center gap-3 px-8 py-4 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] transition-all whitespace-nowrap border-2 ${category === cat.id
                                    ? 'bg-accent text-card border-accent shadow-xl shadow-accent/20'
                                    : 'bg-background border-border text-foreground/40 hover:border-accent hover:text-accent'
                                    }`}
                            >
                                <cat.icon className="w-4 h-4" />
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="animate-pulse bg-card p-10 rounded-[3.5rem] border border-border h-96"></div>
                        ))}
                    </div>
                ) : jobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {jobs.map((job: any) => (
                            <JobCard key={job._id} job={job} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40 bg-card rounded-[5rem] border border-border shadow-3xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-28 h-28 bg-background rounded-[3rem] flex items-center justify-center mb-12 shadow-2xl shadow-accent/5 opacity-40">
                                <Briefcase className="w-12 h-12 text-foreground" />
                            </div>
                            <h2 className="text-4xl font-black text-foreground mb-4 tracking-tighter">Registry Empty.</h2>
                            <p className="text-foreground/40 font-medium text-lg max-w-sm mx-auto mb-12">No active job requirements found in current sync.</p>
                            <button
                                onClick={() => { setSearch(''); setCategory(''); }}
                                className="bg-accent text-card px-12 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-accent/20 active:scale-95"
                            >
                                Reset Sync
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobsMarketplacePage;
