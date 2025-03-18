"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const products = [
  { id: "1", name: "بيتزا مارغريتا", price: 120, image: "/pizza.jpg" },
  { id: "2", name: "باستا ألفريدو", price: 150, image: "/pasta.jpg" },
  { id: "3", name: "سلطة سيزر", price: 90, image: "/salad.jpg" },
  { id: "4", name: "تيراميسو", price: 80, image: "/tiramisu.jpg" },
];

export default function CartPage() {
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);
// ?ddddddddddasdasdasdddd?
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const updateCart = (updatedCart: { id: string; quantity: number }[]) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const removeFromCart = (productId: string) => {
    updateCart(cart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: string, change: number) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: Math.max(1, item.quantity + change) } : item
    );
    updateCart(updatedCart);
  };

  const getProduct = (id: string) => products.find((p) => p.id === id);
  const totalPrice = cart.reduce((sum, item) => {
    const product = getProduct(item.id);
    return product ? sum + product.price * item.quantity : sum;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">🛍️ الطلبات</h1>

      {cart.length === 0 ? (
        <p className="text-center text-gray-600">لا يوجد منتجات مضافة بعد! 🛒</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {cart.map((item) => {
              const product = getProduct(item.id);
              if (!product) return null;

              return (
                <div key={item.id} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition">
                  <Image src={product.image} width={400} height={300} alt={product.name} className="rounded-lg w-full h-40 object-cover" />
                  <h2 className="text-xl font-semibold text-gray-800 mt-3">{product.name}</h2>
                  <p className="text-lg font-semibold text-primary">{product.price} EGP</p>

                  {/* عداد تغيير الكمية */}
                  <div className="flex items-center mt-2">
                    <Button className="bg-gray-300 px-3 text-lg" onClick={() => updateQuantity(item.id, -1)}>-</Button>
                    <p className="mx-3 text-lg">{item.quantity}</p>
                    <Button className="bg-gray-300 px-3 text-lg" onClick={() => updateQuantity(item.id, 1)}>+</Button>
                  </div>

                  <Button className="w-full mt-3 bg-red-500 text-white py-2 rounded-lg" onClick={() => removeFromCart(item.id)}>
                    ❌ إزالة من الطلب
                  </Button>
                </div>
              );
            })}
          </div>

          {/* المجموع وزر إنهاء الطلب */}
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">💰 الإجمالي: {totalPrice} EGP</h2>
            <Button className="mt-4 bg-green-600 text-white py-3 px-6 rounded-lg">✅ إنهاء الطلب</Button>
          </div>
        </>
      )}

      {/* زر الرجوع إلى القائمة */}
      <div className="text-center mt-6">
        <Link href="/menu">
          <Button className="bg-gray-700 text-white py-3 px-6 rounded-lg">🍽️ العودة إلى القائمة</Button>
        </Link>
      </div>
    </div>
  );
}
