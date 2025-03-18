import { Button } from "@/components/ui/button";

 
export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('/restaurant-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-white">
          <h1 className="text-5xl font-bold">مرحبا بكم في مطعمنا الإيطالي</h1>
          <p className="mt-4 text-lg">تجربة فريدة من نوعها للمأكولات الإيطالية الأصيلة</p>
          <Button className="mt-6 bg-primary text-white px-6 py-3 text-lg rounded-lg">
            تصفح القائمة 🍽️
          </Button>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-8 text-center bg-white">
        <h2 className="text-4xl font-bold text-gray-800">من نحن؟</h2>
        <p className="mt-4 text-lg text-gray-600">
          نقدم أشهى الأطباق الإيطالية مع لمسة تقليدية ومكونات طازجة يومياً.
        </p>
      </section>
    </div>
  );
}
