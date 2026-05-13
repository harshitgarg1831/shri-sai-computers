"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPassword() {
    const [step, setStep] = useState<1 | 2>(1);
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mobile }),
            });
            const data = await res.json();

            if (res.ok) {
                setMessage(data.message + " (Check terminal/console for OTP)");
                setStep(2);
            } else {
                setError(data.error || "Failed to send OTP");
            }
        } catch (err) {
            setError("Something went wrong");
        }
        setLoading(false);
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setMessage("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ mobile, otp, newPassword }),
            });
            const data = await res.json();

            if (res.ok) {
                alert("Password reset successfully! You can now login.");
                router.push("/login");
            } else {
                setError(data.error || "Failed to reset password");
            }
        } catch (err) {
            setError("Something went wrong");
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        {step === 1 ? "Reset Password" : "Verify OTP"}
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        {step === 1 ? "Enter your registered mobile number to receive an OTP." : "Enter the 6-digit OTP and your new password."}
                    </p>
                </div>

                {error && <div className="p-3 bg-red-50 text-red-600 text-sm text-center rounded-lg border border-red-100">{error}</div>}
                {message && <div className="p-3 bg-green-50 text-green-700 text-sm text-center rounded-lg border border-green-100">{message}</div>}

                {step === 1 ? (
                    <form className="mt-8 space-y-6" onSubmit={handleSendOtp}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                                <input id="mobile" name="mobile" type="text" required
                                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter your 10-digit mobile number"
                                    onChange={(e) => setMobile(e.target.value)} value={mobile} />
                            </div>
                        </div>

                        <div>
                            <button type="submit" disabled={loading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                                {loading ? "Sending..." : "Send OTP"}
                            </button>
                        </div>
                    </form>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">Enter OTP</label>
                                <input id="otp" name="otp" type="text" required
                                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm tracking-widest text-center text-xl font-bold"
                                    placeholder="• • • • • •" maxLength={6}
                                    onChange={(e) => setOtp(e.target.value)} value={otp} />
                            </div>
                            <div>
                                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                <input id="newPassword" name="newPassword" type="password" required
                                    className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="Enter string new password" minLength={6}
                                    onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />
                            </div>
                        </div>

                        <div>
                            <button type="submit" disabled={loading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                                {loading ? "Resetting..." : "Reset Password"}
                            </button>
                        </div>
                    </form>
                )}

                <div className="text-center text-sm pt-4">
                    <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
