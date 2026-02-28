import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Inquiry from '@/models/Inquiry';

export async function GET() {
    try {
        await connectToDatabase();
        const inquiries = await Inquiry.find({}).sort({ createdAt: -1 }).populate('productId', 'name');
        return NextResponse.json({ success: true, data: inquiries });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const body = await req.json();
        const inquiry = await Inquiry.create(body);
        return NextResponse.json({ success: true, data: inquiry }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
