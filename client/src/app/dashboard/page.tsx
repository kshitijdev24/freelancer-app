'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import GigCard from '@/components/gig/GigCard';
import JobCard from '@/components/gig/JobCard';
import Link from 'next/link';
import {
    BarChart3,
    Package,
    MessageSquare,
    Settings,
    Plus,
    Activity,
    Zap,
    Gem,
    Lock,
    LayoutGrid,
    TrendingUp,
    Globe,
    Briefcase
} from 'lucide-react';

const DashboardPage = () => {
    const { user, isLoading: authLoading } = useAuth();
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        const fetchData = async () => {
            if (!user) return;
            try {
                if (user.role === 'freelancer') {
                    const response = await fetch(`http://localhost:3000/api/gigs?owner=${user._id}`);
                    const gigs = await response.json();
                    setData({ gigs: Array.isArray(gigs) ? gigs.filter((g: any) => (g.owner?._id || g.owner) === user._id) : [] });
                } else {
                    const response = await fetch('http://localhost:3000/api/jobs/my-jobs', {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                    });
                    const jobs = await response.json();
                    setData({ jobs: Array.isArray(jobs) ? jobs : [] });
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        if (!authLoading && user) fetchData();
    }, [user, authLoading]);

    if (authLoading || isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-8">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="font-black text-xs uppercase tracking-[0.4em] text-foreground/20">Decrypting Workspace...</p>
            </div>
        </div>
    );

    if (!user) return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
            <div className="text-center max-w-lg p-12 bg-card rounded-[4rem] border border-border shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="relative z-10 flex flex-col items-center">
                    <div className="w-24 h-24 bg-foreground/5 rounded-[2.5rem] flex items-center justify-center mb-10 shadow-2xl">
                        <Lock className="w-10 h-10 text-foreground" />
                    </div>
                    <h1 className="text-4xl font-black text-foreground mb-4 tracking-tighter">Access Denied</h1>
                    <p className="text-foreground/40 font-medium mb-12 leading-relaxed text-lg">Your terminal session has expired or requires authentication. Re-establish credentials to synchronize your professional pipeline.</p>
                    <Link
                        href="/login"
                        className="w-full bg-primary text-white px-10 py-5 rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-primary/20 block text-center"
                    >
                        Initialize Handle
                    </Link>
                </div>
            </div>
        </div>
    );

    const tabs = [
        { id: 'overview', label: 'Terminal', icon: LayoutGrid },
        { id: 'orders', label: 'Pipeline', icon: Package },
        { id: 'jobs', label: 'Proposals', icon: Briefcase },
        { id: 'messages', label: 'Comms', icon: MessageSquare },
        { id: 'settings', label: 'Config', icon: Settings }
    ];

    return (
        <div className="min-h-screen py-24 px-6 md:px-12 bg-background relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -mr-96 -mt-96" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] -ml-96 -mb-96" />

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row gap-20">
                    {/* Sidebar */}
                    <div className="lg:w-[30%]">
                        <div className="bg-card rounded-[4.5rem] p-10 shadow-3xl border border-border sticky top-32">
                            <div className="flex flex-col items-center mb-16 text-center">
                                <div className="relative group mb-8">
                                    <div className="absolute inset-0 bg-primary/20 rounded-[3rem] blur-2xl opacity-20 transform scale-90 group-hover:scale-110 transition-transform"></div>
                                    <div className="relative w-32 h-32 bg-card border-2 border-primary rounded-[2.8rem] flex items-center justify-center p-2 shadow-2xl">
                                        <div className="w-full h-full bg-primary/10 rounded-[2.2rem] flex items-center justify-center text-primary text-5xl font-black">
                                            {user.username[0].toUpperCase()}
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 bg-accent text-card p-3 rounded-2xl border-4 border-card shadow-2xl">
                                        <Activity className="w-5 h-5" strokeWidth={3} />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-3xl font-black text-foreground tracking-tighter mb-2">{user.username}</h2>
                                    <div className="flex items-center gap-2 justify-center">
                                        <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                                        <span className="text-accent font-black text-[10px] uppercase tracking-[0.4em]">{user.role} v2.0</span>
                                    </div>
                                </div>
                            </div>

                            <nav className="space-y-4">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-5 px-10 py-5 rounded-[2.2rem] font-black text-xs uppercase tracking-[0.2em] transition-all group ${activeTab === tab.id
                                            ? 'bg-foreground text-card shadow-2xl shadow-foreground/20 scale-105'
                                            : 'text-foreground/30 hover:bg-foreground/5 hover:text-foreground'
                                            }`}
                                    >
                                        <tab.icon className={`w-5 h-5 transition-transform ${activeTab === tab.id ? 'scale-110' : 'group-hover:translate-x-1'}`} strokeWidth={3} />
                                        {tab.label}
                                    </button>
                                ))}
                            </nav>

                            <div className="mt-12 pt-12 border-t border-border">
                                <div className="bg-background/50 rounded-3xl p-6 border border-border">
                                    <div className="flex justify-between items-center mb-4">
                                        <span className="text-[9px] font-black text-foreground/30 uppercase tracking-[0.3em]">Network Trust</span>
                                        <TrendingUp className="w-4 h-4 text-accent" />
                                    </div>
                                    <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                                        <div className="h-full w-4/5 bg-accent" />
                                    </div>
                                    <p className="mt-4 text-[10px] font-bold text-foreground/40 leading-tight">Optimized node performance detected.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:w-[70%]">
                        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8">
                            <div className="text-center md:text-left">
                                <span className="text-primary font-black text-[10px] uppercase tracking-[0.5em] mb-4 block underline underline-offset-8">Workspace Sync</span>
                                <h1 className="text-5xl md:text-7xl font-black text-foreground mb-2 tracking-tighter leading-[0.9]">Operational <br /><span className="text-primary">Intelligence.</span></h1>
                                <p className="text-foreground/40 font-medium text-xl leading-relaxed mt-6">Secure real-time metrics of your marketplace contribution.</p>
                            </div>
                            {user.role === 'freelancer' ? (
                                <Link href="/gigs/create" className="bg-primary text-white px-10 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-primary/30 flex items-center gap-4 group">
                                    <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center group-hover:rotate-90 transition-transform">
                                        <Plus className="w-5 h-5" strokeWidth={3} />
                                    </div>
                                    Publish Protocol
                                </Link>
                            ) : (
                                <Link href="/jobs/create" className="bg-accent text-card px-10 py-6 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-accent/30 flex items-center gap-4 group">
                                    <div className="w-8 h-8 bg-black/10 rounded-xl flex items-center justify-center group-hover:rotate-90 transition-transform">
                                        <Plus className="w-5 h-5" strokeWidth={3} />
                                    </div>
                                    Broadcast Job
                                </Link>
                            )}
                        </div>

                        {activeTab === 'overview' && (
                            <div className="space-y-24">
                                {/* Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                    {[
                                        { label: 'Total Cycles', value: '08', icon: Package, color: 'text-primary', bg: 'bg-primary/10' },
                                        { label: 'Active Streams', value: '03', icon: Zap, color: 'text-accent', bg: 'bg-accent/10' },
                                        { label: 'Net Liquidity', value: '$840', icon: Gem, color: 'text-purple-500', bg: 'bg-purple-500/10' }
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-card p-12 rounded-[4rem] shadow-xl border border-border flex flex-col justify-between group hover:border-primary transition-colors hover:scale-[1.03] duration-500">
                                            <div className="flex justify-between items-start mb-12">
                                                <div className={`w-16 h-16 ${stat.bg} rounded-[1.5rem] flex items-center justify-center transform group-hover:rotate-12 transition-transform`}>
                                                    <stat.icon className={`w-8 h-8 ${stat.color}`} strokeWidth={3} />
                                                </div>
                                                <div className="flex gap-1">
                                                    <div className="w-1.5 h-1.5 bg-accent rounded-full animate-ping" />
                                                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-foreground/20 uppercase tracking-[0.3em] mb-3">{stat.label}</p>
                                                <h3 className="text-5xl font-black text-foreground tracking-tighter">{stat.value}</h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Content Grid */}
                                <div className="space-y-12">
                                    <div className="flex justify-between items-end border-b border-border pb-8">
                                        <div>
                                            <h2 className="text-4xl font-black text-foreground tracking-tighter">Current Inventory</h2>
                                            <p className="text-foreground/30 font-bold text-xs mt-2 uppercase tracking-[0.2em] flex items-center gap-2">
                                                <Globe className="w-4 h-4" />
                                                Public Marketplace Nodes
                                            </p>
                                        </div>
                                        <Link href="/gigs" className="bg-foreground/5 text-foreground px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Network Map</Link>
                                    </div>

                                    {user.role === 'freelancer' ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                            {data?.gigs?.map((gig: any) => (
                                                <GigCard key={gig._id} gig={gig} />
                                            ))}
                                            {(!data?.gigs || data.gigs.length === 0) && (
                                                <div className="col-span-full py-32 text-center bg-card rounded-[5rem] border-4 border-dashed border-border flex flex-col items-center group">
                                                    <div className="w-28 h-28 bg-background rounded-[3rem] flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 transition-transform">
                                                        <Plus className="w-12 h-12 text-foreground/20" />
                                                    </div>
                                                    <h3 className="text-3xl font-black text-foreground mb-3 tracking-tighter uppercase">Inventory Zero</h3>
                                                    <p className="text-foreground/40 font-medium max-w-xs mb-12 text-lg">Your workspace is currently idle. Deploy a protocol to start synchronization.</p>
                                                    <Link href="/gigs/create" className="bg-primary text-white px-12 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-primary/20">
                                                        Deploy First Protocol
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
                                            {data?.jobs?.map((job: any) => (
                                                <JobCard key={job._id} job={job} />
                                            ))}
                                            {(!data?.jobs || data.jobs.length === 0) && (
                                                <div className="col-span-full py-32 text-center bg-card rounded-[5rem] border-4 border-dashed border-border flex flex-col items-center group">
                                                    <div className="w-28 h-28 bg-background rounded-[3rem] flex items-center justify-center mb-10 shadow-2xl group-hover:scale-110 transition-transform">
                                                        <Plus className="w-12 h-12 text-foreground/20" />
                                                    </div>
                                                    <h3 className="text-3xl font-black text-foreground mb-3 tracking-tighter uppercase">Open Registry</h3>
                                                    <p className="text-foreground/40 font-medium max-w-xs mb-12 text-lg">No active requirements broadcasted. Initialize a job protocol to sync with the node network.</p>
                                                    <Link href="/jobs/create" className="bg-accent text-black px-12 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-accent/20">
                                                        Initialize Broadcast
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {activeTab !== 'overview' && (
                            <div className="py-56 text-center bg-card rounded-[6rem] border-4 border-dashed border-border flex flex-col items-center justify-center group">
                                <div className="w-24 h-24 bg-background rounded-[3rem] flex items-center justify-center text-foreground/10 mb-10 shadow-2xl border-2 border-border group-hover:scale-110 transition-transform">
                                    <Lock className="w-10 h-10" />
                                </div>
                                <h2 className="text-4xl font-black text-foreground/20 mb-4 tracking-tighter uppercase tracking-[0.3em]">Module Segregated</h2>
                                <p className="text-foreground/10 font-black text-[10px] uppercase tracking-[0.5em]">Sync protocol restricted for current session level</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
