"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

const products = [
  { id: "1", name: "بيتزا مارغريتا", price: "120 EGP", image: "/pizza.jpg", description: "بيتزا كلاسيكية بصلصة الطماطم الطازجة وجبنة الموزاريلا." },
  { id: "2", name: "باستا ألفريدو", price: "150 EGP", image: "/pasta.jpg", description: "باستا بالكريمة مع صلصة ألفريدو الكلاسيكية والدجاج المشوي." },
  { id: "3", name: "سلطة سيزر", price: "90 EGP", image: "/salad.jpg", description: "سلطة طازجة مع الدجاج المشوي، جبنة البارميزان، و صوص السيزر." },
  { id: "4", name: "تيراميسو", price: "80 EGP", image: "/tiramisu.jpg", description: "حلوى إيطالية شهية بطبقات من القهوة والماسكاربوني." },
];

export default function MenuPage() {
  const [cart, setCart] = useState<{ id: string; quantity: number }[]>([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);


  type Product = {
    id: string;
    name: string;
    price: number;
    quantity?: number; // إذا كان هناك كمية اختيارية
  };
  
  const addToCart = (product: Product) => {

    const updatedCart = [...cart];

    const existingProduct = updatedCart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      updatedCart.push({ id: product.id, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);


    toast.success(`✅ تم إضافة ${product.name} إلى الطلب`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
 




   };

  // حذف منتج من الطلب
  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">🍕 قائمة الطعام 🍝</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => {
          const isAdded = cart.some((item) => item.id === product.id);

          return (
            <div key={product.id} className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition">
              <Link href={`/product/${product.id}`}>
                <Image src={product.image} width={400} height={300} alt={product.name} className="rounded-lg w-full h-40 object-cover" />
                <h2 className="text-xl font-semibold text-gray-800 mt-3">{product.name}</h2>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <p className="text-lg font-semibold text-primary mt-2">{product.price}</p>
              </Link>

              {isAdded ? (
                <Button className="w-full mt-3 bg-red-500 text-white py-2 rounded-lg" onClick={() => removeFromCart(product.id)}>
                  ❌ إزالة من الطلب
                </Button>
              ) : (
                <Button className="w-full mt-3 bg-primary text-white py-2 rounded-lg" onClick={() => addToCart(product)}>
                  🛒 أضف إلى الطلب
                </Button>
              )}
            </div>
          );
        })}
      </div>

      {/* زر عرض الطلب */}
      <div className="text-center mt-6">
        <Link href="/cards">
          <Button className="bg-gray-700 text-white py-3 px-6 rounded-lg">🛍️ عرض الطلب</Button>
        </Link>
      </div>
    </div>
  );
}
