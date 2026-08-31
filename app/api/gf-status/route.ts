import { NextResponse } from 'next/server';
import { getGFStatus, updateGFStatus, verifyPIN } from '@/lib/gf-status';
import { checkRateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';

export async function GET() {
  const status = getGFStatus();
  return NextResponse.json({ success: true, status });
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateLimit = checkRateLimit(ip, 10, 60 * 1000);
    
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { pin, message, level } = body;

    if (!pin || !verifyPIN(String(pin))) {
      return NextResponse.json(
        { error: 'Incorrect PIN. Please enter the valid PIN.' },
        { status: 401 }
      );
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Message cannot be empty.' },
        { status: 400 }
      );
    }

    const validLevel = ['normal', 'important', 'urgent'].includes(level) ? level : 'normal';
    const updatedStatus = updateGFStatus(message, validLevel);

    return NextResponse.json({
      success: true,
      message: 'Status updated successfully!',
      status: updatedStatus
    });
  } catch (error) {
    console.error('Error updating status API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
