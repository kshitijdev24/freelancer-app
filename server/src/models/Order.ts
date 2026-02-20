import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
    gig: mongoose.Types.ObjectId;
    buyer: mongoose.Types.ObjectId;
    seller: mongoose.Types.ObjectId;
    price: number;
    status: 'pending' | 'in_progress' | 'delivered' | 'completed' | 'cancelled';
    paymentIntentId?: string;
    createdAt: Date;
}

const OrderSchema: Schema = new Schema({
    gig: { type: Schema.Types.ObjectId, ref: 'Gig', required: true },
    buyer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, required: true },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'delivered', 'completed', 'cancelled'],
        default: 'pending'
    },
    paymentIntentId: { type: String },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IOrder>('Order', OrderSchema);
