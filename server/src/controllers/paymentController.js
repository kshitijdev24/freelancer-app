import Stripe from 'stripe';
import dotenv from 'dotenv';
import Order from '../models/Order.js';
import Gig from '../models/Gig.js';
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const createPaymentIntent = async (req, res) => {
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
                buyerId: req.user.id,
                sellerId: gig.owner.toString()
            }
        });
        res.json({
            clientSecret: paymentIntent.client_secret,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const confirmPayment = async (req, res) => {
    try {
        const { paymentIntentId, gigId } = req.body;
        const gig = await Gig.findById(gigId);
        if (!gig)
            return res.status(404).json({ message: 'Gig not found' });
        const order = await Order.create({
            gig: gigId,
            buyer: req.user.id,
            seller: gig.owner,
            price: gig.price,
            paymentIntentId,
            status: 'completed'
        });
        res.status(201).json(order);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//# sourceMappingURL=paymentController.js.map