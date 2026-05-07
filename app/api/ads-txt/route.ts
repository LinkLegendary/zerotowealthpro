import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export function GET() {
  return new NextResponse(
    'google.com, pub-1544364422137939, DIRECT, f08c47fec0942fa0',
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=0, must-revalidate',
      },
    }
  );
}