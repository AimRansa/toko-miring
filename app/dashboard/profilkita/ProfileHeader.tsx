"use client";
import * as React from "react";
import Link from "next/link";

export const ProfileHeader: React.FC = () => {
  return (
    <header className="relative w-full text-center">
      {/* Title */}
      <h1 className="text-7xl font-extrabold text-white mb-4 tracking-wide">
        PROFILE
      </h1>

      {/* Underline */}
      <div className="h-[3px] w-[533px] mx-auto bg-white" />

      {/* Button "PROFIL TOKO" */}
      <div className="absolute right-5 top-5">
        <Link href="/dashboard/customers/ferrari">
          <button className="bg-[#a3b8b5] hover:bg-[#88a29e] text-[#0f1e29] font-semibold px-6 py-2 rounded-lg shadow-md text-lg">
            SHOP NOW
          </button>
        </Link>
      </div>
    </header>
  );
};
