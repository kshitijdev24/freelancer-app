'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
    Briefcase,
    ArrowRight,
    Sparkles,
    DollarSign,
    Layers,
    Zap,
    MessageSquare,
    Terminal,
    Rocket
} from 'lucide-react';
import Link from 'next/link';

const PostJobPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        budget: '',
        category: 'Development'
    });

    const categories = [
        'Development',
        'Creative',
        'Intelligence',
        'Protocol Design',
        'Network Management',
        'Data Synthesis'
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || user.role !== 'client') {
            setError('Client-level clearance required for this protocol.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3000/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user?.token}`
                },
                body: JSON.stringify({
                    ...formData,
                    budget: Number(formData.budget)
                }),
            });

            if (response.ok) {
                router.push('/dashboard');
            } else {
                const data = await response.json();
                setError(data.message || 'Transmission failed.');
            }
        } catch (err) {
            setError('Synchronization error. Check your uplink.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!user || user.role !== 'client') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-6">
                <div className="max-w-7xl w-full flex flex-col items-center">
                    <div className="bg-card p-16 rounded-[4rem] border-2 border-primary/20 shadow-3xl text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
                        <Terminal className="w-16 h-16 text-primary mx-auto mb-10" />
                        <h1 className="text-4xl font-black text-foreground mb-6 tracking-tighter">RESTRICTED ACCESS</h1>
                        <p className="text-foreground/40 font-medium text-xl mb-12 max-w-sm mx-auto leading-relaxed italic">Unauthorized node detected. Only client-tier operators can post project requirements.</p>
                        <Link href="/dashboard" className="inline-block bg-primary text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-2xl shadow-primary/25">Return to Sync</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-40 pb-24 px-6 md:px-12 bg-background relative overflow-hidden">
            {/* Design Elements */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -mr-96 -mt-96" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] -ml-96 -mb-96" />

            <div className="container mx-auto max-w-5xl relative z-10">
                <div className="flex flex-col lg:flex-row gap-24">
                    {/* Header Info */}
                    <div className="lg:w-2/5">
                        <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-6 block underline underline-offset-8">Acquisition Protocol</span>
                        <h1 className="text-6xl md:text-7xl font-black text-foreground mb-10 tracking-tighter leading-[0.9]">Initialize <br /><span className="text-primary">Requirement.</span></h1>
                        <p className="text-foreground/40 font-medium text-xl mb-12 leading-relaxed">Broadcast your operational needs to our network of specialized elite nodes. Precision execution guaranteed.</p>

                        <div className="space-y-8">
                            {[
                                { title: 'Broadcast Signal', icon: <Zap className="w-5 h-5" />, desc: 'Instantly notify all matched operators.' },
                                { title: 'Signal Integrity', icon: <Sparkles className="w-5 h-5" />, desc: 'Only vetted nodes can bid on your protocol.' },
                                { title: 'Network Escrow', icon: <Briefcase className="w-5 h-5" />, desc: 'Funds held in standardized execution protocols.' }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 items-start group">
                                    <div className="w-12 h-12 bg-card border border-border rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h4 className="font-black text-foreground text-sm uppercase tracking-widest mb-1">{item.title}</h4>
                                        <p className="text-xs font-bold text-foreground/30">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form */}
                    <div className="lg:w-3/5">
                        <div className="bg-card p-12 md:p-16 rounded-[4rem] border border-border shadow-3xl relative">
                            {error && (
                                <div className="bg-red-500/10 text-red-500 p-8 rounded-3xl mb-10 text-xs font-black border border-red-500/20 flex items-center gap-4 uppercase tracking-widest">
                                    <span>⚠️</span> {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-12">
                                <div className="space-y-4">
                                    <div className="flex justify-between px-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30">Protocol Identifier</label>
                                        <Layers className="w-4 h-4 text-foreground/10" />
                                    </div>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full bg-background border-2 border-border p-8 rounded-[2.5rem] font-black text-lg focus:border-primary outline-none transition-all placeholder:text-foreground/10"
                                        placeholder="Project Designation..."
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30 px-2">Liquidity Target ($)</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20" />
                                            <input
                                                type="number"
                                                value={formData.budget}
                                                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                                className="w-full bg-background border-2 border-border p-8 pl-16 rounded-[2.5rem] font-black text-lg focus:border-primary outline-none transition-all"
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30 px-2">Domain Sector</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                            className="w-full bg-background border-2 border-border p-8 rounded-[2.5rem] font-black text-lg focus:border-primary outline-none transition-all appearance-none cursor-pointer"
                                        >
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between px-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/30">Execution Logistics</label>
                                        <Rocket className="w-4 h-4 text-foreground/10" />
                                    </div>
                                    <textarea
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        className="w-full bg-background border-2 border-border p-8 rounded-[2.5rem] font-black text-lg focus:border-primary outline-none transition-all min-h-[200px] resize-none"
                                        placeholder="Detailed protocol parameters..."
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-foreground text-background py-8 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.4em] hover:bg-primary hover:text-white transition-all shadow-2xl shadow-foreground/20 flex items-center justify-center gap-6 group disabled:opacity-50"
                                >
                                    {isLoading ? 'Synchronizing Node...' : 'Initialize Broadcast'}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostJobPage;
