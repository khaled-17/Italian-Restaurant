"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation"; // ✅ استدعاء useParams للحصول على ID المنتج

const products = [
  { id: "1", name: "بيتزا مارغريتا", price: "120 EGP", image: "/pizza.jpg", description: "بيتزا كلاسيكية مع صلصة الطماطم الطازجة وجبنة الموزاريلا." },
  { id: "2", name: "باستا ألفريدو", price: "150 EGP", image: "/pasta.jpg", description: "باستا بالكريمة مع صلصة ألفريدو الكلاسيكية والدجاج المشوي." },
];

export default function ProductPage() {
  const params = useParams(); // ✅ الحصول على params من Next.js
   const product = params ? products.find((p) => p.id === params.id) : null;

  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    type CartItem = {
      id: string;
      name: string;
      price: number;
      quantity: number;
    };

    const exists = cart.find((item: CartItem) => item.id === product.id);
    if (exists) setAdded(true);
  }, [product]);

  const addToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    type CartItem = {
      id: string;
      name: string;
      price: number;
      quantity: number;
    };

    const existingProduct = cart.find((item: CartItem) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setAdded(true);
    alert("تمت إضافة المنتج إلى الطلب ✅");
  };

  if (!product) {
    return <div className="text-center mt-10 text-red-500">لم يتم العثور على المنتج</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white p-6 shadow-lg rounded-lg max-w-md w-full">
        <Image src={product.image} width={400} height={300} alt={product.name} className="rounded-lg" />
        <h1 className="text-2xl font-bold text-gray-800 mt-4">{product.name}</h1>
        <p className="text-gray-600 mt-2">{product.description}</p>
        <p className="text-lg font-semibold text-primary mt-4">{product.price}</p>

        {/* زر الإضافة إلى الطلب */}
        <Button className="w-full mt-4 bg-primary text-white py-2 rounded-lg" onClick={addToCart} disabled={added}>
          {added ? "✅ تمت الإضافة" : "🛒 أضف إلى الطلب"}
        </Button>

        {/* زر عرض الطلب */}
        <Link href="/cart">
          <Button className="w-full mt-4 bg-gray-700 text-white py-2 rounded-lg">🛍️ عرض الطلب</Button>
        </Link>
      </div>
    </div>
  );
}
