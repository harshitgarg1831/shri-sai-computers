import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import connectToDatabase from "@/lib/db";
import Order from "@/models/Order";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export const dynamic = 'force-dynamic';

export default async function MyOrdersPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
        redirect("/login");
    }

    await connectToDatabase();

    const userId = (session.user as any).id;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 }).lean();

    const getStatusStep = (status: string) => {
        switch (status) {
            case 'pending': return 1;
            case 'processing': return 2;
            case 'shipped': return 3;
            case 'delivered': return 4;
            case 'cancelled': return -1;
            default: return 1;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <main className="grow py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
                <h1 className="text-3xl font-extrabold text-slate-900 mb-8 flex items-center gap-3">
                    <span className="text-4xl text-blue-500">📦</span> My Orders
                </h1>

                {orders.length === 0 ? (
                    <div className="bg-white p-12 rounded-3xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-4xl mb-4">🛒</div>
                        <h2 className="text-2xl font-bold text-slate-800 mb-2">No Orders Yet</h2>
                        <p className="text-slate-500 mb-6 max-w-md">You haven't placed any orders yet. Browse our products and find something you like!</p>
                        <Link href="/products" className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/30">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order: any) => {
                            const step = getStatusStep(order.status || 'pending');
                            return (
                                <div key={order._id.toString()} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-100">
                                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-6 border-b border-slate-100 gap-4">
                                        <div>
                                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Order #{order._id.toString().substring(order._id.toString().length - 8).toUpperCase()}</p>
                                            <p className="text-slate-600 font-medium">Placed on: {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</p>
                                        </div>
                                        <div className="text-right w-full md:w-auto flex flex-row md:flex-col justify-between md:justify-end items-center md:items-end">
                                            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Total Amount</p>
                                            <p className="text-2xl font-black text-blue-600">₹{order.totalAmount}</p>
                                        </div>
                                    </div>

                                    {/* Tracking Bar */}
                                    {step > 0 && (
                                        <div className="mb-10 px-2 mt-8">
                                            <div className="relative">
                                                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-slate-100">
                                                    <div style={{ width: `${(step - 1) * 33.33}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-500"></div>
                                                </div>
                                                <div className="flex justify-between text-xs font-bold text-slate-500 relative top-[-8px]">
                                                    <div className={`text-center ${step >= 1 ? 'text-blue-600' : ''}`}><div className={`w-4 h-4 mx-auto rounded-full mb-1 ${step >= 1 ? 'bg-blue-600 border-4 border-blue-100' : 'bg-slate-300'}`}></div>Pending</div>
                                                    <div className={`text-center ${step >= 2 ? 'text-blue-600' : ''}`}><div className={`w-4 h-4 mx-auto rounded-full mb-1 ${step >= 2 ? 'bg-blue-600 border-4 border-blue-100' : 'bg-slate-300'}`}></div>Processing</div>
                                                    <div className={`text-center ${step >= 3 ? 'text-blue-600' : ''}`}><div className={`w-4 h-4 mx-auto rounded-full mb-1 ${step >= 3 ? 'bg-blue-600 border-4 border-blue-100' : 'bg-slate-300'}`}></div>Shipped</div>
                                                    <div className={`text-center ${step >= 4 ? 'text-green-600' : ''}`}><div className={`w-4 h-4 mx-auto rounded-full mb-1 ${step >= 4 ? 'bg-green-600 border-4 border-green-100' : 'bg-slate-300'}`}></div>Delivered</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {step === -1 && (
                                        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl font-bold flex items-center justify-center border border-red-100 text-lg">
                                            🚫 This order has been cancelled.
                                        </div>
                                    )}

                                    {/* Items List */}
                                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                        <h3 className="font-bold text-slate-800 mb-4">Items in your order:</h3>
                                        <div className="space-y-3">
                                            {order.items?.map((item: any, idx: number) => (
                                                <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
                                                            {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <div className="text-[8px] flex items-center justify-center w-full h-full text-slate-400">No Img</div>}
                                                        </div>
                                                        <div>
                                                            <p className="font-bold text-slate-700">{item.name}</p>
                                                            <p className="text-xs font-semibold text-slate-500">Qty: {item.quantity}</p>
                                                        </div>
                                                    </div>
                                                    <p className="font-black text-slate-800">₹{item.price}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mt-4 text-sm font-medium text-slate-500 flex items-center gap-2">
                                        <span className="text-lg">📍</span> Delivery Address: <span className="text-slate-800 font-bold">{order.deliveryAddress}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </main>
        </div>
    );
}
