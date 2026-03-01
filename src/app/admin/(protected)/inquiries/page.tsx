import connectToDatabase from "@/lib/db";
import Inquiry from "@/models/Inquiry";
import { deleteInquiry, markInquiryContacted } from "../actions";

export default async function AdminInquiries() {
    await connectToDatabase();
    const inquiries = await Inquiry.find({}).sort({ createdAt: -1 }).populate("productId");

    return (
        <div>
            <h1 className="text-3xl font-extrabold text-[lab(35_-16.57_-8.25)] mb-8">Inquiries</h1>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100 text-[lab(35_-16.57_-8.25)] font-medium">
                        <tr>
                            <th className="p-4">Date</th>
                            <th className="p-4">Name</th>
                            <th className="p-4">Phone</th>
                            <th className="p-4">Message</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inquiries.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-[lab(35_-16.57_-8.25)]">No inquiries yet.</td>
                            </tr>
                        ) : (
                            inquiries.map((inquiry: any) => (
                                <tr key={inquiry._id} className="border-b border-slate-50 hover:bg-slate-50">
                                    <td className="p-4 text-[lab(35_-16.57_-8.25)] text-sm">{new Date(inquiry.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4 font-semibold text-[lab(35_-16.57_-8.25)]">{inquiry.name}</td>
                                    <td className="p-4 text-[lab(35_-16.57_-8.25)]">{inquiry.phone}</td>
                                    <td className="p-4 text-[lab(35_-16.57_-8.25)] truncate max-w-xs">{inquiry.message}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${inquiry.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                                            {inquiry.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-2 flex justify-end">
                                        {inquiry.status === 'Pending' && (
                                            <form action={markInquiryContacted.bind(null, inquiry._id.toString())}>
                                                <button type="submit" className="text-blue-600 hover:text-blue-800 font-medium text-sm">Mark Contacted</button>
                                            </form>
                                        )}
                                        <form action={deleteInquiry.bind(null, inquiry._id.toString())}>
                                            <button type="submit" className="text-red-500 hover:text-red-700 font-medium text-sm">Delete</button>
                                        </form>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
