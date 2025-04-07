"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const porscheCars = [
  {
    name: "718 Cayman",
    price: "$72,800",
    image: "/images/porsche/718-cayman.png",
  },
  {
    name: "718 Boxster",
    price: "$74,900",
    image: "/images/porsche/718-boxster.png",
  },
  {
    name: "718 Cayman Style Edition",
    price: "$79,200",
    image: "/images/porsche/718-cayman-style.png",
  },
  {
    name: "718 Boxster Style Edition",
    price: "$81,300",
    image: "/images/porsche/718-boxster-style.png",
  },
  {
    name: "718 Cayman S",
    price: "$84,800",
    image: "/images/porsche/718-cayman-s.png",
  },
  {
    name: "718 Boxster S",
    price: "$86,900",
    image: "/images/porsche/718-boxster-s.png",
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
    </main>
  );
}
