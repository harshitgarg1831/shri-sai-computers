import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/db';
import Certificate from '@/models/Certificate';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const id = (await params).id;
        await connectToDatabase();
        const certificate = await Certificate.findOne({ certificateId: id });
        
        if (!certificate) {
            return NextResponse.json({ success: false, error: 'Certificate not found' }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: certificate });
    } catch (error: any) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
    }
}
