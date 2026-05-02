import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { token, cookieName = 'payload-token' } = await req.json()
    if (!token) return NextResponse.json({ ok: false, error: 'missing token' }, { status: 400 })

    const res = NextResponse.redirect(new URL('/admin', req.url))
    // set cookie for 7 days
    const maxAge = 60 * 60 * 24 * 7
    res.cookies.set(cookieName, token, {
      httpOnly: true,
      path: '/',
      maxAge,
      sameSite: 'lax',
    })
    return res
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
