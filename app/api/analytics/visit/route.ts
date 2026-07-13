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
    
    const { 
      country: clientCountry, 
      city: clientCity, 
      sessionId: clientSessionId,
      referrer,
      screenResolution,
      language,
      timezone,
      connectionType,
      path
    } = body as any;

    const userAgent = req.headers.get('user-agent') || 'Unknown';
    // Use Vercel's Edge headers for location, fallback to client-provided data, then fallback to Unknown
    const country = req.headers.get('x-vercel-ip-country') || clientCountry || 'Unknown Country';
    const city = req.headers.get('x-vercel-ip-city') || clientCity || 'Unknown City';
    
    const isMobile = /mobile/i.test(userAgent);
    const device = isMobile ? 'mobile' : 'desktop';

    let os = "Unknown";
    let deviceModel = "Unknown";
    if (/Windows/i.test(userAgent)) os = "Windows";
    else if (/Mac OS|Macintosh/i.test(userAgent)) {
      os = "Mac";
      deviceModel = "Mac";
    }
    else if (/iPhone/i.test(userAgent)) {
      os = "iOS";
      deviceModel = "iPhone";
    }
    else if (/iPad/i.test(userAgent)) {
      os = "iOS";
      deviceModel = "iPad";
    }
    else if (/iPod/i.test(userAgent)) {
      os = "iOS";
      deviceModel = "iPod";
    }
    else if (/Android/i.test(userAgent)) {
      os = "Android";
      // Extract device model from Android UA string (usually like "Android 10; SM-G973F")
      const match = userAgent.match(/Android[^;]+; ([^)]+)\)/);
      if (match && match[1]) {
        deviceModel = match[1].split(' Build/')[0].trim();
      } else {
        deviceModel = "Android Device";
      }
    }
    else if (/Linux/i.test(userAgent)) os = "Linux";

    let browser = "Unknown";
    if (/Chrome|CriOS/i.test(userAgent) && !/Edg/i.test(userAgent)) browser = "Chrome";
    else if (/Safari/i.test(userAgent) && !/Chrome|CriOS/i.test(userAgent)) browser = "Safari";
    else if (/Firefox|FxiOS/i.test(userAgent)) browser = "Firefox";
    else if (/Edg/i.test(userAgent)) browser = "Edge";

    const sessionId = clientSessionId || crypto.randomUUID();

    await saveVisit({
      id: sessionId,
      timestamp: new Date().toISOString(),
      country,
      city,
      userAgent,
      device,
      os,
      browser,
      referrer,
      screenResolution,
      language,
      timezone,
      connectionType,
      path,
      deviceModel
    });

    return NextResponse.json({ success: true, sessionId });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to log visit' }, { status: 500 });
  }
}
