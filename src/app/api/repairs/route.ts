import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import RepairRequest from '@/models/RepairRequest';

export async function GET() {
    try {
        await connectToDatabase();
        const repairs = await RepairRequest.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: repairs });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();
        const body = await req.json();
        const repair = await RepairRequest.create(body);
        return NextResponse.json({ success: true, data: repair }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
