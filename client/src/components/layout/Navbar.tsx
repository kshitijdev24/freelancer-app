'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon, Search, LogOut, LayoutDashboard, User, Briefcase, Plus, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const ThemeToggle = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => setMounted(true), []);

    if (!mounted) return <div className="p-2 w-10 h-10" />;

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2.5 rounded-xl bg-background border border-border hover:border-primary transition-all duration-300 transform active:scale-95"
            aria-label="Toggle theme"
        >
            {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-accent" />
            ) : (
                <Moon className="w-5 h-5 text-primary" />
            )}
        </button>
    );
};

const Navbar = () => {
    const { user, logout } = useAuth();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`sticky top-0 z-50 w-full transition-all duration-300 ${isScrolled
            ? 'bg-card/80 backdrop-blur-lg border-b border-border shadow-sm py-3'
            : 'bg-transparent py-5'
            }`}>
            <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
                <div className="flex items-center gap-12">
                    <Link href="/" className="group flex items-center gap-2.5">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform duration-500">
                            f
                        </div>
                        <span className="text-2xl font-black text-foreground tracking-tight">
                            freeLance<span className="text-primary">.</span>
                        </span>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8">
                        <Link href="/gigs" className="flex items-center gap-2 text-sm font-bold text-foreground/60 hover:text-primary transition-colors py-2 group">
                            <Search className="w-4 h-4" />
                            Explore marketplace
                        </Link>
                        <Link href="/jobs" className="flex items-center gap-2 text-sm font-bold text-foreground/60 hover:text-accent transition-colors py-2 group">
                            <Briefcase className="w-4 h-4" />
                            Browse Jobs
                        </Link>
                        <Link href="/chat" className="flex items-center gap-2 text-sm font-bold text-foreground/60 hover:text-primary transition-colors py-2 group">
                            <MessageSquare className="w-4 h-4" />
                            Secure Comms
                        </Link>
                        {user && (
                            <Link href="/dashboard" className="flex items-center gap-2 text-sm font-bold text-foreground/60 hover:text-primary transition-colors py-2 group">
                                <LayoutDashboard className="w-4 h-4" />
                                Dashboard
                            </Link>
                        )}
                        {user?.role === 'freelancer' && (
                            <Link href="/gigs/create" className="flex items-center gap-2 text-sm font-bold text-foreground/60 hover:text-primary transition-colors py-2 group">
                                <Plus className="w-4 h-4" />
                                Post a service
                            </Link>
                        )}
                        {user?.role === 'client' && (
                            <Link href="/jobs/create" className="flex items-center gap-2 text-sm font-bold text-foreground/60 hover:text-primary transition-colors py-2 group">
                                <Briefcase className="w-4 h-4" />
                                Post a requirement
                            </Link>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <ThemeToggle />

                    <div className="h-6 w-px bg-border hidden md:block" />

                    {user ? (
                        <div className="flex items-center gap-5">
                            <div className="group relative">
                                <button className="flex items-center gap-3 p-1 rounded-2xl border-2 border-transparent hover:border-primary/20 transition-all duration-300">
                                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black text-lg border border-primary/20">
                                        {user.username[0].toUpperCase()}
                                    </div>
                                    <div className="text-left hidden sm:block pr-2">
                                        <p className="text-xs font-black text-foreground leading-tight">{user.username}</p>
                                        <p className="text-[10px] font-bold text-accent uppercase tracking-tighter">{user.role}</p>
                                    </div>
                                </button>

                                <div className="absolute right-0 top-full mt-3 w-56 bg-card rounded-[2rem] shadow-2xl border border-border p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    <div className="mb-2 px-4 py-3 bg-foreground/5 rounded-2xl">
                                        <p className="text-xs font-black text-foreground capitalize truncate">{user.username}</p>
                                        <p className="text-[10px] font-bold text-foreground/50 truncate">Workspace Active</p>
                                    </div>

                                    <Link href="/dashboard" className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-foreground/5 text-sm font-bold text-foreground transition-colors group/link">
                                        <LayoutDashboard className="w-4 h-4 text-foreground/40 group-hover/link:text-primary" />
                                        Dashboard
                                    </Link>
                                    <Link href="/profile" className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-foreground/5 text-sm font-bold text-foreground transition-colors group/link">
                                        <User className="w-4 h-4 text-foreground/40 group-hover/link:text-primary" />
                                        Account Settings
                                    </Link>
                                    <div className="h-px bg-border my-2" />
                                    <button
                                        onClick={logout}
                                        className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-red-500/10 text-sm font-bold text-red-500 transition-colors group/link"
                                    >
                                        <LogOut className="w-4 h-4 text-red-500/40 group-hover/link:text-red-500" />
                                        Initialize Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/login" className="px-6 py-3 text-sm font-bold text-foreground/60 hover:text-foreground transition-colors">
                                Sign In
                            </Link>
                            <Link
                                href="/register"
                                className="bg-primary text-white px-8 py-3.5 rounded-2xl font-black text-sm hover:translate-y-[-2px] hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 active:scale-95"
                            >
                                Join Now
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
