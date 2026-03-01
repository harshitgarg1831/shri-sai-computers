import connectToDatabase from "@/lib/db";
import RepairRequest from "@/models/RepairRequest";
import { deleteRepair, updateRepairStatus } from "../actions";

export default async function AdminRepairs() {
    await connectToDatabase();
    const repairs = await RepairRequest.find({}).sort({ createdAt: -1 });

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-extrabold text-[lab(35_-16.57_-8.25)]">Repair Requests</h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100 text-[lab(35_-16.57_-8.25)] font-medium">
                        <tr>
                            <th className="p-4">Date</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Device</th>
                            <th className="p-4">Issue</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {repairs.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="p-8 text-center text-[lab(35_-16.57_-8.25)]">No repair requests yet.</td>
                            </tr>
                        ) : (
                            repairs.map((repair: any) => (
                                <tr key={repair._id} className="border-b border-slate-50 hover:bg-slate-50">
                                    <td className="p-4 text-[lab(35_-16.57_-8.25)] text-sm">{new Date(repair.createdAt).toLocaleDateString()}</td>
                                    <td className="p-4 font-semibold text-[lab(35_-16.57_-8.25)]">{repair.name}<br /><span className="text-sm font-normal text-[lab(35_-16.57_-8.25)]">{repair.phone}</span></td>
                                    <td className="p-4 text-[lab(35_-16.57_-8.25)] font-medium">{repair.deviceType}</td>
                                    <td className="p-4 text-[lab(35_-16.57_-8.25)] truncate max-w-xs">{repair.issueDescription}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${repair.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                                            repair.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                                                'bg-green-100 text-green-700'}`}>
                                            {repair.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-3 flex items-center justify-end">
                                        <form action={async (formData: FormData) => {
                                            "use server";
                                            await updateRepairStatus(repair._id.toString(), formData.get("status") as string);
                                        }} className="flex items-center space-x-2">
                                            <select name="status" defaultValue={repair.status} className="text-sm border rounded p-1 bg-white text-[lab(35_-16.57_-8.25)]">
                                                <option value="Pending">Pending</option>
                                                <option value="In Progress">In Progress</option>
                                                <option value="Completed">Completed</option>
                                            </select>
                                            <button type="submit" className="text-blue-600 hover:text-blue-800 font-medium text-xs bg-blue-50 px-2 py-1 rounded">Update</button>
                                        </form>
                                        <form action={deleteRepair.bind(null, repair._id.toString())}>
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
