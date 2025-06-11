"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  nama_produk: string;
  harga: number;
}

export default function PorscheDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        const res = await fetch(`/api/products/${id}`, { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white relative">
      {/* Tombol Back */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 left-4 z-10 flex items-center gap-1 text-blue-600 hover:text-blue-800 hover:underline"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back
      </button>

      {/* Gambar Mobil */}
      <div className="md:w-1/2 bg-gray-100">
        <div className="h-screen w-full relative">
          <Image
            src="/images/cars/porsche.png"
            alt={product?.nama_produk || "Porsche"}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>

      {/* Detail Mobil */}
      <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-2">
            {loading ? "Loading..." : product?.nama_produk || "Not Found"}
          </h1>
          <p className="text-2xl text-green-600 mb-8">
            {loading ? "" : product ? `Rp ${product.harga.toLocaleString()}` : ""}
          </p>

          <div className="h-px bg-gray-200 my-6"></div>

          <h2 className="text-2xl font-semibold mb-4">Specifications</h2>
          <div className="grid grid-cols-1 gap-4 mb-8">
            {[
              { label: "Engine", value: "3.0L Twin-Turbocharged Boxer 6" },
              { label: "Horsepower", value: "443 HP" },
              { label: "0-60 mph", value: "3.5 seconds" },
              { label: "Top Speed", value: "191 mph" },
              { label: "Transmission", value: "8-speed PDK" },
              { label: "Drive Type", value: "Rear-Wheel Drive / AWD" },
            ].map((spec, index) => (
              <div key={index}>
                <p className="text-sm text-gray-500">{spec.label}</p>
                <p className="text-lg">{spec.value}</p>
              </div>
            ))}
          </div>

          <div className="h-px bg-gray-200 my-6"></div>

          <h2 className="text-2xl font-semibold mb-4">Description</h2>
          <p className="text-gray-700 mb-8">
            Porsche embodies German precision, offering a thrilling driving experience with cutting-edge technology and timeless design. Perfectly engineered for speed and style.
          </p>

          <button className="w-full bg-black text-white py-3 px-6 rounded hover:bg-gray-800 transition">
            Contact Dealer
          </button>
        </div>
      </div>
    </div>
  );
}