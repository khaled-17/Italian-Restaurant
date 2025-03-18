"use client"; // تأكد من استخدام "use client" 

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white shadow-md p-4 fixed w-full top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* العنوان الرئيسي */}
        <Link href="/" className="text-2xl font-bold text-primary">
          🍝 Italian Restaurant
        </Link>

        {/* الروابط */}
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-primary">
            الرئيسية
          </Link>
          <Link href="/menu" className="text-gray-700 hover:text-primary">
            قائمة الطعام
          </Link>
          <Link href="/cards" className="text-gray-700 hover:text-primary">
            الكارد
          </Link>

          {/* التحقق من حالة المستخدم */}
          {session ? (
            <>
              <span className="text-gray-700">مرحبًا، {session.user?.name}</span>
              <Button
                className="bg-red-500 text-white hover:bg-red-600"
                onClick={() => signOut()}
              >
                تسجيل خروج
              </Button>
            </>
          ) : (
            <Button
              className="bg-primary text-white hover:bg-primary/90"
              onClick={() => signIn()}
            >
              تسجيل دخول
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
