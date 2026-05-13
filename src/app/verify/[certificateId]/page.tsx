"use client";

import { useState, useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { QRCodeCanvas } from "qrcode.react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { FaCheckCircle, FaTimesCircle, FaDownload, FaSpinner } from "react-icons/fa";

interface Certificate {
    _id: string;
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
    certificateId: string;
    certificateImage?: string;
}

export default function VerifyCertificatePage() {
    const params = useParams();
    const certificateId = params.certificateId as string;
    
    const [certificate, setCertificate] = useState<Certificate | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [downloading, setDownloading] = useState(false);

    const certificateRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchCertificate = async () => {
            try {
                const res = await fetch(`/api/certificates/${certificateId}`);
                const data = await res.json();
                if (data.success) {
                    setCertificate(data.data);
                } else {
                    setError(true);
                }
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        if (certificateId) {
            fetchCertificate();
        }
    }, [certificateId]);

    const handleDownloadPDF = async () => {
        if (!certificateRef.current) return;
        setDownloading(true);
        try {
            const canvas = await html2canvas(certificateRef.current, { scale: 2 });
            const imgData = canvas.toDataURL("image/png");
            
            // A4 landscape dimensions: 297x210 mm
            const pdf = new jsPDF({
                orientation: "landscape",
                unit: "mm",
                format: "a4"
            });

            pdf.addImage(imgData, "PNG", 0, 0, 297, 210);
            pdf.save(`${certificate?.studentName}_Certificate_${certificate?.certificateId}.pdf`);
        } catch (error) {
            console.error("Error generating PDF", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setDownloading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50">
                <FaSpinner className="animate-spin text-4xl text-blue-600 mb-4" />
                <h2 className="text-xl font-medium text-slate-700">Verifying Certificate...</h2>
            </div>
        );
    }

    if (error || !certificate) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
                <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border-t-4 border-red-500">
                    <FaTimesCircle className="text-red-500 text-6xl mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-slate-800 mb-2">Invalid Certificate</h1>
                    <p className="text-slate-600 mb-6">
                        The certificate ID <strong>{certificateId}</strong> could not be found or is invalid.
                    </p>
                    <div className="bg-slate-100 p-4 rounded-lg text-sm text-slate-500">
                        If you believe this is an error, please contact our support team.
                    </div>
                </div>
            </div>
        );
    }

    const verificationUrl = typeof window !== 'undefined' ? window.location.href : `https://example.com/verify/${certificateId}`;

    return (
        <div className="min-h-screen bg-slate-100 py-12 px-4 font-sans">
            <div className="max-w-5xl mx-auto space-y-8">
                {/* Verification Status Card */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <FaCheckCircle className="text-green-500 text-4xl" />
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Verified Authentic Certificate</h2>
                            <p className="text-slate-600 text-sm">Issued by Shri Sai Computers</p>
                        </div>
                    </div>
                    <button 
                        onClick={handleDownloadPDF}
                        disabled={downloading}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition flex items-center gap-2 shadow-lg shadow-blue-500/20 disabled:opacity-75"
                    >
                        {downloading ? <FaSpinner className="animate-spin" /> : <FaDownload />}
                        {downloading ? "Generating PDF..." : "Download PDF"}
                    </button>
                </div>

                {/* Certificate Display A4 Landscape */}
                <div className="overflow-x-auto pb-4">
                    <div className="min-w-[1150px] w-full flex justify-center">
                        <div 
                            ref={certificateRef}
                            className="shadow-2xl relative overflow-hidden"
                            style={{ 
                                width: '1123px', 
                                height: '794px', // A4 Landscape
                                fontFamily: "'Times New Roman', Times, serif",
                                backgroundColor: '#ffffff',
                                color: '#0f172a'
                            }}
                        >
                            {/* Canva Template Background */}
                            <div 
                                className="absolute inset-0 z-0" 
                                style={{
                                    backgroundImage: `url('${certificate.certificateImage || '/certificate-template.png'}')`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center"
                                }}
                            ></div>

                            {/* Bottom Footer Overlay for QR Code */}
                            <div className="absolute bottom-12 left-12 flex justify-between items-end z-20">
                                <div 
                                    className="text-center flex flex-col items-center p-3 rounded-xl shadow-md"
                                    style={{ 
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                                        border: '1px solid #e2e8f0',
                                        backdropFilter: 'blur(4px)'
                                    }}
                                >
                                    <QRCodeCanvas value={verificationUrl} size={110} level="H" includeMargin={false} />
                                    <p className="font-bold text-[13px] mt-3 tracking-wide" style={{ color: '#1e293b' }}>SCAN TO VERIFY</p>
                                    <p className="text-[9px] uppercase tracking-widest mt-1" style={{ color: '#64748b' }}>Official Document</p>
                                </div>
                            </div>
                            
                            <div className="absolute bottom-4 left-4 text-[10px] font-mono tracking-widest z-20" style={{ color: 'rgba(100, 116, 139, 0.7)' }}>
                                REF: {certificate.certificateId}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
