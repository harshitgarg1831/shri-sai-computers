"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaPlus, FaSearch, FaEye } from "react-icons/fa";

interface Certificate {
    _id: string;
    studentName: string;
    collegeName: string;
    internshipRole: string;
    duration: string;
    issueDate: string;
    certificateId: string;
    createdAt: string;
}

export default function CertificatesPage() {
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchCertificates();
    }, []);

    const fetchCertificates = async () => {
        try {
            const res = await fetch("/api/certificates");
            const data = await res.json();
            if (data.success) {
                setCertificates(data.data);
            }
        } catch (error) {
            console.error("Error fetching certificates:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredCertificates = certificates.filter(cert => 
        cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-bold text-slate-800">Intern Certificates</h1>
                <Link 
                    href="/admin/certificates/create" 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center transition shadow-lg hover:shadow-blue-500/30"
                >
                    <FaPlus className="mr-2" /> Issue New Certificate
                </Link>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <div className="mb-6 relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-slate-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by student name or certificate ID..."
                        className="pl-10 w-full md:w-1/3 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {loading ? (
                    <div className="text-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                        <p className="mt-4 text-slate-500">Loading certificates...</p>
                    </div>
                ) : filteredCertificates.length === 0 ? (
                    <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                        <p className="text-slate-500 text-lg">No certificates found.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 text-slate-600 border-b border-slate-200">
                                    <th className="p-4 font-semibold">Certificate ID</th>
                                    <th className="p-4 font-semibold">Student Name</th>
                                    <th className="p-4 font-semibold">Role</th>
                                    <th className="p-4 font-semibold">Issue Date</th>
                                    <th className="p-4 font-semibold text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCertificates.map((cert) => (
                                    <tr key={cert._id} className="border-b border-slate-100 hover:bg-slate-50 transition">
                                        <td className="p-4 font-mono text-sm text-slate-600">{cert.certificateId}</td>
                                        <td className="p-4 font-medium text-slate-800">{cert.studentName}</td>
                                        <td className="p-4 text-slate-600">{cert.internshipRole}</td>
                                        <td className="p-4 text-slate-600">{new Date(cert.issueDate).toLocaleDateString()}</td>
                                        <td className="p-4 text-center">
                                            <Link 
                                                href={`/verify/${cert.certificateId}`} 
                                                target="_blank"
                                                className="inline-flex items-center text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-md transition"
                                            >
                                                <FaEye className="mr-1.5" /> View
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
