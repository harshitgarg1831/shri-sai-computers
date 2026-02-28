import mongoose, { Schema, Document } from 'mongoose';

export interface IInquiry extends Document {
    name: string;
    phone: string;
    productId?: mongoose.Types.ObjectId;
    message: string;
    status: 'Pending' | 'Contacted';
    createdAt: Date;
    updatedAt: Date;
}

const InquirySchema: Schema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    message: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Contacted'], default: 'Pending' },
}, { timestamps: true });

export default mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);
