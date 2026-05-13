import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const { mobile, otp, newPassword } = await req.json();

        if (!mobile || !otp || !newPassword) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        await connectToDatabase();

        const user = await User.findOne({ mobile });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Verify OTP
        if (!user.resetOtp || user.resetOtp !== otp.trim()) {
            return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
        }

        // Check Expiry
        if (!user.resetOtpExpiry || new Date() > user.resetOtpExpiry) {
            return NextResponse.json({ error: "OTP has expired. Please request a new one." }, { status: 400 });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user
        user.password = hashedPassword;
        user.resetOtp = undefined;
        user.resetOtpExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Password reset successfully",
            success: true
        });

    } catch (error: any) {
        console.error("Reset password error:", error);
        return NextResponse.json({ error: "Failed to reset password" }, { status: 500 });
    }
}
