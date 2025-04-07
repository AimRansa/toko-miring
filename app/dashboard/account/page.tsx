"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function FerrariPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setMenuOpen(false);
    router.push("/"); // ← redirect ke halaman customers
  };

  return (
    <main className="min-h-screen px-8 py-6 bg-gradient-to-b from-white to-teal-100">
      <header className="flex justify-between items-center mb-8">
        <span className="text-lg font-semibold">menu</span>
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
                  src="/icons/profile.png"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-5xl font-bold mb-4">Ferrari</h1>
          <p className="mb-4 text-sm text-gray-800">
            A Ferrari is a symbol of luxury, speed, and precision. Known for its powerful engines and sleek design, it delivers an unmatched driving experience. The prancing horse logo represents racing excellence and innovation.
          </p>
          <button className="bg-black text-white px-6 py-2 rounded-full">
            Show more cars
          </button>
        </div>
        <div>
          <Image src="/ferrari.png" alt="Ferrari Car" width={800} height={400} />
        </div>
      </div>

      <div className="flex justify-start gap-6 mt-12">
        <Link href="/dashboard/lamborghini">
          <Image src="/logos/lamborghini.png" alt="Lamborghini Logo" width={40} height={40} />
        </Link>
        <Link href="/dashboard/porsche">
          <Image src="/logos/porsche.png" alt="Porsche Logo" width={40} height={40} />
        </Link>
        <Link href="/dashboard/ferrari">
          <Image src="/logos/ferrari.png" alt="Ferrari Logo" width={40} height={40} />
        </Link>
      </div>
    </main>
  );
}