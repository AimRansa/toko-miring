"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const ferrariCars = [
  {
    name: "Ferrari Roma",
    price: "$226,000",
    image: "/images/cars/ferrari.png",
  },
  {
    name: "Ferrari 296 GTB",
    price: "$338,000",
    image: "/images/cars/ferrari.png",
  },
  {
    name: "Ferrari SF90 Stradale",
    price: "$524,000",
    image: "/images/cars/ferrari.png",
  },
  {
    name: "Ferrari Portofino M",
    price: "$245,000",
    image: "/images/cars/ferrari.png",
  },
];

export default function FerrariPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen p-8 bg-white">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 text-sm bg-black text-white rounded-full hover:bg-gray-800 transition"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold mb-6">Ferrari Models</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {ferrariCars.map((car) => (
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
