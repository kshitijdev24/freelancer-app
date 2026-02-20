'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { User, Mail, Shield, Award, MapPin, Calendar, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

const ProfilePage = () => {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <div className="min-h-screen py-32 px-6 md:px-12 bg-background relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -mr-96 -mt-96" />

            <div className="container mx-auto max-w-5xl relative z-10">
                <div className="bg-card rounded-[4rem] border border-border shadow-3xl overflow-hidden">
                    {/* Header/Cover Area */}
                    <div className="h-48 bg-gradient-to-r from-primary/20 via-accent/10 to-primary/5 relative">
                        <div className="absolute -bottom-16 left-12">
                            <div className="w-32 h-32 bg-card rounded-[2.5rem] border-4 border-card shadow-2xl flex items-center justify-center text-primary text-5xl font-black">
                                {user.username[0].toUpperCase()}
                            </div>
                        </div>
                    </div>

                    <div className="pt-20 px-12 pb-16">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                            <div>
                                <h1 className="text-4xl font-black text-foreground tracking-tighter mb-2">{user.username}</h1>
                                <div className="flex items-center gap-4 text-foreground/40 font-bold text-xs uppercase tracking-widest">
                                    <span className="flex items-center gap-2"><Shield className="w-3 h-3 text-accent" /> Verified {user.role}</span>
                                    <span className="w-1 h-1 bg-border rounded-full" />
                                    <span className="flex items-center gap-2"><MapPin className="w-3 h-3" /> Global Node</span>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button className="bg-foreground text-card px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-primary transition-all flex items-center gap-2">
                                    <Settings className="w-4 h-4" /> Edit Profile
                                </button>
                                <button onClick={logout} className="bg-red-500/10 text-red-500 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all flex items-center gap-2">
                                    <LogOut className="w-4 h-4" /> Sign Out
                                </button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-16 pt-12 border-t border-border">
                            <div className="md:col-span-2 space-y-12">
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/20 mb-6 pb-2 border-b border-border w-fit">About Operator</h3>
                                    <p className="text-foreground/60 font-medium text-lg leading-relaxed">
                                        High-performance {user.role} node specialized in executing complex professional protocols. Dedicated to signal integrity and decentralized execution excellence.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="bg-background/50 p-8 rounded-3xl border border-border">
                                        <Award className="w-8 h-8 text-accent mb-6" />
                                        <h4 className="font-black text-foreground text-sm uppercase tracking-widest mb-2">Reputation</h4>
                                        <p className="text-2xl font-black text-foreground tracking-tighter">Gold Tier</p>
                                    </div>
                                    <div className="bg-background/50 p-8 rounded-3xl border border-border">
                                        <Calendar className="w-8 h-8 text-primary mb-6" />
                                        <h4 className="font-black text-foreground text-sm uppercase tracking-widest mb-2">Sync Status</h4>
                                        <p className="text-2xl font-black text-foreground tracking-tighter">Active</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-12">
                                <div>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-foreground/20 mb-6 pb-2 border-b border-border w-fit">Information</h3>
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-4 group">
                                            <div className="w-10 h-10 bg-foreground/5 rounded-xl flex items-center justify-center text-foreground/40 group-hover:text-primary transition-colors">
                                                <Mail className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="text-[9px] font-black text-foreground/20 uppercase tracking-widest">Digital Contact</p>
                                                <p className="text-xs font-bold text-foreground">{user.email}</p>
                                            </div>
                                        </div>
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

export default ProfilePage;
