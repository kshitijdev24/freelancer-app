'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Lock, Mail, ArrowRight, ShieldCheck, Key } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('https://freelancer-app-jvlw.onrender.com/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                login(data);
            } else {
                setError(data.message || 'Authentication failed');
            }
        } catch (err) {
            setError('Synchronization error. Please retry.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center p-6 bg-background relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full -mr-80 -mt-80 blur-[130px]"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full -ml-80 -mb-80 blur-[130px]"></div>

            <div className="w-full max-w-lg relative z-10">
                <div className="bg-card rounded-[4.5rem] shadow-3xl border border-border overflow-hidden">
                    <div className="p-10 md:p-16">
                        <div className="text-center mb-14">
                            <span className="text-primary font-black text-[10px] uppercase tracking-[0.5em] mb-6 block underline underline-offset-8 decoration-2">Secure Link</span>
                            <h1 className="text-5xl font-black text-foreground mb-4 tracking-tighter leading-none">Welcome <br /><span className="text-primary italic">Back.</span></h1>
                            <p className="text-foreground/40 font-medium text-sm mt-6">Enter your credentials to synchronize with the marketplace.</p>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 text-red-500 p-8 rounded-[2.5rem] mb-12 text-xs font-black border border-red-500/20 flex items-center gap-6 uppercase tracking-widest">
                                <span className="text-2xl animate-pulse">⚠️</span>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-10">
                            <div className="space-y-8">
                                <div className="group">
                                    <div className="flex justify-between items-center mb-4 px-4">
                                        <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.3em] group-focus-within:text-primary transition-colors">Digital Identity</label>
                                        <Mail className="w-4 h-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-background/50 px-10 py-6 rounded-[2rem] border-2 border-border focus:border-primary focus:bg-card outline-none transition-all font-black text-foreground placeholder:text-foreground/10 text-lg shadow-inner"
                                        placeholder="email@example.net"
                                        required
                                    />
                                </div>
                                <div className="group">
                                    <div className="flex justify-between items-center mb-4 px-4">
                                        <label className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.3em] group-focus-within:text-primary transition-colors">Access Key</label>
                                        <Key className="w-4 h-4 text-foreground/20 group-focus-within:text-primary transition-colors" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-background/50 px-10 py-6 rounded-[2rem] border-2 border-border focus:border-primary focus:bg-card outline-none transition-all font-black text-foreground placeholder:text-foreground/10 text-lg shadow-inner"
                                        placeholder="••••••••"
                                        required
                                    />
                                    <div className="text-right mt-4">
                                        <Link href="#" className="inline-block text-[10px] font-black text-foreground/20 uppercase tracking-widest hover:text-primary transition-colors">Recover Protocol</Link>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-foreground text-card py-7 rounded-[2.2rem] font-black text-sm uppercase tracking-[0.3em] hover:bg-primary hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-foreground/20 active:scale-95 flex items-center justify-center gap-6 group relative overflow-hidden"
                            >
                                <span className="relative z-10 flex items-center gap-4">
                                    {isLoading ? 'Decrypting Session...' : 'Establish Connection'}
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                            </button>
                        </form>

                        <div className="mt-16 flex items-center gap-6">
                            <div className="h-px grow bg-border"></div>
                            <span className="text-[10px] font-black text-foreground/10 uppercase tracking-[0.5em] whitespace-nowrap">New Operator?</span>
                            <div className="h-px grow bg-border"></div>
                        </div>

                        <div className="mt-12 text-center">
                            <Link
                                href="/register"
                                className="inline-block px-12 py-5 rounded-[2rem] border-2 border-border font-black text-[10px] uppercase tracking-[0.3em] text-foreground hover:border-primary hover:text-primary transition-all group"
                            >
                                Register <span className="text-foreground/40 group-hover:text-primary ml-1">Terminal</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center mt-12 gap-4">
                    <div className="flex gap-2">
                        <ShieldCheck className="w-4 h-4 text-accent" />
                        <p className="text-[9px] font-black text-foreground/20 uppercase tracking-[0.4em]">
                            Standardized AES-256 Encryption Active
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
