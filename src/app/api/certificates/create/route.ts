import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Certificate from '@/models/Certificate';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await connectToDatabase();
        const body = await req.json();
        
        // Ensure unique ID check before creating
        const existing = await Certificate.findOne({ certificateId: body.certificateId });
        if (existing) {
            return NextResponse.json({ success: false, error: 'Certificate ID already exists' }, { status: 400 });
        }

        const certificate = await Certificate.create(body);
        return NextResponse.json({ success: true, data: certificate }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
