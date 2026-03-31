import { NextRequest, NextResponse } from "next/server";

let requestCount = 0;

export function middleware(req: NextRequest){
    requestCount++;
    const res = NextResponse.next();
    console.log(requestCount);
    return res;
}

// it runs on all route 

// for specific routes
export const config = {
    matcher: ['/api/:path*'],
}

// selectively running middleware

// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
// console. log(request.nextUrl.pathname)
// if (request.nextUrl.pathname.startsWith('/admin')) {
// return NextResponse.redirect(new URL('/signin', request.url))

// }

// if (request.nextUrl.pathname.startsWith('/dashboard')) {
// return NextResponse.next()


// Example with next auth

// import { withAuth } from 'next-auth/middleware';
// import { NextResponse } from 'next/server';

// export const config = {
// matcher: ['/courses/:path*'],
// };

// export default withAuth(async (req) => {
// if (process.env.LOCAL_CMS_PROVIDER) return;

// const token = req.nextauth.token;
// if (!token) {
// return NextResponse. redirect(new URL('/invalidsession', req.url));

// const user = await fetch(
// '${process.env.NEXT_PUBLIC_BASE_URL_LOCAL}/api/user?token=${token.jwtToken}',

// }

// const json = await user.json();
// if (!json.user) {
// return NextResponse. redirect(new URL('/invalidses]ion', req.url));

// }
//};