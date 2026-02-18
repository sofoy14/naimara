import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL || '',
  token: process.env.UPSTASH_REDIS_REST_TOKEN || '',
});

export async function GET() {
  try {
    const consultas = await redis.get('lavoisier:consultas');
    return NextResponse.json(consultas || []);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const consultas = (await redis.get('lavoisier:consultas')) || [];
    const nuevaConsulta = {
      id: Date.now(),
      ...body,
      fecha: new Date().toISOString(),
    };
    consultas.unshift(nuevaConsulta);
    // Mantener solo las últimas 100 consultas
    if (consultas.length > 100) consultas.pop();
    await redis.set('lavoisier:consultas', consultas);
    return NextResponse.json({ success: true, consulta: nuevaConsulta });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error guardando consulta' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const consultas = (await redis.get('lavoisier:consultas')) || [];
    const filtradas = consultas.filter((c: any) => c.id !== id);
    await redis.set('lavoisier:consultas', filtradas);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error eliminando consulta' }, { status: 500 });
  }
}
