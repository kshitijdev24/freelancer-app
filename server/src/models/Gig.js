import mongoose, { Schema, Document } from 'mongoose';
const GigSchema = new Schema({
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
export default mongoose.model('Gig', GigSchema);
//# sourceMappingURL=Gig.js.map