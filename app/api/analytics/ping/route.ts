import { NextRequest, NextResponse } from 'next/server';
import { updateSessionDuration, updateSessionScrollDepth } from '@/lib/analyticsDb';

export async function POST(req: NextRequest) {
  try {
    let body: any = {};
    
    // Check if the body is text/plain (navigator.sendBeacon usually sends this or FormData/Blob)
    const contentType = req.headers.get('content-type') || '';
    if (contentType.includes('text/plain')) {
      const text = await req.text();
      try {
        body = JSON.parse(text);
      } catch (e) {
        body = {};
      }
    } else {
      try {
        body = await req.json();
      } catch (e) {
        body = {};
      }
    }
    
    const { sessionId, duration, maxScrollDepth } = body;

    if (!sessionId || typeof duration !== 'number') {
      return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 400 });
    }

    await updateSessionDuration(sessionId, duration);
    if (typeof maxScrollDepth === 'number') {
      await updateSessionScrollDepth(sessionId, maxScrollDepth);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to log ping' }, { status: 500 });
  }
}
