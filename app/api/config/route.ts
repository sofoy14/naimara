import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function GET() {
  try {
    const config = await redis.get('lavoisier:config');
    return NextResponse.json(config || { enColombia: true });
  } catch (error) {
    return NextResponse.json({ enColombia: true });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await redis.set('lavoisier:config', body);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error guardando config' }, { status: 500 });
  }
}
