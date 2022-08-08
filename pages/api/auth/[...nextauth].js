import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "lib/mongodb";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  // recuerda que Next en production necesita un secret
  secret: process.env.JWT_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  // puedo cambiar las pages para el login y el logout
  pages: {
    signIn: "/home",
  },
  // si bien la forma de guardar la session es con un jwt en una cookie,al usar un adapter se pone en database.Si no lo quiero en database tengo que setear de nuevo esta propiedad session.strategy(si uso database solo usa una cookie por sesión)
  session: {
    strategy: "jwt",
    maxAge: 86400, // cuando expira el token o sesión
  },
  // debug: true, // muestra los posibles errores en consola
});
