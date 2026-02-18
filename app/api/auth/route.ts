import { NextResponse } from 'next/server';

const VALID_USER = 'naimara';
const VALID_PASS = 'naimara2026';

export async function GET(request: Request) {
  // Verificar si está autenticado
  const cookie = request.headers.get('cookie');
  if (cookie && cookie.includes('lavoisier_auth=true')) {
    return NextResponse.json({ authenticated: true });
  }
  return NextResponse.json({ authenticated: false }, { status: 401 });
}

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (username === VALID_USER && password === VALID_PASS) {
      const response = NextResponse.json({ success: true });
      response.cookies.set('lavoisier_auth', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 horas
      });
      return response;
    }

    return NextResponse.json({ success: false, error: 'Credenciales incorrectas' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Error en autenticación' }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('lavoisier_auth');
  return response;
}
