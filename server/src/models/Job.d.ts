import mongoose, { Document } from 'mongoose';
export interface IJob extends Document {
    client: mongoose.Types.ObjectId;
    title: string;
    description: string;
    budget: number;
    category: string;
    status: 'open' | 'assigned' | 'completed' | 'cancelled';
    createdAt: Date;
}
declare const _default: mongoose.Model<IJob, {}, {}, {}, mongoose.Document<unknown, {}, IJob, {}, mongoose.DefaultSchemaOptions> & IJob & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IJob>;
export default _default;
//# sourceMappingURL=Job.d.ts.map