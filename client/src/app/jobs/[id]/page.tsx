'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Briefcase, DollarSign, Clock, MessageSquare, ChevronRight, User, Shield, Zap, ArrowRight, X } from 'lucide-react';

const JobDetailsPage = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const router = useRouter();
    const [job, setJob] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isEstablishingLink, setIsEstablishingLink] = useState(false);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`https://freelancer-app-jvlw.onrender.com/api/jobs/${id}`);
                const data = await response.json();
                setJob(data);
            } catch (error) {
                console.error('Error fetching job:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchJob();
    }, [id]);

    const handleEstablishLink = async () => {
        if (!user) {
            router.push('/login');
            return;
        }

        setIsEstablishingLink(true);
        try {
            const response = await fetch('https://freelancer-app-jvlw.onrender.com/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    receiverId: job.client._id,
                    text: `System Alert: Operator has initialized communication regarding your requirement: "${job.title}".`
                })
            });

            if (response.ok) {
                router.push(`/chat?userId=${job.client._id}`);
            }
        } catch (error) {
            console.error('Error establishing link:', error);
        } finally {
            setIsEstablishingLink(false);
        }
    };

    if (isLoading) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-8">
                <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                <p className="font-black text-xs uppercase tracking-[0.4em] text-foreground/20 animate-pulse">Syncing Requirement...</p>
            </div>
        </div>
    );

    if (!job) return (
        <div className="min-h-screen flex items-center justify-center bg-background p-6">
            <div className="text-center max-w-lg p-12 bg-card rounded-[4rem] border border-border shadow-2xl relative overflow-hidden">
                <h1 className="text-4xl font-black text-foreground mb-4 tracking-tighter">Null Index</h1>
                <p className="text-foreground/40 font-medium mb-12">The requested job protocol does not exist or has been decommissioned.</p>
                <button onClick={() => router.push('/dashboard')} className="w-full bg-primary text-white p-5 rounded-2xl font-black">Back to Hub</button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen py-32 px-6 md:px-12 bg-background relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] -mr-96 -mt-96" />

            <div className="container mx-auto max-w-5xl relative z-10">
                <nav className="flex items-center gap-3 text-[10px] font-black text-foreground/40 mb-12 uppercase tracking-[0.3em]">
                    <span className="hover:text-accent cursor-pointer transition-colors" onClick={() => router.push('/dashboard')}>Terminal Hub</span>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-foreground">Job Protocol v{id?.slice(-4)}</span>
                </nav>

                <div className="flex flex-col lg:flex-row gap-16">
                    <div className="flex-grow">
                        <div className="bg-card rounded-[4rem] border border-border shadow-3xl p-12 md:p-16 mb-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-12">
                                <div className="bg-accent/10 text-accent px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-accent/20">
                                    Open Protocol
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-2 h-10 bg-accent rounded-full" />
                                <span className="text-accent font-black text-sm uppercase tracking-[0.3em]">{job.category}</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-black text-foreground mb-12 tracking-tighter leading-none">{job.title}</h1>

                            <div className="text-foreground/60 font-medium text-xl leading-relaxed mb-16 space-y-8">
                                {job.description.split('\n').map((p: string, i: number) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 pt-12 border-t border-border">
                                <div>
                                    <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest mb-2">Total Budget</p>
                                    <p className="text-2xl font-black text-foreground">${job.budget}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest mb-2">Sync Status</p>
                                    <p className="text-2xl font-black text-accent uppercase italic">Active</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest mb-2">Timeline</p>
                                    <p className="text-2xl font-black text-foreground italic flex items-center gap-2"><Clock className="w-5 h-5" /> ASAP</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:w-80 shrink-0">
                        <div className="sticky top-32 space-y-12">
                            <div className="bg-card rounded-[3.5rem] border border-border p-10 shadow-3xl">
                                <h3 className="text-sm font-black text-foreground uppercase tracking-widest mb-8 pb-4 border-b border-border">Network Origin</h3>
                                <div className="flex items-center gap-5 mb-10">
                                    <div className="w-14 h-14 bg-foreground/5 rounded-2xl flex items-center justify-center text-foreground/20 font-black text-2xl border border-border">
                                        {job.client.username[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-foreground leading-tight uppercase">{job.client.username}</p>
                                        <p className="text-[8px] font-bold text-foreground/20 uppercase tracking-widest mt-1">Verified Client Node</p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleEstablishLink}
                                    disabled={isEstablishingLink}
                                    className="w-full bg-foreground text-card py-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent hover:shadow-2xl hover:shadow-accent/40 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                >
                                    <MessageSquare className="w-5 h-5" />
                                    {isEstablishingLink ? 'Syncing...' : 'Establish Link'}
                                </button>
                            </div>

                            <div className="bg-accent text-black p-12 rounded-[3.5rem] relative overflow-hidden group shadow-2xl">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -mr-20 -mt-20 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                                <Zap className="w-10 h-10 mb-6" fill="black" />
                                <h4 className="text-2xl font-black tracking-tighter mb-4 uppercase">Elite Selection</h4>
                                <p className="text-[10px] font-bold leading-relaxed opacity-60 uppercase tracking-widest">Only operators with rating &gt; 9.5 and AES-256 clearance can apply for this protocol.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailsPage;
