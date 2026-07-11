import { NextResponse } from 'next/server';

export const revalidate = 30; // Cache for 30 seconds

export async function GET() {
  try {
    const API_KEY = process.env.LASTFM_API_KEY;
    const USERNAME = process.env.LASTFM_USERNAME;

    if (!API_KEY || !USERNAME) {
      return NextResponse.json({ error: 'Missing Last.fm configuration' }, { status: 500 });
    }

    const url = `http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${USERNAME}&api_key=${API_KEY}&format=json&limit=3`;
    const res = await fetch(url);
    
    if (!res.ok) throw new Error('Failed to fetch from Last.fm');
    
    const data = await res.json();
    
    if (!data.recenttracks || !data.recenttracks.track) {
      return NextResponse.json([]);
    }

    const tracks = data.recenttracks.track.map((t: any) => ({
      title: t.name,
      artist: t.artist['#text'],
      cover: t.image.find((img: any) => img.size === 'extralarge')?.['#text'] || t.image.find((img: any) => img.size === 'large')?.['#text'] || '',
      url: `https://music.youtube.com/search?q=${encodeURIComponent(t.artist['#text'] + ' ' + t.name)}`,
      nowPlaying: t['@attr']?.nowplaying === 'true'
    }));

    return NextResponse.json(tracks);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch music' }, { status: 500 });
  }
}
