"use client";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <html lang="ar">
        <body className="font-sans vsc-initialized">
          <Navbar />
          <main className="pt-16">{children}</main>
          <ToastContainer position="top-right" autoClose={3000} />

          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}
