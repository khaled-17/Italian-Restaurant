"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function AuthPage() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("u@u.u");
  const [password, setPassword] = useState("pp123");

  const handleLogin = async () => {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        {session ? (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800">
              مرحبًا، {session.user?.name} 👋
            </h2>
            <Button
              className="w-full mt-6 bg-red-500 text-white py-2 rounded-lg"
              onClick={() => signOut()}
            >
              تسجيل الخروج
            </Button>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-gray-800">
              تسجيل الدخول / إنشاء حساب
            </h2>

            {/* Email Input */}
            <div className="mt-6">
              <label className="block text-gray-600 text-sm">
                البريد الإلكتروني
              </label>
              <Input
                type="email"
                value={"u@u.u"}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full"
              />
            </div>

            {/* Password Input */}
            <div className="mt-4">
              <label className="block text-gray-600 text-sm">كلمة المرور</label>
              <Input
                type="password"
                value={"pp123"}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full"
              />
            </div>

            {/* Buttons */}
            <Button
              className="w-full mt-6 bg-primary text-white py-2 rounded-lg"
              onClick={handleLogin}
            >
              تسجيل الدخول
            </Button>

            <p className="text-sm text-center text-gray-600 mt-4">
              ليس لديك حساب؟{" "}
              <Link href="/register" className="text-primary font-bold">
                إنشاء حساب جديد
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
