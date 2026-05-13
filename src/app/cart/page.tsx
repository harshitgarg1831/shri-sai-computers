"use client";
import React, { useState } from "react";
import { useCart } from "@/components/CartProvider";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
    const { data: session, status } = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState("");

    React.useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/login");
        }
    }, [status, router]);

    React.useEffect(() => {
        if (session?.user && (session.user as any).address && !address) {
            setAddress((session.user as any).address);
        }
    }, [session, address]);

    if (status === "loading" || status === "unauthenticated") {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    const handleCheckout = async () => {
        if (!session) {
            alert("Please login to proceed with checkout.");
            router.push("/login");
            return;
        }

        if (!address) {
            alert("Please enter a delivery address.");
            return;
        }

        setLoading(true);
        try {
            const orderData = {
                items: cart.map(item => ({
                    product: item.productId,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity,
                    image: item.image
                })),
                totalAmount: cartTotal,
                paymentMethod: "Cash on Delivery",
                deliveryAddress: address,
                userId: (session.user as any)?.id // Provided nextauth is configured to send this
            };

            const res = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(orderData)
            });

            if (res.ok) {
                alert("Order placed successfully with Cash on Delivery!");
                clearCart();
                router.push("/");
            } else {
                const err = await res.json();
                alert(err.message || "Failed to place order.");
            }
        } catch (error) {
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    }

    if (cart.length === 0) {
        return (
            <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center justify-center bg-slate-50/30 rounded-3xl mt-8">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner">🛒</div>
                <h1 className="text-3xl font-extrabold text-slate-900 mb-6">Your Cart is Empty</h1>
                <Link href="/products" className="bg-blue-600 text-white font-bold px-8 py-3 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition hover:-translate-y-1">
                    Browse Products
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <h1 className="text-3xl lg:text-4xl font-black mb-8 text-slate-900 border-b border-slate-200 pb-6 flex items-center gap-3">
                <span>🛒</span> Shopping Cart
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                <div className="lg:col-span-2 space-y-6">
                    {cart.map((item) => (
                        <div key={item.productId} className="flex flex-col sm:flex-row gap-6 p-6 bg-white border border-slate-200 rounded-3xl items-center shadow-sm hover:shadow-lg transition duration-300">
                            <div className="w-full sm:w-32 h-32 bg-slate-50 rounded-2xl overflow-hidden shrink-0 border border-slate-100 shadow-inner group">
                                {item.image ? (
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-400 font-medium text-xs">No Image</div>
                                )}
                            </div>
                            <div className="grow w-full text-center sm:text-left">
                                <h3 className="font-bold text-xl text-slate-800 leading-tight mb-2">{item.name}</h3>
                                <p className="text-blue-600 font-black text-2xl mb-4">₹{item.price}</p>
                                <div className="flex items-center justify-center sm:justify-start gap-4">
                                    <div className="flex items-center bg-slate-100 rounded-xl p-1 shadow-inner">
                                        <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center bg-white text-slate-700 font-bold rounded-lg hover:bg-blue-50 hover:text-blue-600 transition shadow-sm">-</button>
                                        <span className="w-10 text-center font-bold text-slate-900 text-lg">{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center bg-white text-slate-700 font-bold rounded-lg hover:bg-blue-50 hover:text-blue-600 transition shadow-sm">+</button>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full sm:w-auto flex justify-center">
                                <button onClick={() => removeFromCart(item.productId)} className="text-red-500 font-bold hover:text-white bg-red-50 hover:bg-red-500 px-5 py-2.5 rounded-xl transition shadow-sm w-full sm:w-auto">Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-200 h-fit shadow-xl shadow-slate-200/50 sticky top-28">
                    <h2 className="text-2xl font-black text-slate-900 mb-6 border-b border-slate-100 pb-4">Order Summary</h2>
                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between items-center text-slate-600 font-medium text-lg">
                            <span>Items Total:</span>
                            <span className="text-slate-900 font-bold">₹{cartTotal}</span>
                        </div>
                        <div className="flex justify-between items-center text-slate-600 font-medium text-lg pb-6 border-b border-slate-100">
                            <span>Delivery:</span>
                            <span className="font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full text-sm tracking-wide">FREE</span>
                        </div>
                        <div className="flex justify-between items-center text-2xl font-black text-slate-900 pt-2">
                            <span>Total:</span>
                            <span className="text-blue-600">₹{cartTotal}</span>
                        </div>
                    </div>

                    <div className="mb-8 mt-6">
                        <div className="mb-4 bg-blue-50/50 p-4 border border-blue-100 rounded-xl">
                            <h3 className="text-sm font-bold text-blue-800 mb-1">Contact Information</h3>
                            <p className="text-sm text-blue-600 font-medium">Name: {session?.user?.name || "Customer"}</p>
                            <p className="text-sm text-blue-600 font-medium">Mobile: {(session?.user as any)?.mobile || "Linked with Account"}</p>
                        </div>
                        <label className="block font-bold text-slate-800 mb-3 text-lg">
                            Delivery Address <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full p-4 border-2 border-slate-200 rounded-2xl resize-none text-slate-900 bg-slate-50 focus:bg-white placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition shadow-inner text-base"
                            rows={3}
                            placeholder="Enter your complete delivery address here..."
                        />
                    </div>

                    <div className="mb-8 p-5 bg-amber-50 rounded-2xl border border-amber-200 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-amber-100 rounded-full translate-x-1/2 -translate-y-1/2 opacity-50"></div>
                        <p className="font-extrabold text-amber-900 flex items-center gap-3 text-lg relative z-10">
                            <span className="text-2xl">💸</span> Cash on Delivery
                        </p>
                        <p className="text-amber-800 mt-2 font-medium leading-relaxed relative z-10">Pay securely with cash when you receive your order at your doorstep.</p>
                    </div>

                    <button
                        onClick={handleCheckout}
                        disabled={loading}
                        className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-3 disabled:opacity-50 transition-all shadow-xl shadow-blue-600/30 text-lg hover:-translate-y-1"
                    >
                        {loading ? "Processing Order..." : "Place Order Now"}
                    </button>
                </div>
            </div>
        </div>
    );
}
