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
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-10">
                <div className="p-6 border-b border-slate-800">
                    <Link href="/"><h2 className="text-2xl font-extrabold text-blue-500 hover:text-white transition">Shri Sai Computers Admin</h2></Link>
                </div>
                <nav className="flex-1 p-4 space-y-2 mt-4">
                    <Link href="/admin/dashboard" className="block px-4 py-3 rounded-lg hover:bg-blue-600 transition font-medium">Dashboard</Link>
                    <Link href="/admin/products" className="block px-4 py-3 rounded-lg hover:bg-blue-600 transition font-medium">Products</Link>
                    <Link href="/admin/inquiries" className="block px-4 py-3 rounded-lg hover:bg-blue-600 transition font-medium">Inquiries</Link>
                    <Link href="/admin/repairs" className="block px-4 py-3 rounded-lg hover:bg-blue-600 transition font-medium">Repairs</Link>
                </nav>
                <div className="p-4 border-t border-slate-800 mt-auto">
                    <LogoutButton />
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 ml-64 min-h-screen">
                {children}
            </main>
        </div>
    );
}
