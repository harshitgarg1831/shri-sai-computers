import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import Inquiry from "@/models/Inquiry";
import RepairRequest from "@/models/RepairRequest";
import Order from "@/models/Order";
import Link from "next/link";

export default async function AdminDashboard() {
    await connectToDatabase();

    const productCount = await Product.countDocuments();
    const inquiryCount = await Inquiry.countDocuments();
    const repairCount = await RepairRequest.countDocuments();
    const orderCount = await Order.countDocuments();

    // Fetch recent activity
    const recentInquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(3);
    const recentRepairs = await RepairRequest.find().sort({ createdAt: -1 }).limit(2);
    const recentOrders = await Order.find().populate('user', 'name').sort({ createdAt: -1 }).limit(2);

    // Combine and sort recent activities natively in JS
    const recents: any[] = [];
    recentInquiries.forEach(i => recents.push({ type: 'inquiry', data: i, date: i.createdAt }));
    recentRepairs.forEach(r => recents.push({ type: 'repair', data: r, date: r.createdAt }));
    recentOrders.forEach(o => recents.push({ type: 'order', data: o, date: o.createdAt }));
    recents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const topRecents = recents.slice(0, 5);

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-extrabold text-slate-800">Dashboard Overview</h1>
                <Link href="/admin/orders" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-sm">
                    View All Orders
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-slate-600 font-medium mb-1">Total Products</p>
                        <h3 className="text-3xl font-black text-slate-800">{productCount}</h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl">📦</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between border-l-4 border-l-teal-500">
                    <div>
                        <p className="text-slate-600 font-medium mb-1">Total Orders</p>
                        <h3 className="text-3xl font-black text-slate-800">{orderCount}</h3>
                    </div>
                    <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center text-xl">🛍️</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-slate-600 font-medium mb-1">Inquiries</p>
                        <h3 className="text-3xl font-black text-slate-800">{inquiryCount}</h3>
                    </div>
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-xl">💬</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-slate-600 font-medium mb-1">Repair Requests</p>
                        <h3 className="text-3xl font-black text-slate-800">{repairCount}</h3>
                    </div>
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl">🔧</div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Recent Activity</h2>
                <div className="space-y-4">
                    {topRecents.length === 0 && <p className="text-slate-600">No recent activity found.</p>}
                    {topRecents.map((item, index) => (
                        <div key={index} className="flex items-start pb-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 p-2 rounded transition">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 shrink-0 
                                ${item.type === 'repair' ? 'bg-purple-50 text-purple-600' :
                                    item.type === 'order' ? 'bg-teal-50 text-teal-600' : 'bg-green-50 text-green-600'}`}>
                                {item.type === 'repair' ? 'R' : item.type === 'order' ? 'O' : 'I'}
                            </div>
                            <div>
                                <p className="font-semibold text-slate-800">
                                    {item.type === 'repair' ? `New repair request from ${item.data.name}` :
                                        item.type === 'order' ? `New Order placed by ${item.data.user?.name || "Customer"}` :
                                            `New inquiry from ${item.data.name}`
                                    }
                                </p>
                                <p className="text-slate-500 text-sm mt-1">
                                    {new Date(item.date).toLocaleString()} •
                                    {item.type === 'repair' ? item.data.deviceType + ' Issue' :
                                        item.type === 'order' ? `Amount: ₹${item.data.totalAmount}` :
                                            item.data.message.substring(0, 40) + '...'
                                    }
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
