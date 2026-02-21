'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Rocket, ShieldAlert, ArrowLeft, Send, Image as ImageIcon, Plus, Clock, DollarSign, Layers } from 'lucide-react';
import Link from 'next/link';

const CreateGigPage = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Web Development',
        price: '',
        deliveryTime: '',
        images: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useAuth();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('https://freelancer-app-jvlw.onrender.com/api/gigs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price),
                    deliveryTime: Number(formData.deliveryTime),
                    images: formData.images.split(',').map(img => img.trim()).filter(img => img !== ''),
                }),
            });

            if (response.ok) {
                router.push('/dashboard');
            } else {
                const data = await response.json();
                setError(data.message || 'Failed to initialize protocol');
            }
        } catch (err) {
            setError('System synchronization failed. Please retry.');
        } finally {
            setIsLoading(false);
        }
    };

    if (user?.role !== 'freelancer') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background px-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-red-500/5 rounded-full blur-3xl opacity-50" />
                <div className="text-center max-w-lg p-12 bg-card rounded-[4rem] border border-border shadow-2xl relative z-10">
                    <div className="w-24 h-24 bg-red-500/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 text-red-500 shadow-xl border border-red-500/10">
                        <ShieldAlert className="w-12 h-12" />
                    </div>
                    <h1 className="text-4xl font-black text-foreground mb-4 tracking-tighter uppercase">Access Segregated</h1>
                    <p className="text-foreground/40 font-medium mb-12 leading-relaxed text-lg">Only authenticated freelancers can publish protocols on the global registry. Please upgrade your status to proceed.</p>
                    <Link
                        href="/"
                        className="w-full bg-foreground text-card px-10 py-5 rounded-2xl font-black hover:bg-primary transition-all shadow-xl block text-center uppercase tracking-widest text-sm"
                    >
                        Return to Hub
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-24 px-6 md:px-12 bg-background relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -mr-80 -mt-80" />

            <div className="container mx-auto max-w-5xl relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-12">
                    <div className="text-center md:text-left">
                        <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-6 block underline">Logistics Center</span>
                        <h1 className="text-5xl md:text-7xl font-black text-foreground mb-4 tracking-tighter leading-[0.9]">Publish <br /><span className="text-primary">Protocol.</span></h1>
                        <p className="text-foreground/40 font-medium text-xl max-w-md mt-6">Specify your execution parameters and synchronize your service with the global marketplace.</p>
                    </div>
                    <div className="hidden lg:block relative group">
                        <div className="flex -space-x-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className={`w-14 h-14 rounded-2xl border-4 border-card bg-foreground/5 flex items-center justify-center font-black text-xs text-foreground/20 transition-all ${i === 1 ? 'border-primary ring-4 ring-primary/20 text-primary' : ''}`}>
                                    0{i}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="bg-card rounded-[5rem] shadow-3xl border border-border overflow-hidden">
                    <div className="bg-foreground p-10 md:p-14 text-background relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full -mr-40 -mt-40 blur-3xl opacity-20 animate-pulse"></div>
                        <div className="relative z-10 flex items-center gap-8">
                            <div className="w-20 h-20 bg-background/10 rounded-[2rem] flex items-center justify-center text-primary shadow-2xl border border-white/5">
                                <Plus className="w-10 h-10" strokeWidth={3} />
                            </div>
                            <div>
                                <h2 className="text-3xl font-black tracking-tighter uppercase">Protocol Definition</h2>
                                <p className="text-background/40 font-bold text-sm tracking-widest mt-1">v4.0 SYNCING ACTIVE</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 md:p-20">
                        {error && (
                            <div className="bg-red-500/10 text-red-500 p-8 rounded-[2.5rem] mb-16 text-xs font-black border border-red-500/20 flex items-center gap-6 uppercase tracking-[0.2em]">
                                <ShieldAlert className="w-8 h-8" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-16">
                            <div className="space-y-12">
                                <div className="group">
                                    <div className="flex justify-between items-center mb-6 px-4">
                                        <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.3em] group-focus-within:text-primary transition-colors">Protocol Identity</label>
                                        <Layers className="w-5 h-5 text-foreground/20 group-focus-within:text-primary" />
                                    </div>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        className="w-full bg-background/50 px-10 py-8 rounded-[2.8rem] border-2 border-border focus:border-primary focus:bg-card outline-none transition-all font-black text-foreground placeholder:text-foreground/10 text-2xl shadow-inner tracking-tighter"
                                        placeholder="I will architect your next world-class web platform"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                    <div className="group">
                                        <label className="block text-[10px] font-black text-foreground/40 mb-6 px-4 uppercase tracking-[0.3em] group-focus-within:text-primary transition-colors">Sector / Category</label>
                                        <div className="relative">
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                className="w-full bg-background/50 px-10 py-8 rounded-[2rem] border-2 border-border focus:border-primary focus:bg-card outline-none transition-all font-black text-foreground appearance-none shadow-inner"
                                            >
                                                <option>Web Development</option>
                                                <option>Graphic Design</option>
                                                <option>AI Services</option>
                                                <option>Video Editing</option>
                                                <option>Marketing</option>
                                                <option>Writing</option>
                                            </select>
                                            <div className="absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none text-foreground/20">
                                                <Rocket className="w-6 h-6 rotate-45" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="group">
                                            <label className="block text-[10px] font-black text-foreground/40 mb-6 px-4 uppercase tracking-[0.3em] group-focus-within:text-primary transition-colors">Stake ($)</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    name="price"
                                                    value={formData.price}
                                                    onChange={handleChange}
                                                    className="w-full bg-background/50 px-10 py-8 rounded-[2rem] border-2 border-border focus:border-primary focus:bg-card outline-none transition-all font-black text-foreground placeholder:text-foreground/10 shadow-inner"
                                                    placeholder="0.00"
                                                    required
                                                />
                                                <DollarSign className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20" />
                                            </div>
                                        </div>
                                        <div className="group">
                                            <label className="block text-[10px] font-black text-foreground/40 mb-6 px-4 uppercase tracking-[0.3em] group-focus-within:text-primary transition-colors">Cycles (Days)</label>
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    name="deliveryTime"
                                                    value={formData.deliveryTime}
                                                    onChange={handleChange}
                                                    className="w-full bg-background/50 px-10 py-8 rounded-[2rem] border-2 border-border focus:border-primary focus:bg-card outline-none transition-all font-black text-foreground placeholder:text-foreground/10 shadow-inner"
                                                    placeholder="00"
                                                    required
                                                />
                                                <Clock className="absolute right-8 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/20" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="group">
                                    <label className="block text-[10px] font-black text-foreground/40 mb-6 px-4 uppercase tracking-[0.3em] group-focus-within:text-primary transition-colors">Protocol Specs / Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={8}
                                        className="w-full bg-background/50 px-10 py-10 rounded-[3.5rem] border-2 border-border focus:border-primary focus:bg-card outline-none transition-all font-bold text-foreground placeholder:text-foreground/10 leading-relaxed shadow-inner resize-none text-lg"
                                        placeholder="Define your execution workflow and unique contribution to the sector..."
                                        required
                                    />
                                </div>

                                <div className="group">
                                    <div className="flex justify-between items-center mb-6 px-4">
                                        <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.3em] group-focus-within:text-primary transition-colors">Asset Sync (Image URLs)</label>
                                        <ImageIcon className="w-5 h-5 text-foreground/20 group-focus-within:text-primary" />
                                    </div>
                                    <input
                                        type="text"
                                        name="images"
                                        value={formData.images}
                                        onChange={handleChange}
                                        className="w-full bg-background/50 px-10 py-8 rounded-[2rem] border-2 border-border focus:border-primary focus:bg-card outline-none transition-all font-black text-foreground placeholder:text-foreground/10 shadow-inner"
                                        placeholder="https://assets.net/preview-1.jpg, https://assets.net/preview-2.jpg"
                                    />
                                    <div className="mt-6 flex items-center gap-4 px-6 text-[10px] font-black text-foreground/20 uppercase tracking-[0.2em] italic">
                                        <span className="w-2 h-2 bg-primary animate-pulse rounded-full" />
                                        Comma separated direct image paths required for global render.
                                    </div>
                                </div>
                            </div>

                            <div className="pt-20 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-8">
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    className="px-10 py-5 rounded-2xl font-black text-foreground/40 hover:text-foreground transition-all text-xs uppercase tracking-widest flex items-center gap-3 group"
                                >
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    Recall Operation
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="bg-primary text-white px-20 py-8 rounded-[2.5rem] font-black text-xl hover:scale-[1.03] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-3xl shadow-primary/25 flex items-center justify-center gap-6 active:scale-95 group relative overflow-hidden"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Establishing...
                                        </>
                                    ) : (
                                        <>
                                            Finalize & Broadcast
                                            <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </>
                                    )}
                                    <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateGigPage;
