"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      router.push("/");
    } else {
      alert("خطأ في تسجيل الدخول!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          تسجيل الدخول
        </h2>

        <form onSubmit={handleSubmit} className="mt-6">
          <label className="block text-gray-600 text-sm">
            البريد الإلكتروني
          </label>
          <Input
            type="email"
            placeholder="u@u.u"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full"
          />

          <label className="block text-gray-600 text-sm mt-4">
            كلمة المرور
          </label>
          <Input
            type="password"
            placeholder="pp123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full"
          />

          <Button
            type="submit"
            className="w-full mt-6 bg-primary text-white py-2 rounded-lg"
          >
            تسجيل الدخول
          </Button>
        </form>
      </div>
    </div>
  );
}
