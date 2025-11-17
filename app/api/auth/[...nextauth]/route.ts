import prisma from "@/libs/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { singnInEmailPassword } from "@/auth/actions/auth-actions";


export const authOptions: NextAuthOptions = {

  adapter: PrismaAdapter(prisma) as Adapter,

  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID ?? '',
      clientSecret: process.env.GOOGLE_SECRET ?? '',
    }),
    // ...add more providers here
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Correo electrónico", type: "email", placeholder: "usuario@email.com" },
        password: { label: "Contraseña", type: "password", placeholder: "******" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await singnInEmailPassword(credentials!.email, credentials!.password);

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        }

        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    /* Se ejecuta una funcion tras otra */
    /* return false: se niega la autenticacion */
    async signIn({ user, account, profile, email, credentials }) {
      console.log({ user })
      return true;
    },

    async jwt({ token, user, account, profile }) {
      const dbUser = await prisma.user.findUnique({ where: { email: token.email ?? 'no-email' } });
      if (dbUser?.isActive === false) {
        throw Error('Usuario no está Activo');
      }
      token.roles = dbUser?.roles ?? ['no-roles'];
      token.id = dbUser?.id ?? 'no-uuid';
      return token;
    },

    /* Crear nuevos atributos a mi session */
    /*- Se ejecuta cada vez que se consulta la sesión (ej: `getServerSession()`)
      - **Transfiere datos** del JWT a la sesión disponible en cliente/servidor
      - Hace accesibles `roles` e `id` en toda la aplicación */
    async session({ session, token, user }) {
      if (session && session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }
      return session;
    }
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };