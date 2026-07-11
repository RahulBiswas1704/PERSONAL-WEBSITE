import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Rahul - Full-stack Developer & Lifelong Learner';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 75px 75px, #333 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: '80px 120px',
            borderRadius: '32px',
            border: '2px solid #333',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          }}
        >
          <h1 style={{ fontSize: 110, fontWeight: 900, color: 'white', margin: 0, letterSpacing: '-0.05em' }}>
            Rahul.
          </h1>
          <p style={{ fontSize: 40, color: '#f59e0b', marginTop: 10, marginBottom: 0, fontWeight: 'bold' }}>
            Full-stack Developer
          </p>
          <p style={{ fontSize: 32, color: '#a3a3a3', marginTop: 20, marginBottom: 0 }}>
            Builder &middot; Seafarer Dreamer
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
