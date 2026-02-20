import mongoose, { Document } from 'mongoose';
export interface IGig extends Document {
    title: string;
    description: string;
    category: string;
    price: number;
    deliveryTime: number;
    images: string[];
    owner: mongoose.Types.ObjectId;
    rating: number;
    reviewsCount: number;
    createdAt: Date;
}
declare const _default: mongoose.Model<IGig, {}, {}, {}, mongoose.Document<unknown, {}, IGig, {}, mongoose.DefaultSchemaOptions> & IGig & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IGig>;
export default _default;
//# sourceMappingURL=Gig.d.ts.map