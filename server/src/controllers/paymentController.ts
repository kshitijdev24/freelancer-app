import type { Request, Response } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import Order from '../models/Order.js';
import Gig from '../models/Gig.js';

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'pk_test_51T3CD5LGwNwvM0mI9YxtBUhZAvdpvO5cLzjQUO1KnwQJ2N9G92GGYCbemP1IZVcjSZlkSBlHgnI68v4kjEnrj64a00dvSteZ12');

export const createPaymentIntent = async (req: Request, res: Response) => {
    try {
        const { gigId } = req.body;
        const gig = await Gig.findById(gigId);

        if (!gig) {
            return res.status(404).json({ message: 'Gig not found' });
        }

        const paymentIntent = await stripe.paymentIntents.create({
            amount: gig.price * 100, // Stripe expects amounts in cents
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                gigId: gig._id.toString(),
                buyerId: (req as any).user.id,
                sellerId: gig.owner.toString()
            }
        });

        res.json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const confirmPayment = async (req: Request, res: Response) => {
    try {
        const { paymentIntentId, gigId } = req.body;

        const gig = await Gig.findById(gigId);
        if (!gig) return res.status(404).json({ message: 'Gig not found' });

        const order = await Order.create({
            gig: gigId,
            buyer: (req as any).user.id,
            seller: gig.owner,
            price: gig.price,
            paymentIntentId,
            status: 'completed'
        });

        res.status(201).json(order);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
