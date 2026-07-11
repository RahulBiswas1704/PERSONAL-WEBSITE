import { NextRequest, NextResponse } from 'next/server';
import { saveVisit } from '@/lib/analyticsDb';

export async function POST(req: NextRequest) {
  try {
    let body = {};
    try {
      body = await req.json();
    } catch (e) {
      // Ignore empty body errors
    }
    
    const { country: clientCountry, city: clientCity } = body as any;

    const userAgent = req.headers.get('user-agent') || 'Unknown';
    // Use Vercel's Edge headers for location, fallback to client-provided data, then fallback to Unknown
    const country = req.headers.get('x-vercel-ip-country') || clientCountry || 'Unknown Country';
    const city = req.headers.get('x-vercel-ip-city') || clientCity || 'Unknown City';
    
    const isMobile = /mobile/i.test(userAgent);
    const device = isMobile ? 'mobile' : 'desktop';

    await saveVisit({
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      country,
      city,
      userAgent,
      device
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to log visit' }, { status: 500 });
  }
}
