"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id_produk: number;
  nama_produk: string;
  harga: number;
}

export default function FerrariPage() {
  const [cars, setCars] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      const res = await fetch("/api/products/ferrari");
      const data = await res.json();
      setCars(data);
    };
    fetchCars();
  }, []);

  // ✅ Ubah: kirim ID mobil, bukan nama
  const handleCarClick = (id: number) => {
    router.push(`/dashboard/customers/ferrari/detail?id=${id}`);
  };

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-white to-teal-100">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 text-sm bg-black text-white rounded-full hover:bg-gray-800 transition"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Ferrari Models</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {cars.map((car) => (
          <div
            key={car.id_produk}
            className="flex flex-col items-center text-center cursor-pointer hover:scale-105 transition"
            onClick={() => handleCarClick(car.id_produk)} // ✅ Ubah disini
          >
            <div className="w-full h-48 relative">
              <Image
                src="/images/cars/ferrari.png"
                alt={car.nama_produk}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <p className="mt-4 font-semibold">{car.nama_produk}</p>
            <p className="text-sm text-gray-600">From ${car.harga.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Review Section */}
      <section className="mt-16">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Customer Reviews</h2>
          <button
            onClick={() => router.push("/dashboard/testimoni")}
            className="text-blue-600 hover:underline text-sm"
          >
            Show All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-xl shadow-sm bg-gray-50">
            <p className="text-gray-700 italic">"The Ferrari Roma exceeded all my expectations!"</p>
            <p className="mt-2 text-sm text-gray-500">– Esep.</p>
          </div>
          <div className="p-4 border rounded-xl shadow-sm bg-gray-50">
            <p className="text-gray-700 italic">"Smooth drive and luxurious feel. Worth every penny."</p>
            <p className="mt-2 text-sm text-gray-500">– Aim.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
