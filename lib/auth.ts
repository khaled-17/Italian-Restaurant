import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {  // تحديد النوع هنا
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const dummyUser = { id: "1", name: "Khaled", email: "test@email.com", password: "123456" };

        if (credentials?.email === dummyUser.email && credentials?.password === dummyUser.password) {
          return { id: dummyUser.id, name: dummyUser.name, email: dummyUser.email };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login"
  },
  session: { strategy: "jwt" },  // هنا المشكلة المحتملة
  secret: process.env.NEXTAUTH_SECRET || "mysecret"
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
