import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    name: string;
    brand: string;
    category: string;
    price: number;
    description: string;
    images: string[];
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

const ProductSchema: Schema = new Schema({
    name: { type: String, required: true },
    brand: { type: String, default: 'Unbranded' },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: { type: [String], default: [] },
    stock: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
