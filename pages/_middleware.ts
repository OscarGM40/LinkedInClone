import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  /* puedo añadir más rutas con pathname=path && pathname= path parece que solo tendremos una */
  if (req.nextUrl.pathname === "/") {
    /* getToken captura el token de la req,siempre que vaya en el header Authorization o en una cookie */
    const session = await getToken({
      req,
      secret: process.env.JWT_SECRET,
      secureCookie: process.env.NODE_ENV === "production", //es obligatorio para que funcione en prod
    });
    // si no hay jwt valido redirigo.Fijate que podria comprobar roles,etc aqui,y que puedo usar redirect o rewrite
    if (!session) {
      /* const url = req.nextUrl.clone();
      url.pathname = "/home";
      return NextResponse.rewrite(url); */
      return NextResponse.redirect(`${req.nextUrl.origin}/home`); //otra forma
    }
    // si si lo hay,no hago nada,el user continua navegando
  }
}