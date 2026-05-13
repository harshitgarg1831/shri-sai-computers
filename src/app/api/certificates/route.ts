import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Certificate from '@/models/Certificate';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();
        const certificates = await Certificate.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: certificates });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
