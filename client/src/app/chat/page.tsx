'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useSearchParams } from 'next/navigation';
import {
    Send,
    Search,
    MoreVertical,
    Phone,
    Video,
    Paperclip,
    Smile,
    Circle,
    MessageSquare,
    Clock,
    CheckCheck,
    Menu,
    X
} from 'lucide-react';

const ChatPage = () => {
    const { user } = useAuth();
    const searchParams = useSearchParams();
    const targetUserId = searchParams.get('userId');

    const token = user?.token;
    const [conversations, setConversations] = useState<any[]>([]);
    const [activeChat, setActiveChat] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [msg, setMsg] = useState('');
    const [isLoadingConversations, setIsLoadingConversations] = useState(true);

    useEffect(() => {
        const fetchConversations = async () => {
            if (!user) return;
            try {
                const response = await fetch('http://localhost:3000/api/messages/conversations', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                const data = await response.json();
                const conversationData = Array.isArray(data) ? data : [];
                setConversations(conversationData);

                if (conversationData.length > 0) {
                    if (targetUserId) {
                        const targetConv = conversationData.find(c => c.user._id === targetUserId);
                        if (targetConv) setActiveChat(targetConv);
                        else if (!activeChat) setActiveChat(conversationData[0]);
                    } else if (!activeChat) {
                        setActiveChat(conversationData[0]);
                    }
                }
            } catch (error) {
                console.error('Error fetching conversations:', error);
            } finally {
                setIsLoadingConversations(false);
            }
        };

        fetchConversations();
        const interval = setInterval(fetchConversations, 10000); // Poll conversations
        return () => clearInterval(interval);
    }, [user, activeChat]);

    useEffect(() => {
        const fetchMessages = async () => {
            if (!user || !activeChat) return;
            try {
                const response = await fetch(`http://localhost:3000/api/messages/${activeChat.user._id}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                const data = await response.json();
                setMessages(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 3000); // Poll messages every 3s
        return () => clearInterval(interval);
    }, [user, activeChat]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!msg.trim() || !activeChat || !user) return;

        const messageText = msg;
        setMsg('');

        try {
            const response = await fetch('http://localhost:3000/api/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    receiverId: activeChat.user._id,
                    text: messageText
                })
            });

            if (response.ok) {
                const newMessage = await response.json();
                setMessages(prev => [...prev, newMessage]);

                // Snappy update for sidebar
                setConversations(prev => {
                    const otherUserId = activeChat.user._id;
                    const updated = prev.filter(c => c.user._id !== otherUserId);
                    return [{
                        user: activeChat.user,
                        lastMessage: messageText,
                        timestamp: new Date().toISOString()
                    }, ...updated];
                });
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center p-12 bg-card rounded-[4rem] border border-border shadow-2xl">
                    <div className="w-20 h-20 bg-foreground/5 rounded-3xl flex items-center justify-center mx-auto mb-8 text-foreground/20">
                        <MessageSquare className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-black text-foreground mb-4">Encrypted Comms Restricted</h2>
                    <p className="text-foreground/40 font-medium mb-10">Please authenticate your digital identity to access the secure link.</p>
                    <button className="bg-primary text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-primary/20">Establish Handle</button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background pt-20 px-4 md:px-12 pb-12 flex flex-col">
            <div className="flex-grow flex bg-card rounded-[3.5rem] border border-border shadow-3xl overflow-hidden relative">

                {/* Conversations Sidebar */}
                <div className={`absolute lg:relative z-20 h-full bg-card border-r border-border transition-all duration-500 ${sidebarOpen ? 'w-80 opacity-100' : 'w-0 opacity-0 -translate-x-full lg:w-0'}`}>
                    <div className="p-8 h-full flex flex-col">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-2xl font-black text-foreground tracking-tighter uppercase">Comms</h2>
                            <button className="p-3 bg-foreground/5 rounded-xl hover:bg-primary/10 transition-colors">
                                <Search className="w-5 h-5 text-foreground/40" />
                            </button>
                        </div>

                        <div className="flex-grow overflow-y-auto space-y-4 pr-2 scrollbar-hide">
                            {isLoadingConversations ? (
                                [1, 2, 3].map(i => (
                                    <div key={i} className="w-full p-6 rounded-[2rem] bg-foreground/5 animate-pulse flex items-center gap-5">
                                        <div className="w-14 h-14 bg-foreground/10 rounded-2xl" />
                                        <div className="flex-grow">
                                            <div className="h-3 bg-foreground/10 rounded-full w-1/3 mb-2" />
                                            <div className="h-2 bg-foreground/10 rounded-full w-2/3" />
                                        </div>
                                    </div>
                                ))
                            ) : conversations.length > 0 ? (
                                conversations.map((conv) => (
                                    <button
                                        key={conv.user._id}
                                        onClick={() => setActiveChat(conv)}
                                        className={`w-full p-6 rounded-[2rem] flex items-center gap-5 transition-all group ${activeChat?.user._id === conv.user._id ? 'bg-foreground text-card shadow-2xl shadow-foreground/20' : 'hover:bg-foreground/5'}`}
                                    >
                                        <div className="relative">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl ${activeChat?.user._id === conv.user._id ? 'bg-card text-foreground' : 'bg-primary/10 text-primary'}`}>
                                                {conv.user.username[0].toUpperCase()}
                                            </div>
                                        </div>
                                        <div className="text-left flex-grow overflow-hidden">
                                            <div className="flex justify-between items-center mb-1">
                                                <p className={`font-black text-xs uppercase tracking-tight truncate ${activeChat?.user._id === conv.user._id ? 'text-card' : 'text-foreground'}`}>{conv.user.username}</p>
                                                <span className={`text-[8px] font-black uppercase tracking-widest ${activeChat?.user._id === conv.user._id ? 'text-card/50' : 'text-foreground/20'}`}>{new Date(conv.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                            <p className={`text-[10px] font-bold truncate ${activeChat?.user._id === conv.user._id ? 'text-card/60' : 'text-foreground/40'}`}>{conv.lastMessage}</p>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="text-center py-12 px-4">
                                    <p className="text-[10px] font-black text-foreground/20 uppercase tracking-widest">No active channels</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 pt-6 border-t border-border flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary font-black">
                                {user.username[0].toUpperCase()}
                            </div>
                            <div className="flex-grow">
                                <p className="text-[10px] font-black text-foreground uppercase tracking-widest">{user.username}</p>
                                <span className="text-[9px] font-bold text-accent uppercase tracking-[0.3em]">Operator v1.0</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Chat Window */}
                <div className="flex-grow flex flex-col relative">
                    {activeChat !== null ? (
                        <>
                            {/* Chat Header */}
                            <div className="px-10 py-8 border-b border-border flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-3 bg-foreground/5 rounded-xl text-foreground/40 hover:text-primary transition-colors">
                                        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                                    </button>
                                    <div className="flex items-center gap-5">
                                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary font-black text-xl">
                                            {activeChat.user.username[0].toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-black text-foreground tracking-tighter uppercase">{activeChat.user.username}</h3>
                                            <div className="flex items-center gap-3">
                                                <Circle className={`w-2 h-2 fill-current text-accent`} />
                                                <span className="text-[10px] font-black text-foreground/40 uppercase tracking-[0.3em]">Verified Connection</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button className="p-4 bg-foreground/5 rounded-2xl text-foreground/40 hover:bg-primary/10 hover:text-primary transition-all">
                                        <Phone className="w-5 h-5" />
                                    </button>
                                    <button className="p-4 bg-foreground/5 rounded-2xl text-foreground/40 hover:bg-primary/10 hover:text-primary transition-all">
                                        <Video className="w-5 h-5" />
                                    </button>
                                    <button className="p-4 bg-foreground py-4 px-6 rounded-2xl text-card hover:bg-primary transition-all shadow-xl shadow-foreground/10">
                                        <MoreVertical className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-grow overflow-y-auto p-10 space-y-10 scrollbar-hide bg-foreground/[0.02]">
                                {messages.map((message: any) => (
                                    <div key={message._id} className={`flex flex-col ${message.sender === user?._id || message.sender?._id === user?._id ? 'items-end' : 'items-start'}`}>
                                        <div className={`max-w-[70%] p-8 rounded-[2.5rem] shadow-2xl relative group ${message.sender === user?._id || message.sender?._id === user?._id
                                            ? 'bg-primary text-white rounded-br-none shadow-primary/20 translate-x-4'
                                            : 'bg-card text-foreground border border-border rounded-bl-none -translate-x-4'
                                            }`}>
                                            <p className="text-lg font-bold leading-relaxed">{message.text}</p>
                                            <div className={`absolute bottom-3 ${message.sender === user?._id || message.sender?._id === user?._id ? '-left-12' : '-right-12'} opacity-0 group-hover:opacity-100 transition-opacity`}>
                                                <span className="text-[10px] font-black text-foreground/20 uppercase tracking-widest">{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div>
                                        </div>
                                        <div className={`mt-2 flex items-center gap-2 ${message.sender === user?._id || message.sender?._id === user?._id ? 'mr-6' : 'ml-6'}`}>
                                            <span className="text-[10px] font-black text-foreground/20 uppercase tracking-widest">{new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            {(message.sender === user?._id || message.sender?._id === user?._id) && <CheckCheck className="w-3 h-3 text-accent" />}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <form onSubmit={handleSendMessage} className="p-8 md:p-12">
                                <div className="bg-background border border-border rounded-[3rem] p-4 flex items-center gap-4 shadow-2xl shadow-foreground/5 focus-within:border-primary transition-colors">
                                    <button type="button" className="p-4 bg-foreground/5 rounded-2xl text-foreground/40 hover:text-primary transition-colors">
                                        <Paperclip className="w-6 h-6" />
                                    </button>
                                    <input
                                        type="text"
                                        value={msg}
                                        onChange={(e) => setMsg(e.target.value)}
                                        placeholder="Type your secure message..."
                                        className="flex-grow bg-transparent outline-none font-bold text-foreground placeholder:text-foreground/20 px-4 text-lg"
                                    />
                                    <button type="button" className="p-4 bg-foreground/5 rounded-2xl text-foreground/40 hover:text-primary transition-colors">
                                        <Smile className="w-6 h-6" />
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!msg.trim()}
                                        className="bg-primary text-white p-5 rounded-[1.8rem] shadow-2xl shadow-primary/30 hover:scale-110 active:scale-95 transition-all group disabled:opacity-50"
                                    >
                                        <Send className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        <div className="flex-grow flex flex-col items-center justify-center text-center p-20">
                            <div className="w-32 h-32 bg-foreground/5 rounded-[3rem] flex items-center justify-center mb-10 shadow-2xl relative">
                                <MessageSquare className="w-14 h-14 text-foreground/10" />
                                <div className="absolute inset-0 bg-primary/5 rounded-[3rem] animate-pulse" />
                            </div>
                            <h2 className="text-4xl font-black text-foreground mb-6 tracking-tighter uppercase">Initialize Link</h2>
                            <p className="text-foreground/40 font-medium text-xl max-w-sm">Select a verified connection from the terminal to establish a secure end-to-end communication channel.</p>
                            <div className="mt-16 flex gap-3">
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8 flex justify-between items-center px-8">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                    <span className="text-[10px] font-black text-foreground/30 uppercase tracking-[0.4em]">Signal Integrity: 100%</span>
                </div>
                <div className="flex gap-8 text-[10px] font-black text-foreground/20 uppercase tracking-widest">
                    <span className="hover:text-primary cursor-pointer transition-colors">Nodes</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Encryption</span>
                    <span className="hover:text-primary cursor-pointer transition-colors">Archival</span>
                </div>
            </div>
        </div>
    );
};

const ChatPageWrapper = () => {
    return (
        <React.Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-8">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="font-black text-xs uppercase tracking-[0.4em] text-foreground/20 italic">Initializing Secure Environment...</p>
                </div>
            </div>
        }>
            <ChatPage />
        </React.Suspense>
    );
};

export default ChatPageWrapper;
