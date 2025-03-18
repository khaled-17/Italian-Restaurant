"use client";

import { useState, useEffect } from "react";

export default function CardList() {
  const [products, setProducts] = useState<{ title: string; description: string }[]>([]);

  // تحميل البيانات من `localStorage` عند فتح الصفحة
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products") || "[]");
    setProducts(storedProducts);
  }, []);

  // إضافة منتج جديد
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = () => {
    const newProduct = { title, description };
    const updatedProducts = [...products, newProduct];
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
    setTitle("");
    setDescription("");
  };

  // مسح جميع المنتجات
  const clearProducts = () => {
    localStorage.removeItem("products");
    setProducts([]);
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">📦 إضافة منتج جديد</h2>

      <input
        type="text"
        placeholder="اسم المنتج"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      />

      <textarea
        placeholder="وصف المنتج"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 mb-3 rounded"
      ></textarea>

      <button onClick={handleSave} className="w-full bg-blue-500 text-white p-2 rounded">
        ➕ إضافة المنتج
      </button>

      {products.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">🛍️ قائمة المنتجات</h3>

          {products.map((product, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded mb-2 shadow">
              <h4 className="text-lg font-semibold">{product.title}</h4>
              <p className="text-gray-700">{product.description}</p>
            </div>
          ))}

          <button onClick={clearProducts} className="w-full bg-red-500 text-white p-2 rounded mt-3">
            🗑️ مسح جميع المنتجات
          </button>
        </div>
      )}
    </div>
  );
}
