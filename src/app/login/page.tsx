"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const res = await signIn("credentials", {
            redirect: false,
            mobile,
            password,
        });

        if (res?.error) {
            setError(res.error);
            setLoading(false);
        } else {
            router.push("/");
            // Force refresh to update session state in Navbar etc
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="mobile" className="sr-only">Mobile Number</label>
                            <input id="mobile" name="mobile" type="text" required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Mobile Number" onChange={(e) => setMobile(e.target.value)} value={mobile} />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" required
                                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                                placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                        </div>
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="text-sm">
                            <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                                Forgot your password?
                            </Link>
                        </div>
                    </div>

                    <div>
                        <button type="submit" disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                            {loading ? "Signing in..." : "Sign in"}
                        </button>
                    </div>
                </form>
                <div className="text-center text-sm flex flex-col space-y-2">
                    <div>
                        <span className="text-gray-600">Don't have an account? </span>
                        <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                            Register
                        </Link>
                    </div>
                    <div>
                        <Link href="/admin/login" className="font-medium text-gray-400 hover:text-gray-600">
                            Login as Admin
                        </Link>
                    </div>
                </div>
            </div >
        </div >
    );
}
