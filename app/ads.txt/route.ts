import { NextResponse } from 'next/server';

export async function GET() {
  // ⚠️ REPLACE the pub-XXXXXXXXXXXXXXXX with your actual 16-digit AdSense Publisher ID
  const adsText = 'google.com, pub-1544364422137939, DIRECT, f08c47fec0942fa0';
  
  return new NextResponse(adsText, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}