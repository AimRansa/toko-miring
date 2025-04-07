'use client'; // Tambahkan ini jika kamu pakai Next.js App Router

import * as React from "react";
import { useRouter } from 'next/navigation'; // App Router pakai ini

export const BackButton: React.FC = () => {
  const router = useRouter();

  const handleBack = () => {
    router.push('/dashboard/account'); // Ganti dengan path account kamu
  };

  return (
    <nav className="self-start mt-2 mr-0 mb-0 ml-10">
      <button onClick={handleBack} className="cursor-pointer">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/a3de98da703a87cfa6b86626e48de17289530cee"
          className="h-[47px] w-[38px]"
          alt="Back"
        />
      </button>
    </nav>
  );
};
