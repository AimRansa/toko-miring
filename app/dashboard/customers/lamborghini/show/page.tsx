"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id_produk: number;
  nama_produk: string;
  harga: number;
}

export default function LamborghiniPage() {
  const [cars, setCars] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/products/lamborghini");
        if (!res.ok) {
          throw new Error(`Failed to fetch cars. Status: ${res.status}`);
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
          throw new Error("Invalid data format: expected an array");
        }
        setCars(data);
      } catch (err: any) {
        console.error("Error fetching cars:", err.message);
        setError("Failed to load Lamborghini models. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const handleCarClick = (id: number) => {
    router.push(`/dashboard/customers/lamborghini/detail?id=${id}`);
  };

  if (loading) {
    return (
      <main className="min-h-screen p-8 bg-gradient-to-b from-white to-teal-100 flex justify-center items-center">
        <p>Loading Lamborghini models...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-8 bg-gradient-to-b from-white to-teal-100 flex justify-center items-center">
        <p className="text-red-600">{error}</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-white to-teal-100">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 text-sm bg-black text-white rounded-full hover:bg-gray-800 transition"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Lamborghini Models</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {cars.map((car) => (
          <div
            key={car.id_produk}
            className="flex flex-col items-center text-center cursor-pointer hover:scale-105 transition"
            onClick={() => handleCarClick(car.id_produk)}
          >
            <div className="w-full h-48 relative">
              <Image
                src="/images/cars/lamborghini.png"
                alt={car.nama_produk}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <p className="mt-4 font-semibold">{car.nama_produk}</p>
            <p className="text-sm text-gray-600">From Rp {car.harga.toLocaleString()}</p>
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
            <p className="text-gray-700 italic">"Driving the Aventador is a dream come true!"</p>
            <p className="mt-2 text-sm text-gray-500">– Esep.</p>
          </div>
          <div className="p-4 border rounded-xl shadow-sm bg-gray-50">
            <p className="text-gray-700 italic">"The Huracán is both powerful and stylish. Love it!"</p>
            <p className="mt-2 text-sm text-gray-500">– Aim.</p>
          </div>
        </div>
      </section>
    </main>
  );
}