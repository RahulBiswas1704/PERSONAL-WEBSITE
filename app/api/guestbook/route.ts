import { kv } from '@vercel/kv';
import { NextRequest, NextResponse } from 'next/server';

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: string;
  contactInfo?: string;
  adminReply?: string;
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
    const { name, message, contactInfo } = await req.json();
    if (!message || message.trim() === '') {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const entry: GuestbookEntry = {
      id: crypto.randomUUID(),
      name: name?.trim() || 'Anonymous',
      message: message.trim(),
      timestamp: new Date().toISOString(),
      contactInfo: contactInfo?.trim(),
    };

    await kv.lpush('guestbook:entries', entry);
    return NextResponse.json(entry);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to post message' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { id, adminReply, password } = await req.json();

    if (password !== 'Rahul.1704#') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const entries = await kv.lrange<GuestbookEntry>('guestbook:entries', 0, -1);
    const entryIndex = entries.findIndex(e => e.id === id);

    if (entryIndex === -1) {
      return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    }

    // Update the specific entry
    const entry = entries[entryIndex];
    entry.adminReply = adminReply;

    // Vercel KV doesn't have an easy lset by id, so we'll re-upload the list
    // This is safe assuming list is small (guestbooks usually are)
    await kv.lset('guestbook:entries', entryIndex, entry);

    return NextResponse.json(entry);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update entry' }, { status: 500 });
  }
}
