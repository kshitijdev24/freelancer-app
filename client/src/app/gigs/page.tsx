'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Rocket, Database, Palmtree, Terminal, LayoutPanelLeft } from 'lucide-react';
import GigCard from '@/components/gig/GigCard';

const GigsPage = () => {
    const [gigs, setGigs] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');

    const fetchGigs = async () => {
        setIsLoading(true);
        try {
            const queryParams = new URLSearchParams();
            if (search) queryParams.append('search', search);
            if (category) queryParams.append('category', category);

            const response = await fetch(`http://localhost:3000/api/gigs?${queryParams.toString()}`);
            const data = await response.json();
            setGigs(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error('Error fetching gigs:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchGigs();
    }, [category]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        fetchGigs();
    };

    return (
        <div className="min-h-screen py-24 px-6 md:px-12 bg-background relative">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -mr-64 -mt-64" />

            <div className="container mx-auto relative z-10">
                <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end mb-24 gap-12">
                    <div className="text-center lg:text-left">
                        <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-6 block">Exploration Protocol</span>
                        <h1 className="text-5xl md:text-7xl font-black text-foreground mb-6 tracking-tighter leading-[0.9]"> elite <br /><span className="text-primary">inventory.</span></h1>
                        <p className="text-foreground/50 font-medium text-lg max-w-xl">Find specialized talent across high-stakes categories and scale your project vision with ease.</p>
                    </div>

                    <form onSubmit={handleSearch} className="flex w-full lg:w-auto gap-3 bg-card p-3 rounded-[2.5rem] shadow-2xl shadow-primary/5 border border-border">
                        <div className="flex-grow flex items-center px-4 gap-4">
                            <Search className="w-5 h-5 text-foreground/20" strokeWidth={3} />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="What protocol are you searching for?"
                                className="py-4 bg-transparent outline-none w-full md:w-80 font-bold text-foreground placeholder:text-foreground/20"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-primary text-white px-10 py-5 rounded-2xl font-black hover:scale-[1.02] transition-all shadow-xl shadow-primary/20 active:scale-95"
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
                            { id: '', label: 'All Protocols', icon: LayoutPanelLeft },
                            { id: 'Web Development', label: 'Development', icon: Terminal },
                            { id: 'Graphic Design', label: 'Creative', icon: Palmtree },
                            { id: 'AI Services', label: 'AI & Data', icon: Database },
                            { id: 'Video Editing', label: 'Multimedia', icon: Rocket },
                        ].map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setCategory(cat.id)}
                                className={`flex items-center gap-3 px-8 py-4 rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] transition-all whitespace-nowrap border-2 ${category === cat.id
                                    ? 'bg-primary text-white border-primary shadow-xl shadow-primary/20'
                                    : 'bg-background border-border text-foreground/40 hover:border-primary hover:text-primary'
                                    }`}
                            >
                                <cat.icon className="w-4 h-4" />
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div key={i} className="animate-pulse bg-card p-10 rounded-[3rem] border border-border shadow-2xl">
                                <div className="aspect-[16/11] bg-foreground/5 rounded-[2.5rem] mb-10"></div>
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 bg-foreground/5 rounded-2xl"></div>
                                    <div className="h-3 bg-foreground/5 rounded-full w-1/3"></div>
                                </div>
                                <div className="h-4 bg-foreground/5 rounded-full w-full mb-4"></div>
                                <div className="h-4 bg-foreground/5 rounded-full w-2/3 mb-12"></div>
                                <div className="flex justify-between items-end">
                                    <div className="h-8 bg-foreground/5 rounded-xl w-24"></div>
                                    <div className="h-12 bg-foreground/5 rounded-2xl w-12"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : gigs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
                        {gigs.map((gig: any) => (
                            <GigCard key={gig._id} gig={gig} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40 bg-card rounded-[5rem] border border-border shadow-3xl relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="w-28 h-28 bg-background rounded-[3rem] flex items-center justify-center mb-12 shadow-2xl shadow-primary/5 opacity-40">
                                <Search className="w-12 h-12 text-foreground" />
                            </div>
                            <h2 className="text-4xl font-black text-foreground mb-4 tracking-tighter">Inventory Exhausted.</h2>
                            <p className="text-foreground/40 font-medium text-lg max-w-sm mx-auto mb-12">No matching protocols found in current sync. Adjust your search parameters or check global filters.</p>
                            <button
                                onClick={() => { setSearch(''); setCategory(''); }}
                                className="bg-primary text-white px-12 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-primary/20 active:scale-95"
                            >
                                Reset Exploration
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GigsPage;
