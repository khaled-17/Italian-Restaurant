import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // بيانات تسجيل دخول ثابتة (Dummy Login)
        const user = { id: "1", name: "John Doe", email: "u@u.u" };

        if (
          credentials?.email === "u@u.u" &&
          credentials?.password === "pp123"
        ) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "supersecret",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
