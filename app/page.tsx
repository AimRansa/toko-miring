"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function FerrariPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(status);
  }, []);

  const handleCartClick = () => {
    if (!isLoggedIn) {
      alert("Please log in to access your cart.");
    } else {
      router.push("/dashboard/cart");
    }
  };

  const handleShowMoreClick = () => {
    if (!isLoggedIn) {
      alert("Please log in to see more cars.");
    } else {
      router.push("/dashboard/customers/ferrari/show");
    }
  };

  return (
    <main className="min-h-screen px-6 py-10 bg-gradient-to-b from-white to-teal-100 font-sans flex flex-col justify-between">
      {/* Header */}
      <header className="flex justify-end items-center mb-16">
        <nav className="flex gap-8 items-center text-sm font-semibold">
          <Link href="/dashboard/about">About Us</Link>
          <button onClick={handleCartClick} className="hover:underline">
            Cart
          </button>
          <Link href="#">Help</Link>
          <Link href="/login">
            <button className="bg-black text-white px-4 py-1 rounded-full">
              Login
            </button>
          </Link>
        </nav>
      </header>

      {/* Ferrari Info Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-12">
        <div className="space-y-6">
          <h1 className="text-6xl md:text-7xl font-extrabold text-black">Ferrari</h1>
          <p className="text-sm md:text-base text-gray-800 max-w-md">
            A Ferrari is a symbol of luxury, speed, and precision. Known for its
            powerful engines and sleek design, it delivers an unmatched driving
            experience.
          </p>
          <button
            onClick={handleShowMoreClick}
            className="bg-black text-white px-6 py-2 rounded-full text-sm hover:bg-white hover:text-black hover:border hover:border-black transition"
          >
            Show more cars
          </button>
        </div>

        <div className="flex justify-center md:justify-end">
          <Image
            src="/images/cars/ferrari.png"
            alt="Ferrari Car"
            width={1000}
            height={500}
            className="object-contain"
          />
        </div>
      </section>

      {/* Logo Navigation */}
      <div className="flex justify-center md:justify-start gap-8 mt-16">
        <Link href="/dashboard/lamborghini">
          <Image
            src="/images/logos/lamborghini.png"
            alt="Lamborghini Logo"
            width={50}
            height={50}
          />
        </Link>
        <Link href="/dashboard/porsche">
          <Image
            src="/images/logos/porsche.png"
            alt="Porsche Logo"
            width={50}
            height={50}
          />
        </Link>
        <Link href="/dashboard/ferrari">
          <Image
            src="/images/logos/ferrari.png"
            alt="Ferrari Logo"
            width={50}
            height={50}
          />
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-black text-white py-6 mt-20 px-6 md:px-12">
        <div className="container mx-auto flex flex-wrap justify-between">
          <div>
            <h3 className="text-lg font-semibold">Current Region / Language</h3>
            <p>United States / English</p>
            <button className="mt-2 px-4 py-2 border border-white rounded">Change</button>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p>Latest news directly in your inbox.</p>
            <button className="mt-2 px-4 py-2 border border-white rounded">Subscribe</button>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Locations & Contacts</h3>
            <p>Do you have any questions?</p>
            <button className="mt-2 px-4 py-2 border border-white rounded">Get in touch</button>
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
    </main>
  );
}