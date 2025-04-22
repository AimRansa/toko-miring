"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function FerrariPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [carVisible, setCarVisible] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(isUserLoggedIn);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !(menuRef.current as any).contains(e.target)) {
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
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setMenuOpen(false);
    router.push("/");
  };

  return (
    <main className="min-h-screen flex flex-col px-8 py-6 bg-gradient-to-b from-white to-teal-100 flex-grow">
      <header className="flex justify-between items-center mb-8">
        <span className="text-lg font-semibold">Ferrari</span>
        <nav className="relative flex gap-6 items-center">
          <Link href="/dashboard/about">About Us</Link>
          <Link href="/dashboard/cart">Cart</Link>
          <Link href="#">Help</Link>

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
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
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

      <section className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl font-bold mb-4">Ferrari</h1>
          <p className="mb-4 text-sm text-gray-800">
            A Ferrari is a symbol of luxury, speed, and precision. Known for its powerful engines and sleek design, it delivers an unmatched driving experience. The prancing horse logo represents racing excellence and innovation.
          </p>
          <button
            onClick={() => router.push("/dashboard/customers/ferrari/show")}
            className="bg-black text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:bg-white hover:text-black hover:border hover:border-black"
          >
            Show more cars
          </button>
        </div>

        <div
          className={`transition-all duration-700 ease-out transform ${carVisible ? "translate-x-0 opacity-100" : "translate-x-32 opacity-0"}`}
        >
          <Image
            src="/ferrari.png"
            alt="Ferrari Car"
            width={800}
            height={400}
          />
        </div>
      </section>

      {/* Logos section moved below the "Show more cars" button */}
      <section className="mt-12">
        <div className="flex justify-start gap-6">
          {[ 
            { href: "/dashboard/customers/lamborghini", src: "/images/logos/lamborghini.png", alt: "Lamborghini Logo", isActive: false },
            { href: "/dashboard/customers/porsche", src: "/images/logos/porsche.png", alt: "Porsche Logo", isActive: false },
            { href: "/dashboard/customers/ferrari", src: "/images/logos/ferrari.png", alt: "Ferrari Logo", isActive: true }
          ].map((logo) => (
            <Link key={logo.alt} href={logo.href}>
              <div className={`relative w-10 h-10 transition-all duration-300 ${!logo.isActive ? "grayscale hover:grayscale-0" : ""}`}>
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 mt-auto px-6 md:px-12">
        <div className="container mx-auto flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Current Region / Language</h3>
            <p>United States / English</p>
            <button className="mt-2 px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition">
              Change
            </button>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p>Latest news directly in your inbox.</p>
            <button className="mt-2 px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition">
              Subscribe
            </button>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">Locations & Contacts</h3>
            <p>Do you have any questions?</p>
            <button className="mt-2 px-4 py-2 border border-white rounded hover:bg-white hover:text-black transition">
              Get in touch
            </button>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Social Media</h3>
            <div className="flex gap-3 mt-2">
              <span className="cursor-pointer hover:underline">FB</span>
              <span className="cursor-pointer hover:underline">IG</span>
              <span className="cursor-pointer hover:underline">PN</span>
              <span className="cursor-pointer hover:underline">YT</span>
              <span className="cursor-pointer hover:underline">TW</span>
            </div>
          </div>
        </div>
        <div className="text-center mt-6 border-t border-gray-700 pt-4">
          © 2025 Toko Miring. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
