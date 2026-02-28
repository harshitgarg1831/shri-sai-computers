import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Inquiry from '@/models/Inquiry';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectToDatabase();
        const body = await req.json();
        const inquiry = await Inquiry.findByIdAndUpdate(id, body, { new: true });
        if (!inquiry) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
        return NextResponse.json({ success: true, data: inquiry });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        await connectToDatabase();
        const inquiry = await Inquiry.findByIdAndDelete(id);
        if (!inquiry) return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 });
        return NextResponse.json({ success: true, data: {} });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
