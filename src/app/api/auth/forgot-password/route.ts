import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        const { mobile } = await req.json();

        if (!mobile) {
            return NextResponse.json({ error: "Mobile number is required" }, { status: 400 });
        }

        await connectToDatabase();

        const user = await User.findOne({ mobile });
        if (!user) {
            return NextResponse.json({ error: "User with this mobile number does not exist" }, { status: 404 });
        }

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Expiry in 5 minutes
        const expiry = new Date(Date.now() + 5 * 60 * 1000);

        user.resetOtp = otp;
        user.resetOtpExpiry = expiry;
        await user.save();

        // In a real application, you would send this OTP via SMS securely using a gateway.
        // For local development, we'll log it out clearly and also optionally return it 
        // to simplify the mock testing workflow.
        console.log(`\n=========================================\n`);
        console.log(`🔒 SECURE MOCK SMS GATEWAY`);
        console.log(`📱 Sending OTP to Mobile: ${mobile}`);
        console.log(`🔑 YOUR OTP IS: ${otp}`);
        console.log(`⏳ Valid for 5 minutes.`);
        console.log(`\n=========================================\n`);

        return NextResponse.json({
            message: "OTP sent successfully",
            success: true
        });

    } catch (error: any) {
        console.error("Forgot password error:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}
