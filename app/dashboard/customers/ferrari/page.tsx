"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

type Car = {
  id: number;
  name: string;
  brand: string;
  price: number;
  description: string;
  imageUrl: string;
};

export default function FerrariPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [carVisible, setCarVisible] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setTimeout(() => setCarVisible(true), 100);
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("/api/cars");
        if (!response.ok) throw new Error("Gagal mengambil data mobil.");
        const carData: Car[] = await response.json();
        setCars(carData);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <main className="min-h-screen px-8 py-6 bg-gradient-to-b from-white to-teal-100">
      <header className="flex justify-between items-center mb-8">
        <nav className="relative flex gap-6 items-center">
          <Link href="/dashboard/about">About Us</Link>
          <Link href="/dashboard/cart">Cart</Link>
          <Link href="#">Help</Link>

          {!isLoggedIn ? (
            <Link href="/login">
              <button className="bg-black text-white px-4 py-1 rounded-full">Login</button>
            </Link>
          ) : (
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen(!menuOpen)}>
                <Image src="/images/profile.png" alt="Profile" width={32} height={32} className="rounded-full cursor-pointer" />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <Link href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
                    Profile
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl font-bold mb-4">Ferrari</h1>
          <p className="mb-4 text-sm text-gray-800">
            A Ferrari is a symbol of luxury, speed, and precision. Known for its powerful engines and sleek design, it delivers an unmatched driving experience.
          </p>
          <button onClick={() => router.push("/dashboard/customers/ferrari/show")} className="bg-black text-white px-6 py-2 rounded-full shadow-md">
            Show more cars
          </button>
        </div>

        <div className={`transition-all duration-700 ease-out transform ${carVisible ? "translate-x-0 opacity-100" : "translate-x-32 opacity-0"}`}>
          <Image src="/ferrari.png" alt="Ferrari Car" width={800} height={400} />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Daftar Mobil</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="border rounded-lg p-4 shadow-md">
              <h3 className="text-xl font-semibold">{car.name}</h3>
              <p className="text-sm text-gray-700">{car.description}</p>
              <p className="font-bold text-lg">Harga: Rp {car.price.toLocaleString()}</p>
              <Image src={car.imageUrl} alt={car.name} width={300} height={200} className="mt-2 rounded-lg" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}