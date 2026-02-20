'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Lock, ShieldCheck, Briefcase, Zap, CheckCircle2, ArrowRight } from 'lucide-react';

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<'client' | 'freelancer'>('client');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, role }),
            });

            const data = await response.json();

            if (response.ok) {
                login(data);
            } else {
                setError(data.message || 'Registration failure');
            }
        } catch (err) {
            setError('Synchronization interrupted. Please retry.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-background relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full -mr-96 -mt-96 blur-[150px]"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full -ml-80 -mb-80 blur-[130px]"></div>

            <div className="w-full max-w-2xl relative z-10 py-16">
                <div className="bg-card rounded-[5rem] shadow-3xl border border-border overflow-hidden">
                    <div className="p-10 md:p-20">
                        <div className="text-center mb-16">
                            <span className="text-primary font-black text-[10px] uppercase tracking-[0.5em] mb-6 block underline underline-offset-8 decoration-2">Onboarding v2.0</span>
                            <h1 className="text-5xl md:text-6xl font-black text-foreground mb-4 tracking-tighter leading-none">Join the <span className="text-primary italic">Protocol.</span></h1>
                            <p className="text-foreground/40 font-medium text-lg mt-6">Establish your digital identity to start architecting greatness.</p>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 text-red-500 p-8 rounded-[2.5rem] mb-12 text-xs font-black border border-red-500/20 flex items-center gap-6 uppercase tracking-widest animate-shake">
                                <span className="text-2xl animate-pulse">⚠️</span>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-14">
                            {/* Role Selection */}
                            <div className="grid grid-cols-2 gap-8">
                                <button
                                    type="button"
                                    onClick={() => setRole('client')}
                                    className={`relative p-10 rounded-[3rem] border-2 transition-all flex flex-col items-center gap-6 group ${role === 'client'
                                        ? 'border-primary bg-primary text-card shadow-2xl shadow-primary/30 scale-105'
                                        : 'border-border bg-background text-foreground/40 hover:border-primary/50'
                                        }`}
                                >
                                    <div className={`p-5 rounded-2xl transition-all duration-500 ${role === 'client' ? 'bg-card/20 text-card' : 'bg-foreground/5 text-foreground/20'}`}>
                                        <Briefcase className="w-8 h-8" />
                                    </div>
                                    <div className="font-black text-[10px] uppercase tracking-[0.4em] text-center">I Seek <br />Talent</div>
                                    {role === 'client' && <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-accent animate-bounce" fill="white" />}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('freelancer')}
                                    className={`relative p-10 rounded-[3rem] border-2 transition-all flex flex-col items-center gap-6 group ${role === 'freelancer'
                                        ? 'border-primary bg-primary text-card shadow-2xl shadow-primary/30 scale-105'
                                        : 'border-border bg-background text-foreground/40 hover:border-primary/50'
                                        }`}
                                >
                                    <div className={`p-5 rounded-2xl transition-all duration-500 ${role === 'freelancer' ? 'bg-card/20 text-card' : 'bg-foreground/5 text-foreground/20'}`}>
                                        <Zap className="w-8 h-8" />
                                    </div>
                                    <div className="font-black text-[10px] uppercase tracking-[0.4em] text-center">I Offer <br />Mastery</div>
                                    {role === 'freelancer' && <CheckCircle2 className="absolute top-4 right-4 w-6 h-6 text-accent animate-bounce" fill="white" />}
                                </button>
                            </div>

                            <div className="space-y-10">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                    <div className="group">
                                        <div className="flex justify-between items-center mb-4 px-4">
                                            <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.3em] group-focus-within:text-primary transition-colors">Digital Handle</label>
                                            <User className="w-4 h-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                        </div>
                                        <input
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            className="w-full bg-background/50 px-10 py-6 rounded-2xl border-2 border-border focus:border-primary focus:bg-card outline-none transition-all font-black text-foreground placeholder:text-foreground/10"
                                            placeholder="alias_x7"
                                            required
                                        />
                                    </div>
                                    <div className="group">
                                        <div className="flex justify-between items-center mb-4 px-4">
                                            <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.3em] group-focus-within:text-primary transition-colors">Transmission Hub</label>
                                            <Mail className="w-4 h-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                        </div>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-background/50 px-10 py-6 rounded-2xl border-2 border-border focus:border-primary focus:bg-card outline-none transition-all font-black text-foreground placeholder:text-foreground/10"
                                            placeholder="identity@net.org"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="group">
                                    <div className="flex justify-between items-center mb-4 px-4">
                                        <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.3em] group-focus-within:text-primary transition-colors">Access Phrase</label>
                                        <Lock className="w-4 h-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-background/50 px-10 py-6 rounded-2xl border-2 border-border focus:border-primary focus:bg-card outline-none transition-all font-black text-foreground placeholder:text-foreground/10"
                                        placeholder="••••••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="bg-background/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-border shadow-inner">
                                <p className="text-[10px] text-foreground/30 font-bold leading-relaxed text-center italic">
                                    Initialization of this handle signifies consensus with our <Link href="#" className="text-primary hover:underline underline-offset-4 decoration-2">Protocol Directives</Link> and <Link href="#" className="text-primary hover:underline underline-offset-4 decoration-2">Privacy Encryption Standards</Link>.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-foreground text-card py-8 rounded-[2.5rem] font-black text-sm uppercase tracking-[0.4em] hover:bg-primary hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_30px_60px_-15px_rgba(37,99,235,0.3)] active:scale-95 flex items-center justify-center gap-6 group relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-4">
                                    {isLoading ? 'Synchronizing Node...' : 'Broadcast Identity'}
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                            </button>
                        </form>

                        <div className="mt-20 flex items-center gap-8">
                            <div className="h-px grow bg-border"></div>
                            <span className="text-[10px] font-black text-foreground/10 uppercase tracking-[0.6em] whitespace-nowrap">Node Exists?</span>
                            <div className="h-px grow bg-border"></div>
                        </div>

                        <div className="mt-14 text-center">
                            <Link
                                href="/login"
                                className="inline-block px-14 py-6 rounded-[2.2rem] border-2 border-border font-black text-[10px] uppercase tracking-[0.4em] text-foreground hover:border-primary hover:text-primary transition-all group"
                            >
                                Authenticate <span className="text-foreground/20 group-hover:text-primary ml-1">Terminal</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center mt-12 gap-5 opacity-40 group hover:opacity-100 transition-opacity">
                    <div className="flex gap-3">
                        <ShieldCheck className="w-5 h-5 text-accent" />
                        <p className="text-[10px] font-black text-foreground uppercase tracking-[0.5em]">
                            Cryptographic Hash Verification Sync Active
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
