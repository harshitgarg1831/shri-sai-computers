import mongoose, { Schema, Document } from "mongoose";

export interface ICertificate extends Document {
  studentName: string;
  fatherName: string;
  course: string;
  semester: string;
  rollNo: string;
  collegeName: string;
  academicYear: string;
  companyName: string;
  startDate: string;
  endDate: string;
  internshipRole: string; // kept for legacy or internal use
  duration: string;       // kept for legacy or internal use
  issueDate: Date;
  certificateId: string;
  certificateImage?: string;
  createdAt: Date;
}

const CertificateSchema: Schema = new Schema({
  studentName: { type: String, required: true },
  fatherName: { type: String, default: "" },
  course: { type: String, default: "" },
  semester: { type: String, default: "" },
  rollNo: { type: String, default: "" },
  collegeName: { type: String, required: true },
  academicYear: { type: String, default: "" },
  companyName: { type: String, default: "Shri Sai Computers" },
  startDate: { type: String, default: "" },
  endDate: { type: String, default: "" },
  internshipRole: { type: String, default: "Intern" },
  duration: { type: String, default: "120 hours" },
  issueDate: { type: Date, required: true },
  certificateId: { type: String, required: true, unique: true },
  certificateImage: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Certificate || mongoose.model<ICertificate>("Certificate", CertificateSchema);
