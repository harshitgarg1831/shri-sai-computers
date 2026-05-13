import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Order from "@/models/Order";

export async function POST(req: Request) {
    try {
        await connectToDatabase();
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        const { items, totalAmount, paymentMethod, deliveryAddress, userId } = data;

        if (!items || items.length === 0) {
            return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
        }

        const newOrder = await Order.create({
            user: userId || (session.user as any).id,
            items,
            totalAmount,
            paymentMethod: paymentMethod || "Cash on Delivery",
            status: "pending",
            deliveryAddress
        });

        return NextResponse.json({ message: "Order placed successfully", orderId: newOrder._id }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: "Error placing order", error: error.message }, { status: 500 });
    }
}
