'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Star, Shield, Zap, CheckCircle2 } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative overflow-hidden bg-background pt-24 pb-32">
            {/* Background Orbs */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse lg:block hidden" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] -ml-64 -mb-64 animate-pulse lg:block hidden" />

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-20">
                    <div className="lg:w-3/5">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full mb-8">
                            <span className="w-2 h-2 bg-primary rounded-full animate-ping" />
                            <span className="text-xs font-black uppercase tracking-widest text-primary">Marketplace protocol v2.0</span>
                        </div>

                        <h1 className="text-6xl md:text-8xl font-black leading-[1] text-foreground mb-8 tracking-tighter">
                            Hire the world's <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">elite</span> talent.
                        </h1>

                        <p className="text-xl text-foreground/60 mb-12 max-w-xl leading-relaxed font-medium">
                            A decentralized experience for high-stakes projects. No hidden fees, just pure execution from verified professionals.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-5 mb-16">
                            <Link
                                href="/gigs"
                                className="bg-primary text-white px-10 py-5 rounded-2xl font-black text-lg hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/25 transition-all text-center flex items-center justify-center gap-3 group"
                            >
                                Launch Marketplace
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <div className="flex items-center gap-5 px-6 py-4 bg-card border border-border rounded-2xl">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map((i) => (
                                        <img
                                            key={i}
                                            src={`https://i.pravatar.cc/150?u=user${i}`}
                                            alt="User"
                                            className="w-10 h-10 rounded-xl border-4 border-card object-cover"
                                        />
                                    ))}
                                    <div className="w-10 h-10 rounded-xl border-4 border-card bg-accent flex items-center justify-center text-[10px] font-black text-white">
                                        +12k
                                    </div>
                                </div>
                                <div className="h-8 w-px bg-border mx-1" />
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-accent text-accent" />
                                        <span className="text-xs font-black text-foreground">4.9/5</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-foreground/40 uppercase">Global CSAT</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-8 pt-12 border-t border-border">
                            {[
                                { icon: Shield, label: 'Secured Escrow', val: '100%' },
                                { icon: Zap, label: 'SLA Delivery', val: '24h' },
                                { icon: CheckCircle2, label: 'Vetted Talent', val: 'Top 3%' }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <item.icon className="w-4 h-4 text-primary" />
                                        <span className="text-sm font-black text-foreground tracking-tight">{item.val}</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:w-2/5 w-full relative">
                        <div className="relative aspect-square">
                            {/* Main Visual Element */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-[4rem] border border-border p-1">
                                <div className="h-full w-full bg-card rounded-[3.8rem] overflow-hidden relative group">
                                    <img
                                        src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200"
                                        className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                        alt="Abstract Tech"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

                                    {/* Floating Cards */}
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <div className="bg-card/80 backdrop-blur-xl p-6 rounded-3xl border border-border shadow-2xl">
                                            <div className="flex justify-between items-center mb-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-accent/20 rounded-xl flex items-center justify-center">
                                                        <Zap className="w-5 h-5 text-accent" />
                                                    </div>
                                                    <h4 className="font-black text-foreground">Project Pipeline</h4>
                                                </div>
                                                <span className="px-3 py-1 bg-accent/10 text-accent text-[10px] font-black rounded-lg">LIVE</span>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                                                    <div className="h-full w-3/4 bg-primary animate-pulse" />
                                                </div>
                                                <div className="flex justify-between text-[10px] font-black text-foreground/40 uppercase tracking-widest">
                                                    <span>Optimization</span>
                                                    <span>75% Synchronized</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Secondary Floating Elements */}
                            <div className="absolute -top-8 -left-8 p-6 bg-card border border-border rounded-3xl shadow-xl animate-bounce duration-[3000ms]">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white font-black">AI</div>
                                    <div>
                                        <p className="text-xs font-black text-foreground leading-tight">Expert Match</p>
                                        <p className="text-[10px] font-bold text-accent uppercase">Ready</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
