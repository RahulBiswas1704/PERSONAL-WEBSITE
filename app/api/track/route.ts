import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { eventType } = await req.json();

    if (!eventType || (eventType !== 'poke' && eventType !== 'idle_roast')) {
      return NextResponse.json({ error: 'Invalid event type' }, { status: 400 });
    }

    await kv.lpush('analytics:kishmish_events', {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      eventType,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("KV Tracking Error:", error);
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
  }
}
