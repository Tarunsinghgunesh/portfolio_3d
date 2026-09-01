import { NextResponse } from 'next/server';
import { fetchLiveSiteData } from '@/lib/scraper';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const data = await fetchLiveSiteData();
    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: 'Failed to sync data', message: err?.message },
      { status: 500 }
    );
  }
}
