import React from 'react';
import Link from 'next/link';
import Hero from '@/components/shared/Hero';
import {
  Rocket,
  Terminal,
  Database,
  ShieldCheck,
  Zap,
  Cpu,
  Globe,
  Layers,
  ArrowRight,
  Sparkles,
  Search,
  CheckCircle2,
  Lock,
  MessageSquare,
  User
} from 'lucide-react';

export default function Home() {
  const categories = [
    { title: 'Graphic Design', icon: <Sparkles className="w-8 h-8" />, count: '1.2k', label: 'Creative' },
    { title: 'Digital Marketing', icon: <Globe className="w-8 h-8" />, count: '0.8k', label: 'Growth' },
    { title: 'Writing & Trans', icon: <Layers className="w-8 h-8" />, count: '1.5k', label: 'Content' },
    { title: 'Video & Animation', icon: <Rocket className="w-8 h-8" />, count: '0.6k', label: 'Multimedia' },
    { title: 'AI Services', icon: <Cpu className="w-8 h-8" />, count: '0.4k', label: 'Intelligence' },
    { title: 'Programming', icon: <Terminal className="w-8 h-8" />, count: '2.0k', label: 'Development' },
  ];

  const features = [
    { title: "Standardized Escrow", desc: "Release capital only after successful protocol verification. Complete stake protection.", icon: <Lock className="w-5 h-5" /> },
    { title: "Elite Execution", desc: "Connect with the top 3% of specialized talent. Verified track records only.", icon: <Zap className="w-5 h-5" /> },
    { title: "SLA Guaranteed", desc: "Defined milestones and clear turnarounds. High-stakes projects, delivered.", icon: <CheckCircle2 className="w-5 h-5" /> }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Hero />

      {/* Categories Section */}
      <section className="py-40 bg-card relative overflow-hidden border-y border-border">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -mr-64 -mt-64" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-24 gap-12">
            <div className="text-center md:text-left">
              <span className="text-primary font-black text-[10px] uppercase tracking-[0.4em] mb-6 block">Inventory Matrix</span>
              <h2 className="text-5xl md:text-7xl font-black text-foreground tracking-tighter leading-[0.9]">Explore the <br /><span className="text-primary">Registry.</span></h2>
              <p className="text-foreground/40 font-medium text-xl mt-6 max-w-xl">A decentralized marketplace indexed by high-stakes execution protocols.</p>
            </div>
            <Link href="/gigs" className="bg-foreground text-background px-12 py-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-primary transition-all shadow-2xl shadow-foreground/10 group flex items-center gap-3">
              View All Protocols
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                href={`/gigs?category=${cat.title}`}
                className="bg-background p-10 rounded-[3.5rem] border border-border hover:border-primary hover:shadow-[0_40px_80px_-20px_rgba(37,99,235,0.15)] transition-all duration-700 cursor-pointer group flex flex-col items-center text-center relative"
              >
                <div className="w-20 h-20 bg-foreground/5 rounded-3xl flex items-center justify-center text-foreground/20 mb-8 group-hover:bg-primary group-hover:text-white group-hover:rotate-12 transition-all duration-700">
                  {cat.icon}
                </div>
                <h3 className="font-black text-foreground text-lg mb-2 leading-tight tracking-tight">{cat.title}</h3>
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-foreground/20 group-hover:text-primary transition-colors">{cat.count} Nodes Active</span>
                <div className="mt-6 px-4 py-1.5 bg-foreground/5 rounded-full text-[8px] font-black uppercase tracking-widest text-foreground/30 group-hover:bg-primary/10 group-hover:text-primary transition-all">
                  {cat.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-40 bg-background overflow-hidden relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="bg-foreground rounded-[5rem] p-12 md:p-28 relative overflow-hidden shadow-3xl">
            {/* Dynamic background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full -mr-64 -mt-64 blur-[130px] opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/10 rounded-full -ml-64 -mb-64 blur-[130px] opacity-20"></div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-24">
              <div className="lg:w-3/5">
                <span className="text-primary font-black uppercase tracking-[0.5em] text-[10px] mb-10 block underline underline-offset-8">Marketplace Protocol</span>
                <h2 className="text-5xl md:text-8xl font-black text-background mb-14 leading-[0.9] tracking-tighter">Accelerate your <br /><span className="text-primary italic">project sync.</span></h2>

                <div className="grid md:grid-cols-1 gap-12">
                  {features.map((item, i) => (
                    <div key={i} className="flex gap-10 group">
                      <div className="w-16 h-16 bg-background/5 rounded-2xl flex items-center justify-center text-primary shrink-0 border border-background/10 group-hover:bg-primary group-hover:text-white transition-all duration-500 transform group-hover:-rotate-12">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-2xl font-black text-background mb-3 tracking-tight">{item.title}</h4>
                        <p className="text-background/40 font-medium leading-relaxed text-lg max-w-lg">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:w-2/5 w-full">
                <div className="relative group">
                  <div className="absolute inset-0 bg-primary rounded-[4rem] blur-3xl opacity-10 transform scale-95 group-hover:scale-110 transition-transform"></div>
                  <div className="relative bg-background p-12 rounded-[4.5rem] border border-border shadow-2xl overflow-hidden min-h-[500px] flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-12 opacity-5">
                      <Sparkles className="w-40 h-40 text-primary" />
                    </div>

                    <div className="relative z-10">
                      <div className="flex text-accent gap-1 mb-10">
                        {[1, 2, 3, 4, 5].map(i => <Sparkles key={i} className="w-5 h-5 fill-accent" />)}
                      </div>
                      <p className="text-2xl md:text-3xl font-bold mb-12 italic text-foreground tracking-tight leading-snug">
                        "freeLance. protocol has transformed the way we handle high-stakes deployments. The signal integrity is absolute."
                      </p>
                    </div>

                    <div className="flex items-center gap-6 relative z-10 pt-10 border-t border-border">
                      <div className="w-16 h-16 rounded-[1.5rem] bg-primary/20 flex items-center justify-center">
                        <User className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <p className="font-black text-foreground text-xl tracking-tighter leading-none">Marcus Solid</p>
                        <p className="text-[10px] text-accent font-black uppercase tracking-[0.3em] mt-2">CTO @ Nexus Systems</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 relative">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-8xl font-black text-foreground mb-12 tracking-tighter">Ready to <span className="text-primary italic">initialize?</span></h2>
          <p className="text-foreground/40 text-xl font-medium max-w-xl mx-auto mb-16 leading-relaxed">Join the global network of specialized operators and scale your operations with crystalline precision.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/register" className="bg-primary text-white px-12 py-6 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl shadow-primary/25">Join the Network</Link>
            <Link href="/chat" className="bg-foreground text-background px-12 py-6 rounded-[2rem] font-black uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-2xl shadow-foreground/20 flex items-center justify-center gap-3">
              <MessageSquare className="w-5 h-5" />
              Establish Contact
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border pt-40 pb-20 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] -ml-96 -mb-96" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-20 mb-32">
            <div className="lg:col-span-2">
              <Link href="/" className="group flex items-center gap-4 mb-10">
                <div className="w-12 h-12 bg-primary rounded-[1.2rem] flex items-center justify-center text-white font-black text-2xl shadow-2xl shadow-primary/30 group-hover:rotate-12 transition-transform duration-500">
                  f
                </div>
                <span className="text-3xl font-black text-foreground tracking-tighter uppercase underline underline-offset-8 decoration-primary decoration-4">
                  freeLance<span className="text-primary">.</span>
                </span>
              </Link>
              <p className="text-foreground/30 font-medium text-lg max-w-sm mb-12 leading-relaxed italic">
                The premier decentralized gateway for high-stakes professional execution. Vetted nodes only.
              </p>
              <div className="flex gap-4">
                {[<Globe key="1" />, <Terminal key="2" />, <Cpu key="3" />, <Sparkles key="4" />].map((icon, i) => (
                  <div key={i} className="w-14 h-14 bg-background rounded-2xl border border-border flex items-center justify-center text-foreground/20 hover:border-primary hover:text-primary transition-all cursor-pointer shadow-xl hover:shadow-primary/10">
                    <div className="w-6 h-6">{icon}</div>
                  </div>
                ))}
              </div>
            </div>

            {[
              { title: 'Registry', links: ['Development', 'Creative Protocols', 'AI Synthesis', 'Content Engine', 'Multimedia'] },
              { title: 'Network', links: ['About Protocol', 'Global Nodes', 'Partnerships', 'Privacy Encryption', 'Consensus Terms'] },
              { title: 'Support', links: ['Sync Center', 'Escrow Security', 'Operator Guide', 'Acquisition Guide', 'Community'] }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-black text-foreground text-xs uppercase tracking-[0.4em] mb-10 pb-4 border-b border-border w-fit">{col.title}</h4>
                <ul className="space-y-6 text-foreground/30 font-black text-[10px] uppercase tracking-[0.2em]">
                  {col.links.map(link => (
                    <li key={link} className="hover:text-primary cursor-pointer transition-colors flex items-center gap-2 group">
                      <div className="w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-20 border-t border-border flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
              <p className="text-foreground/20 font-black text-[10px] uppercase tracking-[0.4em]">
                © 2026 freeLance. Protocol Node [v7.4.2] All rights Reserved.
              </p>
            </div>
            <div className="flex gap-10 text-[10px] font-black text-foreground/20 uppercase tracking-[0.5em] italic">
              <span className="hover:text-primary cursor-pointer">Global Sync</span>
              <span className="hover:text-primary cursor-pointer">USD Index</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
