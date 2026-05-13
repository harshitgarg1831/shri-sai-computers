import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import LoginButton from "@/components/LoginButton";

export default async function AdminLogin() {
    const session = await getServerSession(authOptions);
    const adminEmail = process.env.ADMIN_EMAIL?.trim();

    if (session && session.user?.email === adminEmail) {
        redirect("/admin/dashboard");
    } else if (session) {
        // If a normal user accidentally hits admin login, redirect them to home instead of infinite looping
        redirect("/");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white p-10 rounded-3xl shadow-xl shadow-slate-200/50 max-w-md w-full text-center border border-slate-100">
                <h1 className="text-3xl font-extrabold text-[lab(35_-16.57_-8.25)] mb-2">Admin Login</h1>
                <p className="text-[lab(35_-16.57_-8.25)] mb-8">Access restricted to authorized personnel.</p>
                <LoginButton />
            </div>
        </div>
    );
}
