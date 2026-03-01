import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/admin/login");
    }

    return (
        <div className="flex bg-slate-50 min-h-[calc(100vh-5rem)] relative">
            {/* Sidebar */}
            <aside className="w-16 md:w-64 bg-slate-900 text-white flex flex-col sticky top-20 h-[calc(100vh-5rem)] z-10 shadow-xl transition-all duration-300">
                <div className="p-4 md:p-6 border-b border-slate-800 flex items-center justify-center md:justify-start">
                    <Link href="/">
                        <h2 className="hidden md:block text-2xl font-extrabold text-blue-500 hover:text-white transition">Admin Panel</h2>
                        <span className="md:hidden text-2xl font-black text-blue-500 hover:text-white transition">A</span>
                    </Link>
                </div>
                <nav className="flex-1 p-2 md:p-4 space-y-2 mt-4 overflow-y-auto overflow-x-hidden">
                    <Link href="/admin/dashboard" className="flex items-center justify-center md:justify-start px-2 md:px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-blue-400 transition font-medium group">
                        <span className="text-xl md:hidden">📊</span>
                        <span className="hidden md:block">Dashboard</span>
                    </Link>
                    <Link href="/admin/products" className="flex items-center justify-center md:justify-start px-2 md:px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-blue-400 transition font-medium group">
                        <span className="text-xl md:hidden">📦</span>
                        <span className="hidden md:block">Products</span>
                    </Link>
                    <Link href="/admin/inquiries" className="flex items-center justify-center md:justify-start px-2 md:px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-blue-400 transition font-medium group">
                        <span className="text-xl md:hidden">✉️</span>
                        <span className="hidden md:block">Inquiries</span>
                    </Link>
                    <Link href="/admin/repairs" className="flex items-center justify-center md:justify-start px-2 md:px-4 py-3 rounded-lg hover:bg-slate-800 hover:text-blue-400 transition font-medium group">
                        <span className="text-xl md:hidden">🔧</span>
                        <span className="hidden md:block">Repairs</span>
                    </Link>
                </nav>
                <div className="p-2 md:p-4 border-t border-slate-800 mt-auto flex justify-center md:justify-start">
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 w-full max-w-full overflow-hidden">
                {children}
            </main>
        </div>
    );
}
