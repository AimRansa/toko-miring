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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [carVisible, setCarVisible] = useState(false);
  const [cars, setCars] = useState<Car[]>([]);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    async function checkAuthStatus() {
      try {
        const response = await fetch("/api/auth/status", {
          credentials: "include",
        });
        const data = await response.json();
        setIsLoggedIn(data.isAuthenticated);
      } catch (error) {
        console.error("Error checking auth status:", error);
        setIsLoggedIn(false);
      }
    }
    checkAuthStatus();
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
    setTimeout(() => {
      setCarVisible(true);
    }, 100);

    const fetchCars = async () => {
      try {
        const response = await fetch("/api/cars?brand=Lamborghini");
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
    localStorage.removeItem("isLoggedIn"); // Optional: for backward compatibility
    setIsLoggedIn(false);
    setMenuOpen(false);
    router.push("/dashboard");
  };

  const handleCartClick = () => {
    if (!isLoggedIn) {
      alert("Please log in to access your cart.");
      return;
    }
    router.push("/dashboard/cart");
  };

  const handleShowMoreClick = () => {
    if (!isLoggedIn) {
      alert("Please log in to see more cars.");
      return;
    }
    router.push("/dashboard/customers/lamborghini/show");
  };

  const handleLogoClick = (href: string) => {
    if (!isLoggedIn) {
      alert("Please log in first.");
      return;
    }
    router.push(href);
  };

  if (isLoggedIn === null) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  return (
    <main className="flex flex-col bg-gradient-to-b from-white to-teal-100">
      {/* Header */}
      <div className="min-h-screen flex flex-col">
        <header className="flex justify-between items-center px-6 md:px-12 py-4 mb-8">
          <span className="text-lg font-semibold"></span>
          <nav className="relative flex gap-6 items-center">
            <Link href="/dashboard/about">About Us</Link>
            <button onClick={handleCartClick} className="hover:underline">
              Cart
            </button>
            <Link href="/dashboard/help">Help</Link>
            {!isLoggedIn ? (
              <Link href="/login">
                <button className="bg-black text-white px-4 py-1 rounded-full">
                  Login
                </button>
              </Link>
            ) : (
              <div className="relative" ref={menuRef}>
                <button onClick={() => setMenuOpen(!menuOpen)}>
                  <Image
                    src="/images/profile.png"
                    alt="Profile"
                    width={32}
                    height={32}
                    className="rounded-full cursor-pointer"
                  />
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt bravery-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    <Link
                      href="/dashboard/profile"
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

        {/* Lamborghini Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center px-6 md:px-12">
          <div>
            <h1 className="text-5xl font-bold mb-4">Lamborghini</h1>
            <p className="mb-4 text-sm text-gray-800">
              A Lamborghini is the ultimate symbol of exotic luxury and performance. With bold, aggressive design and powerful engines, it delivers an exhilarating driving experience that stands out on both the road and the track.
            </p>
            <button
              onClick={handleShowMoreClick}
              disabled={!isLoggedIn}
              className={`px-6 py-2 rounded-full text-sm transition shadow-md hover:shadow-lg ${
                isLoggedIn
                  ? "bg-black text-white hover:bg-white hover:text-black hover:border hover:border-black"
                  : "bg-gray-400 text-white cursor-not-allowed opacity-50"
              }`}
            >
              Show more cars
            </button>
          </div>

          <div
            className={`transition-all duration-700 ease-out transform ${
              carVisible ? "translate-x-0 opacity-100" : "translate-x-32 opacity-0"
            }`}
          >
            <Image
              src="/images/cars/lamborghini.png"
              alt="Lamborghini Car"
              width={800}
              height={400}
              className="mx-auto"
            />
          </div>
        </section>

        {/* Logo List */}
        <section className="mt-12 px-6 md:px-12">
          <div className="flex justify-start gap-6 mb-8">
            {[
              {
                href: "/dashboard/customers/lamborghini",
                src: "/images/logos/lamborghini.png",
                alt: "Lamborghini Logo",
                isActive: true,
              },
              {
                href: "/dashboard/customers/porsche",
                src: "/images/logos/porsche.png",
                alt: "Porsche Logo",
                isActive: false,
              },
              {
                href: "/dashboard/customers/ferrari",
                src: "/images/logos/ferrari.png",
                alt: " ferrari Logo",
                isActive: false,
              },
            ].map((logo, index) => (
              <div
                key={index}
                onClick={() => handleLogoClick(logo.href)}
                className={`relative w-[80px] h-[80px] transition-all duration-300 ${
                  isLoggedIn ? "cursor-pointer" : "cursor-not-allowed"
                } ${!logo.isActive ? "grayscale" : ""} ${
                  isLoggedIn && !logo.isActive ? "hover:grayscale-0" : ""
                }  `}
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  style={{ objectFit: "cover" }}
                  className="p-2 m-2"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Dynamic Car List */}
        <section className="mt-12 px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cars.map((car) => (
              <div key={car.id} className="border rounded-lg p-4 shadow-md">
                <h3 className="text-xl font-semibold">{car.name}</h3>
                <p className="text-sm text-gray-700">{car.description}</p>
                <p className="font-bold text-lg">
                  Harga: Rp {car.price.toLocaleString()}
                </p>
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
          <div className="container mx-auto flex flex-wrap justify-between">
            <div>
              <h3 className="text-lg font-semibold">Current Region / Language</h3>
              <p>United States / English</p>
              <button className="mt-2 px-4 py-2 border border-white rounded">
                Change
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Newsletter</h3>
              <p>Latest news directly in your inbox.</p>
              <button className="mt-2 px-4 py-2 border border-white rounded">
                Subscribe
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Locations & Contacts</h3>
              <p>Do you have any questions?</p>
              <button className="mt-2 px-4 py-2 border border-white rounded">
                Get in touch
              </button>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Social Media</h3>
              <div className="flex gap-3 mt-2">
                <span className="cursor-pointer">FB</span>
                <span className="cursor-pointer">IG</span>
                <span className="cursor-pointer">PN</span>
                <span className="cursor-pointer">YT</span>
                <span className="cursor-pointer">TW</span>
              </div>
            </div>
          </div>
          <div className="text-center mt-6">
            © 2025 Toko Miring. All rights reserved.
          </div>
        </footer>
      </div>
    </main>
  );
}