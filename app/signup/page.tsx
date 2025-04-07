'use client';

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function SignUpPage() {
  const router = useRouter();

  const handleSignUp = () => {
    router.push("/login");
  };
  
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#a3b8b5] via-[#1e2f38] to-[#0f1e29]">
      <div className="flex flex-col md:flex-row items-center bg-transparent rounded-3xl p-6 md:p-12 shadow-2xl backdrop-blur-md">

        {/* Sign Up Form */}
        <div className="bg-white/10 p-8 rounded-3xl w-[320px] md:mr-12">
          <h2 className="text-center text-2xl font-bold text-white mb-6 drop-shadow">Sign Up</h2>

          <form onSubmit={handleSignUp} className="space-y-4">
            {/* Username */}
            <div className="relative">
              <span className="absolute top-2.5 left-2 w-5 h-5 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-white" viewBox="0 0 24 24"><path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z"/></svg>
              </span>
              <input
                type="text"
                placeholder="Username"
                className="w-full pl-10 pr-4 py-2 bg-transparent border-b border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <span className="absolute top-2.5 left-2 w-5 h-5 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-white" viewBox="0 0 24 24"><path d="M2 4v16h20V4H2zm10 7.414L4.707 6h14.586L12 11.414z"/></svg>
              </span>
              <input
                type="email"
                placeholder="Email"
                className="w-full pl-10 pr-4 py-2 bg-transparent border-b border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <span className="absolute top-2.5 left-2 w-5 h-5 text-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="fill-white" viewBox="0 0 24 24"><path d="M12 17a2 2 0 100-4 2 2 0 000 4zm6-7V8a6 6 0 10-12 0v2H4v10h16V10h-2zm-2 0H8V8a4 4 0 118 0v2z"/></svg>
              </span>
              <input
                type="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-2 bg-transparent border-b border-gray-300 text-white placeholder-gray-400 focus:outline-none focus:border-white"
                required
              />
            </div>
            <Link href="/login">
            <button
              type="submit"
              className="w-full bg-gradient-to-b from-[#5b7773] to-[#1f2b2a] text-white font-semibold py-2 mt-4 rounded-full hover:opacity-90 transition"
            >
              Resgister
            </button>
            </Link>
          </form>
        </div>

        {/* Logo Section */}
        <div className="mt-6 md:mt-0 md:ml-12">
          <Image src="/ferrari.png" alt="Toko Miring Logo" width={250} height={250} className="rounded-3xl" />
        </div>
      </div>
    </main>
  );
}
