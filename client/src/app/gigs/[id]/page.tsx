'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Star, Clock, RefreshCcw, ShieldCheck, Zap, MessageCircle, ChevronRight, Share2, Heart, Database, X } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripeCheckout from '@/components/checkout/StripeCheckout';

const stripePromise = loadStripe('pk_test_51Px9X7P9yP9yP9yP9yP9yP9yP9yP9yP9yP9yP9yP9yP9yP9yP9yP9yP9yP9yP9yP9yP9yP9yP9yP9yP9yP9y');

const GigDetailsPage = () => {
    const { id } = useParams();
    const [gig, setGig] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    const router = useRouter();
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [showCheckout, setShowCheckout] = useState(false);
    const [isEstablishingLink, setIsEstablishingLink] = useState(false);

    useEffect(() => {
        const fetchGig = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/gigs/${id}`);
                const data = await response.json();
                setGig(data);
            } catch (error) {
                console.error('Error fetching gig:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGig();
    }, [id]);

    const handlePurchase = async () => {
        if (!user) {
            router.push('/login');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/payments/create-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ gigId: id })
            });
            const data = await response.json();
            if (data.clientSecret) {
                setClientSecret(data.clientSecret);
                setShowCheckout(true);
            }
        } catch (error) {
            console.error('Error starting purchase:', error);
            alert('Failed to initialize transaction protocol.');
        }
    };

    const handleEstablishLink = async () => {
        if (!user) {
            router.push('/login');
            return;
        }

        setIsEstablishingLink(true);
        try {
            const response = await fetch('http://localhost:3000/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    receiverId: gig.owner._id,
                    text: `System Alert: Protocol sync initialized for gig "${gig.title}".`
                })
            });

            if (response.ok) {
                router.push(`/chat?userId=${gig.owner._id}`);
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
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="font-black text-xs uppercase tracking-[0.4em] text-foreground/20 animate-pulse">Syncing Excellence...</p>
            </div>
        </div>
    );

    if (!gig) return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="text-center p-12 bg-card rounded-[4rem] border border-border shadow-2xl max-w-lg mx-6">
                <div className="w-24 h-24 bg-foreground/5 rounded-[2.5rem] flex items-center justify-center mx-auto mb-10 text-6xl">
                    <Database className="w-12 h-12 text-foreground/20" />
                </div>
                <h1 className="text-4xl font-black text-foreground mb-4 tracking-tighter">Null Index Exception</h1>
                <p className="text-foreground/40 font-medium mb-12">The requested protocol ID does not exist in our global registry or has been decommissioned.</p>
                <button
                    onClick={() => router.push('/gigs')}
                    className="w-full bg-primary text-white px-10 py-5 rounded-2xl font-black hover:scale-105 transition-all shadow-xl shadow-primary/20"
                >
                    Repopulate Index
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen py-24 px-6 md:px-12 bg-background relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -mr-96 -mt-96" />
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] -ml-96 -mb-96" />

            <div className="container mx-auto max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row gap-24">
                    {/* Main Content */}
                    <div className="lg:w-[62%]">
                        <nav className="flex items-center gap-3 text-[10px] font-black text-foreground/40 mb-12 uppercase tracking-[0.3em]">
                            <span className="hover:text-primary cursor-pointer transition-colors" onClick={() => router.push('/gigs')}>Protocol Registry</span>
                            <ChevronRight className="w-3 h-3" />
                            <span className="hover:text-primary cursor-pointer transition-colors" onClick={() => router.push(`/gigs?category=${gig.category}`)}>{gig.category}</span>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-foreground">v{id?.slice(-4)}</span>
                        </nav>

                        <h1 className="text-5xl md:text-7xl font-black text-foreground mb-12 leading-[1] tracking-tighter">
                            {gig.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-8 mb-16 pb-12 border-b border-border">
                            <div className="flex items-center gap-5">
                                <div className="w-16 h-16 bg-primary/10 rounded-[1.8rem] flex items-center justify-center text-primary font-black text-2xl border-2 border-primary/20">
                                    {gig.owner.username[0].toUpperCase()}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <span className="font-black text-foreground text-2xl tracking-tight">{gig.owner.username}</span>
                                        <div className="h-4 w-px bg-border"></div>
                                        <span className="text-accent font-black text-[10px] uppercase tracking-widest px-3 py-1 bg-accent/10 rounded-lg">Alpha Seller</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Star className="w-4 h-4 fill-accent text-accent" />
                                            <span className="text-foreground font-black text-sm">5.0</span>
                                        </div>
                                        <div className="w-1.5 h-1.5 bg-border rounded-full" />
                                        <span className="text-foreground/40 text-[10px] font-black uppercase tracking-widest">{gig.reviewsCount} logs submitted</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4 ml-auto">
                                <button className="p-4 bg-card border border-border rounded-2xl hover:border-primary transition-all shadow-xl shadow-primary/5">
                                    <Share2 className="w-5 h-5 text-foreground/40" />
                                </button>
                                <button className="p-4 bg-card border border-border rounded-2xl hover:border-red-500 hover:bg-red-500/5 transition-all shadow-xl shadow-primary/5">
                                    <Heart className="w-5 h-5 text-foreground/40 group-hover:text-red-500" />
                                </button>
                            </div>
                        </div>

                        <div className="relative group mb-20">
                            <div className="absolute inset-0 bg-primary/20 rounded-[4rem] blur-[80px] opacity-20 transform scale-90 group-hover:scale-100 transition-transform duration-1000"></div>
                            <div className="relative aspect-[16/10] bg-card rounded-[4rem] overflow-hidden shadow-2xl border border-border p-2">
                                <img
                                    src={gig.images[0] || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200'}
                                    alt={gig.title}
                                    className="w-full h-full object-cover rounded-[3.5rem] grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-105"
                                />
                            </div>
                        </div>

                        <div className="mb-24">
                            <div className="flex items-center gap-4 mb-10">
                                <div className="w-2 h-10 bg-primary rounded-full" />
                                <h2 className="text-4xl font-black text-foreground tracking-tighter">Protocol Description</h2>
                            </div>
                            <div className="text-foreground/60 font-medium leading-relaxed text-xl space-y-8 max-w-4xl">
                                {gig.description.split('\n').map((para: string, i: number) => (
                                    <p key={i}>{para}</p>
                                ))}
                            </div>
                        </div>

                        <div className="pt-24 border-t border-border">
                            <h2 className="text-4xl font-black text-foreground mb-12 tracking-tighter flex items-center gap-6">
                                Meet the operator
                                <div className="h-px grow bg-border" />
                            </h2>
                            <div className="bg-card p-12 md:p-16 rounded-[4rem] border border-border border-l-primary border-l-8 shadow-2xl relative overflow-hidden group hover:shadow-primary/10 transition-shadow">
                                <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full -mr-40 -mt-40 blur-3xl group-hover:scale-110 transition-transform duration-700"></div>
                                <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center md:items-start">
                                    <div className="w-32 h-32 bg-background rounded-[2.5rem] border-4 border-card flex items-center justify-center text-primary text-5xl font-black shadow-2xl shrink-0">
                                        {gig.owner.username[0].toUpperCase()}
                                    </div>
                                    <div className="text-center md:text-left">
                                        <div className="mb-8">
                                            <h3 className="text-3xl font-black text-foreground mb-2 tracking-tighter">{gig.owner.username}</h3>
                                            <p className="text-accent font-black text-[10px] uppercase tracking-[0.3em]">Verified Integration Architect</p>
                                        </div>
                                        <p className="text-foreground/50 mb-12 font-medium text-lg leading-relaxed max-w-xl">{gig.owner.description || 'Verified operator with deep technical specialization. Proven record in executing complex design and development protocols.'}</p>
                                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                                            <button
                                                onClick={handleEstablishLink}
                                                disabled={isEstablishingLink}
                                                className="bg-foreground text-card px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-primary transition-all shadow-xl flex items-center gap-3 disabled:opacity-50"
                                            >
                                                <MessageCircle className="w-5 h-5" />
                                                {isEstablishingLink ? 'Syncing...' : 'Establish Link'}
                                            </button>
                                            <button className="px-12 py-5 rounded-2xl font-black text-sm uppercase tracking-widest text-foreground hover:bg-foreground/5 transition-all border border-border">
                                                View Profile
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:w-[38%]">
                        <div className="sticky top-32 space-y-12">
                            <div className="bg-card border-2 border-border rounded-[4.5rem] p-12 shadow-3xl relative overflow-visible">
                                <div className="absolute -top-6 -right-6 w-24 h-24 bg-accent rounded-[2.5rem] flex items-center justify-center text-card rotate-12 shadow-2xl shadow-accent/40 z-20 border-4 border-card">
                                    <Zap className="w-10 h-10 fill-card" />
                                </div>

                                <div className="flex justify-between items-end mb-12">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-foreground/30 font-black text-[10px] uppercase tracking-[0.3em]">Execution Tier</span>
                                        <h3 className="text-2xl font-black text-foreground tracking-tighter uppercase">Standard</h3>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-foreground font-black text-6xl tracking-[0.2em] relative">
                                            <span className="text-2xl absolute -left-6 top-1 text-primary">$</span>
                                            {gig.price}
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-background rounded-3xl p-8 mb-12 border border-border relative group overflow-hidden">
                                    <div className="absolute inset-0 bg-primary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                    <p className="text-foreground/60 font-bold leading-relaxed text-sm relative z-10 italic">
                                        "Premium execution including core protocol assets, commercial licensing, and priority synchronization support."
                                    </p>
                                </div>

                                <div className="space-y-8 mb-16">
                                    {[
                                        { icon: Clock, label: `${gig.deliveryTime} Cycle Delivery`, val: 'Fast' },
                                        { icon: RefreshCcw, label: 'Global Iterations', val: 'Unlimited' },
                                        { icon: ShieldCheck, label: 'Encrypted Escrow', val: 'Verified' }
                                    ].map((feat, i) => (
                                        <div key={i} className="flex items-center gap-6 group/item">
                                            <div className="w-12 h-12 bg-foreground/5 rounded-2xl flex items-center justify-center text-foreground/40 group-hover/item:bg-primary/10 group-hover/item:text-primary transition-all">
                                                <feat.icon className="w-6 h-6" strokeWidth={3} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="text-foreground font-black text-sm tracking-tight">{feat.label}</span>
                                                <span className="text-[10px] font-bold text-foreground/20 uppercase tracking-widest">{feat.val}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={handlePurchase}
                                    className="w-full bg-primary text-white py-8 rounded-[2.2rem] font-black text-xl hover:scale-[1.03] transition-all shadow-2xl shadow-primary/30 mb-10 group relative overflow-hidden"
                                >
                                    <span className="relative z-10">Initialize Purchase</span>
                                    <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                                </button>

                                <div className="flex flex-col items-center gap-2 opacity-20">
                                    <span className="text-[9px] font-black text-foreground uppercase tracking-[0.5em]">Secure Protocol v3.1</span>
                                    <div className="h-px w-full bg-border" />
                                </div>
                            </div>

                            <div className="bg-foreground text-background p-16 rounded-[4.5rem] flex flex-col items-center text-center group shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20 blur-2xl" />
                                <div className="w-24 h-24 bg-background/10 rounded-[2rem] flex items-center justify-center mb-8 transform group-hover:scale-110 transition-transform duration-700">
                                    <Zap className="w-12 h-12 text-accent fill-accent" />
                                </div>
                                <h4 className="text-3xl font-black mb-4 tracking-tighter">Need Acceleration?</h4>
                                <p className="text-background/50 font-bold text-sm leading-relaxed mb-12 max-w-[240px]">
                                    Activate "Warp Delivery" for critical deadlines with 24-hour global execution.
                                </p>
                                <button className="text-accent font-black text-[10px] uppercase tracking-[0.4em] hover:text-white transition-colors border-b-2 border-accent pb-1">Establish Priority</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Checkout Modal */}
            {showCheckout && clientSecret && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-12">
                    <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={() => setShowCheckout(false)} />
                    <div className="relative w-full max-w-2xl bg-card rounded-[4rem] border border-border shadow-3xl overflow-hidden animate-in fade-in zoom-in duration-300">
                        <div className="p-12 md:p-16">
                            <div className="flex justify-between items-center mb-12">
                                <div>
                                    <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Transaction Protocol</span>
                                    <h2 className="text-4xl font-black text-foreground tracking-tighter">Finalize <br /><span className="text-primary">Acquisition.</span></h2>
                                </div>
                                <button onClick={() => setShowCheckout(false)} className="w-14 h-14 bg-foreground/5 rounded-2xl flex items-center justify-center hover:bg-red-500/10 hover:text-red-500 transition-all">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="bg-background rounded-3xl p-8 mb-12 border border-border flex justify-between items-center">
                                <div>
                                    <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest mb-1">Total Liquidity</p>
                                    <p className="text-3xl font-black text-foreground">${gig.price}.00</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest mb-1">Standard Node</p>
                                    <p className="text-xs font-bold text-primary">v7.4.2 Sync</p>
                                </div>
                            </div>

                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <StripeCheckout
                                    clientSecret={clientSecret}
                                    gigId={id as string}
                                    onSuccess={() => {
                                        setShowCheckout(false);
                                        router.push('/dashboard');
                                    }}
                                />
                            </Elements>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default GigDetailsPage;
