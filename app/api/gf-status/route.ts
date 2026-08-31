import { NextResponse } from 'next/server';
import { getSystemStatusAsync, updateSystemStatusAsync, verifyPIN } from '@/lib/gf-status';
import { checkRateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const noCacheHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export async function GET() {
  const status = await getSystemStatusAsync();
  return NextResponse.json({ success: true, status }, { headers: noCacheHeaders });
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateLimit = checkRateLimit(ip, 10, 60 * 1000);
    
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a minute.' },
        { status: 429, headers: noCacheHeaders }
      );
    }

    const body = await request.json();
    const { pin, message, level } = body;

    if (!pin || !verifyPIN(String(pin))) {
      return NextResponse.json(
        { error: 'Invalid Passcode. Please enter valid 4-digit PIN.' },
        { status: 401, headers: noCacheHeaders }
      );
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Message payload cannot be empty.' },
        { status: 400, headers: noCacheHeaders }
      );
    }

    const validLevel = ['normal', 'important', 'urgent'].includes(level) ? level : 'normal';
    const updatedStatus = await updateSystemStatusAsync(message, validLevel);

    return NextResponse.json({
      success: true,
      message: 'System status updated!',
      status: updatedStatus
    }, { headers: noCacheHeaders });
  } catch (error) {
    console.error('Error updating status API:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500, headers: noCacheHeaders }
    );
  }
}
