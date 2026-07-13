import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get('text');
  const lang = searchParams.get('lang') || 'en';

  if (!text) {
    return new NextResponse('Missing text', { status: 400 });
  }

  try {
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${lang}&q=${encodeURIComponent(text)}`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Google TTS failed: ${response.statusText}`);
    }

    const audioBuffer = await response.arrayBuffer();

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch (error) {
    console.error('TTS error:', error);
    return new NextResponse('Error generating TTS', { status: 500 });
  }
}
