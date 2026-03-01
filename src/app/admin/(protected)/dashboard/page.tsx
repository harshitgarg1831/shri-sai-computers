import connectToDatabase from "@/lib/db";
import Product from "@/models/Product";
import Inquiry from "@/models/Inquiry";
import RepairRequest from "@/models/RepairRequest";

export default async function AdminDashboard() {
    await connectToDatabase();

    const productCount = await Product.countDocuments();
    const inquiryCount = await Inquiry.countDocuments();
    const repairCount = await RepairRequest.countDocuments();

    // Fetch recent activity
    const recentInquiries = await Inquiry.find().sort({ createdAt: -1 }).limit(3);
    const recentRepairs = await RepairRequest.find().sort({ createdAt: -1 }).limit(2);

    // Combine and sort recent activities natively in JS
    const recents: any[] = [];
    recentInquiries.forEach(i => recents.push({ type: 'inquiry', data: i, date: i.createdAt }));
    recentRepairs.forEach(r => recents.push({ type: 'repair', data: r, date: r.createdAt }));
    recents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const topRecents = recents.slice(0, 4);

    return (
        <div>
            <h1 className="text-3xl font-extrabold text-[lab(35_-16.57_-8.25)] mb-8">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-[lab(35_-16.57_-8.25)] font-medium mb-1">Total Products</p>
                        <h3 className="text-3xl font-black text-[lab(35_-16.57_-8.25)]">{productCount}</h3>
                    </div>
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl">📦</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-[lab(35_-16.57_-8.25)] font-medium mb-1">Inquiries</p>
                        <h3 className="text-3xl font-black text-[lab(35_-16.57_-8.25)]">{inquiryCount}</h3>
                    </div>
                    <div className="w-12 h-12 bg-green-50 text-green-600 rounded-xl flex items-center justify-center text-xl">💬</div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div>
                        <p className="text-[lab(35_-16.57_-8.25)] font-medium mb-1">Repair Requests</p>
                        <h3 className="text-3xl font-black text-[lab(35_-16.57_-8.25)]">{repairCount}</h3>
                    </div>
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center text-xl">🔧</div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                <h2 className="text-xl font-bold text-[lab(35_-16.57_-8.25)] mb-6">Recent Activity</h2>
                <div className="space-y-4">
                    {topRecents.length === 0 && <p className="text-[lab(35_-16.57_-8.25)]">No recent activity found.</p>}
                    {topRecents.map((item, index) => (
                        <div key={index} className="flex items-start pb-4 border-b border-slate-50 last:border-0">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mr-4 ${item.type === 'repair' ? 'bg-purple-50 text-purple-600' : 'bg-green-50 text-green-600'}`}>
                                {item.type === 'repair' ? 'R' : 'I'}
                            </div>
                            <div>
                                <p className="font-semibold text-[lab(35_-16.57_-8.25)]">
                                    {item.type === 'repair' ? `New repair request from ${item.data.name}` : `New inquiry from ${item.data.name}`}
                                </p>
                                <p className="text-[lab(35_-16.57_-8.25)] text-sm">
                                    {new Date(item.date).toLocaleString()} • {item.type === 'repair' ? item.data.deviceType + ' Issue' : item.data.message.substring(0, 40) + '...'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
