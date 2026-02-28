import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginButton from "@/components/LoginButton";

export default async function AdminLogin() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/admin/dashboard");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 max-w-md w-full text-center border border-slate-100">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Admin Login</h1>
                <p className="text-slate-500 mb-8">Access restricted to authorized personnel.</p>
                <LoginButton />
            </div>
        </div>
    );
}
