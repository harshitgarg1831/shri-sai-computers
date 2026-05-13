"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft, FaSave } from "react-icons/fa";

export default function CreateCertificatePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [file, setFile] = useState<File | null>(null);
    
    const generateId = () => {
        return 'CERT-' + Math.random().toString(36).substring(2, 10).toUpperCase();
    };

    const [formData, setFormData] = useState({
        studentName: "",
        fatherName: "",
        course: "BCA",
        semester: "V Semester",
        rollNo: "",
        collegeName: "Poddar International College",
        academicYear: "2025-26",
        companyName: "Shri Sai Computers",
        startDate: "",
        endDate: "",
        issueDate: new Date().toISOString().split('T')[0],
        certificateId: generateId(),
        duration: "120 hours",
        internshipRole: "Intern"
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        let uploadedImageUrl = "";
        
        if (file) {
            const uploadFormData = new FormData();
            uploadFormData.append('file', file);
            
            try {
                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: uploadFormData
                });
                const uploadData = await uploadRes.json();
                
                if (uploadData.success) {
                    uploadedImageUrl = uploadData.url;
                } else {
                    setError("Failed to upload certificate image");
                    setLoading(false);
                    return;
                }
            } catch (err) {
                setError("Image upload error");
                setLoading(false);
                return;
            }
        }

        try {
            const res = await fetch("/api/certificates/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, certificateImage: uploadedImageUrl }),
            });

            const data = await res.json();
            if (data.success) {
                router.push("/admin/certificates");
            } else {
                setError(data.error || "Failed to create certificate");
            }
        } catch (err: any) {
            setError(err.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/admin/certificates" className="text-slate-500 hover:text-blue-600 transition p-2 bg-white rounded-full shadow-sm border border-slate-200">
                    <FaArrowLeft />
                </Link>
                <h1 className="text-3xl font-bold text-slate-800">Issue New Certificate</h1>
            </div>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-200">
                    {error}
                </div>
            )}

            <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-200">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Student Name</label>
                            <input type="text" name="studentName" required value={formData.studentName} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Father's Name</label>
                            <input type="text" name="fatherName" required value={formData.fatherName} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Course</label>
                            <input type="text" name="course" required value={formData.course} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Semester</label>
                            <input type="text" name="semester" required value={formData.semester} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Roll No</label>
                            <input type="text" name="rollNo" required value={formData.rollNo} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">College/Institute Name</label>
                            <input type="text" name="collegeName" required value={formData.collegeName} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Academic Year</label>
                            <input type="text" name="academicYear" required value={formData.academicYear} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="e.g. 2025-26" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Company Name</label>
                            <input type="text" name="companyName" required value={formData.companyName} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Start Date</label>
                            <input type="text" name="startDate" required value={formData.startDate} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="e.g. 01 Jan 2025" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">End Date</label>
                            <input type="text" name="endDate" required value={formData.endDate} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" placeholder="e.g. 31 Mar 2025" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Issue Date</label>
                            <input type="date" name="issueDate" required value={formData.issueDate} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-slate-700">Certificate ID</label>
                            <div className="flex gap-2">
                                <input type="text" name="certificateId" required value={formData.certificateId} onChange={handleChange} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition font-mono bg-slate-50" />
                                <button type="button" onClick={() => setFormData({...formData, certificateId: generateId()})} className="px-4 bg-slate-200 hover:bg-slate-300 rounded-lg text-sm font-medium transition">Regenerate</button>
                            </div>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-semibold text-slate-700">Upload Completed Certificate (Canva Image)</label>
                            <p className="text-xs text-slate-500 mb-2">Upload the custom image for this student. The system will overlay the QR Code automatically.</p>
                            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex justify-end">
                        <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center transition disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-blue-500/30">
                            {loading ? "Saving..." : <><FaSave className="mr-2" /> Issue Certificate</>}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
