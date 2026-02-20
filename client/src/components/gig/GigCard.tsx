'use client';

import React from 'react';
import Link from 'next/link';
import { Star, ArrowUpRight, Zap } from 'lucide-react';

interface GigCardProps {
    gig: {
        _id: string;
        title: string;
        price: number;
        owner: {
            username: string;
            profileImage?: string;
        };
        images: string[];
        rating: number;
        reviewsCount: number;
    };
}

const GigCard: React.FC<GigCardProps> = ({ gig }) => {
    return (
        <Link href={`/gigs/${gig._id}`} className="group h-full block">
            <div className="bg-card rounded-[3.5rem] border border-border overflow-hidden hover:shadow-[0_40px_80px_-20px_rgba(37,99,235,0.15)] transition-all duration-700 h-full flex flex-col relative transform hover:-translate-y-3">
                <div className="aspect-[16/11] bg-foreground/5 overflow-hidden relative">
                    <img
                        src={gig.images[0] || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800'}
                        alt={gig.title}
                        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
                    />
                    <div className="absolute top-6 left-6">
                        <div className="bg-card/90 backdrop-blur-xl shadow-2xl px-5 py-2 rounded-2xl text-[10px] font-black text-foreground border border-border uppercase tracking-[0.2em] flex items-center gap-2">
                            <Zap className="w-3 h-3 text-accent fill-accent" />
                            {gig.rating >= 4.7 ? 'High Tier' : 'Verified'}
                        </div>
                    </div>
                </div>

                <div className="p-10 flex-grow flex flex-col">
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-11 h-11 bg-primary/10 rounded-2xl border-2 border-card flex items-center justify-center text-primary text-sm font-black shadow-xl">
                            {gig.owner.username[0].toUpperCase()}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-foreground font-black text-xs uppercase tracking-tight">{gig.owner.username}</span>
                            <span className="text-[10px] text-foreground/40 font-bold uppercase tracking-[0.1em]">Class Alpha Seller</span>
                        </div>
                    </div>

                    <h3 className="text-foreground font-black text-xl line-clamp-2 mb-6 group-hover:text-primary transition-colors leading-[1.3] tracking-tighter">
                        {gig.title}
                    </h3>

                    <div className="flex items-center gap-3 mb-10 bg-foreground/5 w-fit px-4 py-2 rounded-2xl border border-border/50">
                        <div className="flex text-accent gap-0.5">
                            <Star className="w-4 h-4 fill-accent" />
                        </div>
                        <span className="text-foreground font-black text-sm">{gig.rating.toFixed(1)}</span>
                        <div className="w-1 h-1 bg-foreground/20 rounded-full" />
                        <span className="text-foreground/30 text-[10px] font-black uppercase tracking-widest">{gig.reviewsCount} logs</span>
                    </div>

                    <div className="pt-8 border-t border-border/50 flex justify-between items-end mt-auto">
                        <div className="flex flex-col">
                            <span className="text-foreground/30 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Initial Stake</span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-foreground font-black text-3xl tracking-tight">${gig.price}</span>
                                <span className="text-foreground/30 text-xs font-bold font-mono">.00</span>
                            </div>
                        </div>

                        <div className="w-14 h-14 bg-foreground text-card rounded-[1.8rem] flex items-center justify-center shadow-2xl transition-all duration-500 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-6">
                            <ArrowUpRight className="w-6 h-6" strokeWidth={3} />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default GigCard;
