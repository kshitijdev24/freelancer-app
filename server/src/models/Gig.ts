import mongoose, { Schema, Document } from 'mongoose';

export interface IGig extends Document {
    title: string;
    description: string;
    category: string;
    price: number;
    deliveryTime: number; // in days
    images: string[];
    owner: mongoose.Types.ObjectId;
    rating: number;
    reviewsCount: number;
    createdAt: Date;
}

const GigSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    deliveryTime: { type: Number, required: true },
    images: [{ type: String }],
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IGig>('Gig', GigSchema);
