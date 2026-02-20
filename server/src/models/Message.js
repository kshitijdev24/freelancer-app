import mongoose, { Schema, Document } from 'mongoose';
const MessageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    orderId: { type: Schema.Types.ObjectId, ref: 'Order' },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Message', MessageSchema);
//# sourceMappingURL=Message.js.map