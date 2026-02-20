import mongoose, { Schema, Document } from 'mongoose';
const JobSchema = new Schema({
    client: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    budget: { type: Number, required: true },
    category: { type: String, required: true },
    status: {
        type: String,
        enum: ['open', 'assigned', 'completed', 'cancelled'],
        default: 'open'
    },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Job', JobSchema);
//# sourceMappingURL=Job.js.map