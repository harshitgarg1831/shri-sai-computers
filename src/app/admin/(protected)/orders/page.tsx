import connectToDatabase from "@/lib/db";
import Order from "@/models/Order";
import User from "@/models/User";
import OrderStatusSelect from "./OrderStatusSelect";

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage() {
    await connectToDatabase();

    // Ensure User model is loaded since we are populating it
    if (!User) {
        console.warn("User model not loaded");
    }

    const orders = await Order.find()
        .populate("user", "name mobile email")
        .sort({ createdAt: -1 })
        .lean();

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Orders</h1>
                    <p className="text-slate-500 mt-1">Manage and view customer orders.</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider border-b border-slate-100">
                                <th className="p-4 font-semibold text-center">Date</th>
                                <th className="p-4 font-semibold">Customer</th>
                                <th className="p-4 font-semibold">Address</th>
                                <th className="p-4 font-semibold text-center">Items</th>
                                <th className="p-4 font-semibold text-right">Total</th>
                                <th className="p-4 font-semibold text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {orders.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-500">
                                        <div className="text-4xl mb-3">🛍️</div>
                                        <p className="text-lg font-medium text-slate-900">No orders found</p>
                                        <p>When customers place orders, they will appear here.</p>
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order: any) => (
                                    <tr key={order._id.toString()} className="hover:bg-slate-50/80 transition-colors">
                                        <td className="p-4 text-center">
                                            <div className="text-sm font-medium text-slate-900">
                                                {new Date(order.createdAt).toLocaleDateString()}
                                            </div>
                                            <div className="text-xs text-slate-500">
                                                {new Date(order.createdAt).toLocaleTimeString()}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-semibold text-slate-900">{order.user?.name || "Unknown"}</div>
                                            <div className="text-sm text-slate-500">{order.user?.mobile || "No Mobile"}</div>
                                        </td>
                                        <td className="p-4">
                                            <div className="text-sm text-slate-600 max-w-xs truncate" title={order.deliveryAddress}>
                                                {order.deliveryAddress}
                                            </div>
                                        </td>
                                        <td className="p-4 text-center pb-2">
                                            <div className="inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold">
                                                {order.items?.length || 0} items
                                            </div>
                                            <div className="text-xs text-slate-500 mt-1">
                                                {order.items?.map((i: any) => i.name).join(', ').substring(0, 30)}
                                                {order.items?.length > 1 ? '...' : ''}
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="text-base font-bold text-teal-600">₹{order.totalAmount}</div>
                                            <div className="text-xs text-slate-400 capitalize">{order.paymentMethod}</div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <OrderStatusSelect
                                                orderId={order._id.toString()}
                                                currentStatus={order.status || 'pending'}
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
