import { NextRequest, NextResponse } from 'next/server';
import { saveClick } from '@/lib/analyticsDb';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { platform, url } = body;

    await saveClick({
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      platform: platform || 'Unknown',
      url: url || 'Unknown'
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to log click' }, { status: 500 });
  }
}
