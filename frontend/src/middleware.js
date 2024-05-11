import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'

export async function middleware(request) {
    const path = request.nextUrl.pathname;
    const isPublic = ['/', '/partners', '/driverregister', '/fleetownerregister', '/individualownerregister'].includes(path);
    const isPrivate = ['/driver', '/fleetowner', '/individualowner'].includes(path);

    const token = request.cookies.get('token')?.value || '';
    const type = request.cookies.get('type')?.value || '';

    if (token && type) {
        if (isPublic) {
            if (type === 'Driver') {
                return NextResponse.redirect(new URL('/driver', request.nextUrl));
            } else if (type === 'Fleet_Owner') {
                return NextResponse.redirect(new URL('/fleetowner', request.nextUrl));
            } else if (type === 'Individual_Owner') {
                return NextResponse.redirect(new URL('/individualowner', request.nextUrl));
            }
        } else if (isPrivate) {
            if (type === 'Driver' && path !== '/driver') {
                return NextResponse.redirect(new URL('/driver', request.nextUrl));
            } else if (type === 'Fleet_Owner' && path !== '/fleetowner') {
                return NextResponse.redirect(new URL('/fleetowner', request.nextUrl));
            } else if (type === 'Individual_Owner' && path !== '/individualowner') {
                return NextResponse.redirect(new URL('/individualowner', request.nextUrl));
            }
        }
    } else if (!token && isPrivate) {
        return NextResponse.redirect(new URL('/', request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/partners', '/driverregister', '/fleetownerregister', '/individualownerregister', '/driver', '/fleetowner', '/individualowner']
}
