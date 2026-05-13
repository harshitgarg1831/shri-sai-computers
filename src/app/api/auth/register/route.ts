import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const { name, mobile, password, address } = await req.json();

        if (!name || !mobile || !password || !address) {
            return NextResponse.json({ message: "All fields are required" }, { status: 400 });
        }

        const existingUser = await User.findOne({ mobile });
        if (existingUser) {
            return NextResponse.json({ message: "User with this mobile number already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            mobile,
            password: hashedPassword,
            address,
            role: "user"
        });

        return NextResponse.json({ message: "User registered successfully", user: { id: newUser._id, name: newUser.name, mobile: newUser.mobile } }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: "Error registering user", error: error.message }, { status: 500 });
    }
}
