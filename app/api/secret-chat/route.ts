import { NextResponse } from 'next/server';
import { getChatDataAsync, addChatMessageAsync, clearUserChatAsync, verifyChatPIN } from '@/lib/secret-chat';
import { checkRateLimit } from '@/lib/rate-limit';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const noCacheHeaders = {
  'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
  'Pragma': 'no-cache',
  'Expires': '0',
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pin = searchParams.get('pin');
    
    if (!pin) {
      return NextResponse.json({ error: 'PIN required' }, { status: 401, headers: noCacheHeaders });
    }

    const auth = verifyChatPIN(pin);
    if (!auth.valid || !auth.user) {
      return NextResponse.json({ error: 'Invalid PIN' }, { status: 401, headers: noCacheHeaders });
    }

    const chatData = await getChatDataAsync();
    const userClearedAt = auth.user === 'ankit' ? chatData.clearedAtAnkit : chatData.clearedAtGf;

    // Filter messages if user cleared their view earlier today
    let visibleMessages = chatData.messages || [];
    if (userClearedAt) {
      const clearedTime = new Date(userClearedAt).getTime();
      visibleMessages = visibleMessages.filter(msg => {
        return new Date(msg.timestamp).getTime() > clearedTime;
      });
    }

    return NextResponse.json({
      success: true,
      user: auth.user,
      messages: visibleMessages
    }, { headers: noCacheHeaders });
  } catch (e) {
    console.error('Error fetching chat:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: noCacheHeaders });
  }
}

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const rateLimit = checkRateLimit(ip, 60, 60 * 1000);
    
    if (!rateLimit.success) {
      return NextResponse.json({ error: 'Rate limit exceeded.' }, { status: 429, headers: noCacheHeaders });
    }

    const body = await request.json();
    const { pin, action, text } = body;

    const auth = verifyChatPIN(pin);
    if (!auth.valid || !auth.user) {
      return NextResponse.json({ error: 'Invalid Passcode' }, { status: 401, headers: noCacheHeaders });
    }

    if (action === 'clear') {
      await clearUserChatAsync(auth.user);
      return NextResponse.json({
        success: true,
        message: 'Your chat view has been cleared.',
        user: auth.user,
        messages: []
      }, { headers: noCacheHeaders });
    }

    // Default action: send message
    if (!text || typeof text !== 'string' || !text.trim()) {
      return NextResponse.json({ error: 'Message content cannot be empty.' }, { status: 400, headers: noCacheHeaders });
    }

    await addChatMessageAsync(auth.user, text.trim());
    
    // Fetch updated chat data for this user
    const updatedChat = await getChatDataAsync();
    const userClearedAt = auth.user === 'ankit' ? updatedChat.clearedAtAnkit : updatedChat.clearedAtGf;

    let visibleMessages = updatedChat.messages || [];
    if (userClearedAt) {
      const clearedTime = new Date(userClearedAt).getTime();
      visibleMessages = visibleMessages.filter(msg => new Date(msg.timestamp).getTime() > clearedTime);
    }

    return NextResponse.json({
      success: true,
      user: auth.user,
      messages: visibleMessages
    }, { headers: noCacheHeaders });
  } catch (e) {
    console.error('Error posting chat:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers: noCacheHeaders });
  }
}
