import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest ) {
    console.log('middleware')
    try{
        const isPublicPage = request.nextUrl.pathname === '/login' || 
                             request.nextUrl.pathname === '/register' || 
                             request.nextUrl.pathname === '/forgotpass' || 
                             request.nextUrl.pathname === '/reset-password' || 
                             request.nextUrl.pathname === '/maintenance' || 
                             request.nextUrl.pathname === '/coming-soon'

        const token = request.cookies.get('token')?.value
        if(token && isPublicPage){
            return NextResponse.redirect(new URL('/backend/dashboard', request.nextUrl))
        }

        if(!token && !isPublicPage){
            return NextResponse.redirect(new URL('/login', request.nextUrl))
        }

        return NextResponse.next()
    }
    catch(e){
        console.error(e)
        return NextResponse.error()
    }
}

export const config = {
    matcher: [
        "/login",
        "/register",
        "/forgotpass",
        "/reset-password",
        "/maintenance",
        "/coming-soon",
        "/backend/:path*",
    ]
}