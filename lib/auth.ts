import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@email.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // بيانات وهمية
        const dummyUser = { id: "1", name: "Khaled", email: "test@email.com", password: "123456" };

        if (credentials?.email === dummyUser.email && credentials?.password === dummyUser.password) {
          return { id: dummyUser.id, name: dummyUser.name, email: dummyUser.email };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: "/login" // تحديد صفحة تسجيل الدخول المخصصة
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET || "mysecret"
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
