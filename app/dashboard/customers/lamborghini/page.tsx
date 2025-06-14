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

export default function LamborghiniPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [carVisible, setCarVisible] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const [language, setLanguage] = useState<"id" | "en">("id"); // Tambahan
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");

    // Optional: Load saved language from localStorage
    const savedLanguage = localStorage.getItem("language") as "id" | "en";
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => setCarVisible(true), 100);

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("/api/cars?brand=lamborghini");
        if (!response.ok) throw new Error("Failed to fetch cars.");
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

  const handleProtectedClick = (action: () => void) => {
    if (!isLoggedIn) {
      alert("Please log in first to access this feature.");
    } else {
      action();
    }
  };

  const handleChangeLanguage = () => {
    const newLang = language === "id" ? "en" : "id";
    setLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <main className="flex flex-col bg-gradient-to-b from-white to-teal-100 min-h-screen">
      {/* Header */}
      <header className="flex justify-between items-center px-6 md:px-12 py-4 mb-8">
        <span className="text-lg font-semibold"></span>
        <nav className="flex gap-6 items-center">
          <Link href="/dashboard/about" className="hover:underline">
            About Us
          </Link>
          <button
            onClick={() => handleProtectedClick(() => router.push("/dashboard/cart"))}
            className="hover:underline"
          >
            Cart
          </button>
          <Link href="/dashboard/help" className="hover:underline">
            Help
          </Link>
          {!isLoggedIn ? (
            <Link href="/login">
              <button className="bg-black text-white px-4 py-1 rounded-full hover:bg-gray-800 transition">
                Login
              </button>
            </Link>
          ) : (
            <div className="relative" ref={menuRef}>
              <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
                <Image
                  src="/images/profile.png"
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full cursor-pointer"
                />
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <Link
                    href="/dashboard/customers/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </header>

      {/* Video */}
      <section className="relative w-full h-screen overflow-hidden mb-12">
        <video
          src="/videos/lamborghini.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/40 text-white text-center px-6" />
      </section>

      {/* Logo Brand */}
      <section className="mt-12 px-6 md:px-12">
        <div className="flex justify-start gap-6 mb-8">
          {[
            { href: "/dashboard/customers/lamborghini", src: "/images/logos/lamborghini.png", alt: "Lamborghini Logo", isActive: true },
            { href: "/dashboard/customers/porsche", src: "/images/logos/porsche.png", alt: "Porsche Logo", isActive: false },
            { href: "/dashboard/customers/ferrari", src: "/images/logos/ferrari.png", alt: "Ferrari Logo", isActive: false },
          ].map((logo) => (
            <Link key={logo.alt} href={logo.href}>
              <div className={`relative w-20 h-20 transition-all duration-300 ${!logo.isActive ? "grayscale hover:grayscale-0" : ""}`}>
                <Image src={logo.src} alt={logo.alt} fill style={{ objectFit: "cover" }} className="p-2 m-2 flex items-center" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Description and Car Image */}
      <section
        className={`px-6 md:px-12 mb-16 transition-all duration-700 ease-out transform ${
          carVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text & Button */}
          <div className="space-y-6">
            <h1 className="text-5xl font-bold">Lamborghini</h1>
            <p className="text-gray-800 text-sm leading-relaxed">
              Lamborghini is the ultimate symbol of exotic luxury and performance. With bold, aggressive design and powerful engines, it delivers an exhilarating driving experience that stands out on both the road and the track.
            </p>
            <button
              onClick={() => router.push("/dashboard/customers/lamborghini/show")}
              className="bg-black text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-white hover:text-black hover:border hover:border-black"
            >
              Show more cars
            </button>
          </div>

          {/* Image */}
          <Image
            src="/images/cars/lamborghini.png"
            alt="Lamborghini Car"
            width={700}
            height={400}
            className="rounded-none shadow-none"
          />
        </div>
      </section>

      {/* List Cars from API */}
      <section className="px-6 md:px-12 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cars.map((car) => (
            <div key={car.id} className="border rounded-lg p-4 shadow-md bg-white">
              <h3 className="text-xl font-semibold">{car.name}</h3>
              <p className="text-sm text-gray-700">{car.description}</p>
              <p className="font-bold text-lg">Price: Rp {car.price.toLocaleString()}</p>
              <Image
                src={car.imageUrl}
                alt={car.name}
                width={300}
                height={200}
                className="mt-2 rounded-lg"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 mt-auto px-6 md:px-12">
        <div className="container mx-auto flex flex-wrap justify-between gap-8">
          <div>
            <h3 className="text-lg font-semibold">Wilayah & Bahasa Saat Ini</h3>
            <p>{language === "id" ? "Indonesia / Bahasa Indonesia" : "United States / English"}</p>
            <button onClick={handleChangeLanguage} className="mt-2 px-4 py-2 border border-white rounded hover:bg-gray-800 transition">
              Ubah Bahasa
            </button>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p>Dapatkan promo dan update terbaru dari Toko Miring langsung ke email Anda.</p>
            <button className="mt-2 px-4 py-2 border border-white rounded hover:bg-gray-800 transition">
              Berlangganan
            </button>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Lokasi & Kontak</h3>
            <p>Universitas Atma Jaya Yogyakarta, Indonesia</p>
            <p>Email: idjo.@gmail.com</p>
            <p>Telp: +62 812-3456-7890</p>
            <Link href="/dashboard/help">
              <button className="mt-2 px-4 py-2 border border-white rounded hover:bg-gray-800 transition">
                Hubungi Kami
              </button>
            </Link>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Media Sosial</h3>
            <div className="flex gap-3 mt-2">
              {["FB", "IG", "PN", "YT", "TW"].map((p) => (
                <a
                  key={p}
                  href="https://www.instagram.com/steve_anggana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300"
                >
                  {p}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center mt-6">© 2025 Toko Miring. All rights reserved.</div>
      </footer>
    </main>
  );
}