import { NextRequest, NextResponse } from "next/server";


export default async function middleware(request:NextRequest) {
  const { pathname } = request.nextUrl;

  const openRoutesMap :any = {
    "/":1,
    "/login":1,
    "/register":1
  }  
  const user = request.cookies.get("token");
  if(openRoutesMap[pathname] && user?.value){
    request.nextUrl.pathname = '/dashboard'
    return NextResponse.redirect(request.nextUrl)
  }
  if (openRoutesMap[pathname] || pathname.startsWith("/manifest")||pathname.startsWith("/_") || pathname.startsWith("/login") ) {
    return NextResponse.next()
  }
  if(!user?.value){
    request.nextUrl.pathname = '/login';
    request.nextUrl.searchParams.set("redirectUrl",pathname ) 
    return NextResponse.redirect(request.nextUrl)
  }
  return NextResponse.next()
//   // apply trailing slash handling
//   if (
//     !pathname.endsWith('/') &&
//     !pathname.match(/((?!\.well-known(?:\/.*)?)(?:[^/]+\/)*[^/]+\.\w+)/)
//   ) {
//     request.nextUrl.pathname += '/'
//     return NextResponse.redirect(request.nextUrl)
//   }
}