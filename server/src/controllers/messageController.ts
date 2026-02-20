import type { Request, Response } from 'express';
import Message from '../models/Message.js';

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { receiverId, text, orderId } = req.body;
        const message = await Message.create({
            sender: (req as any).user.id,
            receiver: receiverId,
            text,
            orderId
        });
        res.status(201).json(message);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getMessages = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const currentUserId = (req as any).user.id;

        const messages = await Message.find({
            $or: [
                { sender: currentUserId, receiver: userId },
                { sender: userId, receiver: currentUserId }
            ]
        } as any).sort({ createdAt: 1 });

        res.json(messages);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getConversations = async (req: Request, res: Response) => {
    try {
        const currentUserId = (req as any).user.id;

        // Get messages sorted by newest first to easily pick the latest message for each conversation
        const messages = await Message.find({
            $or: [{ sender: currentUserId }, { receiver: currentUserId }]
        } as any)
            .populate('sender receiver', 'username profileImage')
            .sort({ createdAt: -1 });

        const conversations = new Map();

        messages.forEach(msg => {
            const otherUser: any = (msg.sender as any)._id.toString() === currentUserId
                ? msg.receiver
                : msg.sender;

            const otherUserId = otherUser._id.toString();

            if (!conversations.has(otherUserId)) {
                conversations.set(otherUserId, {
                    user: otherUser,
                    lastMessage: msg.text,
                    timestamp: msg.createdAt
                });
            }
        });

        res.json(Array.from(conversations.values()));
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
