import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

export async function GET() {
  try {
    const entries = await kv.lrange<GuestbookEntry>('guestbook:entries', 0, -1);
    return NextResponse.json(entries || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch entries' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, message } = await req.json();
    if (!message || message.trim() === '') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const entry: GuestbookEntry = {
      id: crypto.randomUUID(),
      name: name?.trim() || 'Anonymous',
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    await kv.lpush('guestbook:entries', entry);
    return NextResponse.json(entry);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to post message' }, { status: 500 });
  }
}
