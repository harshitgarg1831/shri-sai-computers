"use client";
import { useTransition } from "react";
import { updateOrderStatus } from "../actions";

export default function OrderStatusSelect({ orderId, currentStatus }: { orderId: string, currentStatus: string }) {
    const [isPending, startTransition] = useTransition();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        startTransition(async () => {
            try {
                await updateOrderStatus(orderId, newStatus);
            } catch (error) {
                console.error("Failed to update status", error);
                alert("Failed to update order status. Please try again.");
            }
        });
    };

    return (
        <select
            value={currentStatus}
            onChange={handleChange}
            disabled={isPending}
            className={`font-semibold rounded-lg text-sm px-3 py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm border
                ${isPending ? 'opacity-50 cursor-wait' : ''}
                ${currentStatus === 'pending' ? 'bg-yellow-50 text-yellow-800 border-yellow-200' : ''}
                ${currentStatus === 'processing' ? 'bg-blue-50 text-blue-800 border-blue-200' : ''}
                ${currentStatus === 'shipped' ? 'bg-purple-50 text-purple-800 border-purple-200' : ''}
                ${currentStatus === 'delivered' ? 'bg-green-50 text-green-800 border-green-200' : ''}
                ${currentStatus === 'cancelled' ? 'bg-red-50 text-red-800 border-red-200' : ''}
                ${!['pending', 'processing', 'shipped', 'delivered', 'cancelled'].includes(currentStatus) ? 'bg-slate-50 text-slate-800 border-slate-200' : ''}
            `}
        >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
        </select>
    );
}
