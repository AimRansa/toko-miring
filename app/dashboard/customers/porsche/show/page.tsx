"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const porscheCars = [
  {
    name: "718 Cayman",
    price: "$72,800",
    image: "/images/cars/porsche.png",
  },
  {
    name: "718 Boxster",
    price: "$74,900",
    image: "/images/cars/porsche.png",
  },
  {
    name: "718 Cayman Style Edition",
    price: "$79,200",
    image: "/images/cars/porsche.png",
  },
  {
    name: "718 Boxster Style Edition",
    price: "$81,300",
    image: "/images/cars/porsche.png",
  },
  {
    name: "718 Cayman S",
    price: "$84,800",
    image: "/images/cars/porsche.png",
  },
  {
    name: "718 Boxster S",
    price: "$86,900",
    image: "/images/cars/porsche.png",
  },
];

export default function PorschePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen p-8 bg-white">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 text-sm bg-black text-white rounded-full hover:bg-gray-800 transition"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Porsche Models</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {porscheCars.map((car) => (
          <div key={car.name} className="flex flex-col items-center text-center">
            <div className="w-full h-48 relative">
              <Image
                src={car.image}
                alt={car.name}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <p className="mt-4 font-semibold">{car.name}</p>
            <p className="text-sm text-gray-600">From {car.price}</p>
          </div>
        ))}
      </div>

      {/* Review Section */}
      <section className="mt-16">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Customer Reviews</h2>
          <button
            onClick={() => router.push("/testimoni")}
            className="text-blue-600 hover:underline text-sm"
          >
            Show All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sample Testimonials - Replace or expand as needed */}
          <div className="p-4 border rounded-xl shadow-sm bg-gray-50">
            <p className="text-gray-700 italic">"The Cayman is sporty and surprisingly practical."</p>
            <p className="mt-2 text-sm text-gray-500">– Esep.</p>
          </div>
          <div className="p-4 border rounded-xl shadow-sm bg-gray-50">
            <p className="text-gray-700 italic">"Driving a Porsche was always a dream. The Boxster made it real."</p>
            <p className="mt-2 text-sm text-gray-500">– Aim.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
