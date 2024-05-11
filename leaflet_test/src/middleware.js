import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request) {
    console.log(request)
    const path =  request.nextUrl.pathname;
    const isPublic = path==='/' || path==='/register';

    const token = request.cookies.get('token')?.value || '';
    const userType = request.cookies.get('type')?.value || '';

    // TODO:
    if (token) {
        if (userType === 'fleet-owner') {
            
        } else if (userType === 'individual-owner') {
            
        } else if (userType === 'driver') {
            
        }
    }
    // if(token && isPublic){
    //     const isEmployer = request.cookies.get('isEmployer')?.value || '';
    //     if(isEmployer==='true'){
    //         return NextResponse.redirect(new URL('/post',request.nextUrl));
    //     }else
    //         return NextResponse.redirect(new URL('/home',request.nextUrl));
    // }else if(!token && !isPublic){
    //     return NextResponse.redirect(new URL('/',request.nextUrl));
    // }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/','/register','/home','/post','/postjob','/getmyapplications/:path*','/applications']
}
