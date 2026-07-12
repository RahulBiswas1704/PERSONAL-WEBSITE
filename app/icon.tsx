import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: '#050505',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#10b981', 
          borderRadius: '8px',
          border: '2px solid #064e3b',
          fontWeight: 900,
          fontFamily: 'monospace',
        }}
      >
        O_o
      </div>
    ),
    {
      ...size,
    }
  );
}
