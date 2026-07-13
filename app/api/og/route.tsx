import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    // Dynamic params
    const title = searchParams.get('title') || 'Rahul Biswas';
    const description = searchParams.get('description') || 'Software Engineer & Builder';

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
          {/* Subtle Glow */}
          <div
            style={{
              position: 'absolute',
              top: '-20%',
              left: '-10%',
              width: '800px',
              height: '800px',
              background: 'radial-gradient(circle, rgba(234,88,12,0.15) 0%, rgba(0,0,0,0) 70%)',
              borderRadius: '50%',
            }}
          />

          {/* Main Content Card */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '2px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '32px',
              padding: '60px 80px',
              width: '80%',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
            }}
          >
            <div
              style={{
                fontSize: 24,
                textTransform: 'uppercase',
                letterSpacing: '0.3em',
                color: '#ea580c', // Orange-600
                fontWeight: 900,
                marginBottom: 20,
              }}
            >
              namaste.
            </div>
            
            <div
              style={{
                fontSize: 80,
                fontWeight: 900,
                color: '#ffffff',
                lineHeight: 1.1,
                letterSpacing: '-0.05em',
                marginBottom: 30,
              }}
            >
              {title}
            </div>

            <div
              style={{
                fontSize: 32,
                color: '#a3a3a3', // neutral-400
                fontWeight: 500,
              }}
            >
              {description}
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    console.error(`Error generating OG image: ${e.message}`);
    return new Response(`Failed to generate image`, {
      status: 500,
    });
  }
}
