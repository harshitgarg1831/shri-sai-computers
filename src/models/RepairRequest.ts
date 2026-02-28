import mongoose, { Schema, Document } from 'mongoose';

export interface IRepairRequest extends Document {
    name: string;
    phone: string;
    deviceType: string;
    issueDescription: string;
    status: 'Pending' | 'In Progress' | 'Completed';
    createdAt: Date;
    updatedAt: Date;
}

const RepairRequestSchema: Schema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    deviceType: { type: String, required: true },
    issueDescription: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'In Progress', 'Completed'], default: 'Pending' },
}, { timestamps: true });

export default mongoose.models.RepairRequest || mongoose.model<IRepairRequest>('RepairRequest', RepairRequestSchema);
