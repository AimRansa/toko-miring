"use client";
import * as React from "react";
import { TestimonialCard } from "./TestimonialCard";
import { BackButton } from "./BackButton";

export function TestimonialSection() {
  return (
    <main className="relative w-full min-h-screen bg-gradient-to-b from-cyan-50 to-white">
      {/* Header Logo & Judul */}
      <header className="flex flex-col items-center justify-center pt-10">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/7af6bb69139ca00aa79af687aa381b50905e4697"
          className="h-[105px] w-[105px] rounded-full"
          alt="Logo Toko Miring"
          aria-label="Logo Toko Miring"
        />
        <h1 className="mt-2 text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-cyan-800 tracking-wide max-sm:text-4xl">
          TESTIMONI
        </h1>
      </header>

      {/* Testimonial Grid */}
      <section className="mx-auto mt-14 w-[90%] max-w-[1250px]">
        <div className="grid gap-8 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {[...Array(5)].map((_, index) => (
            <TestimonialCard key={index} />
          ))}
        </div>
      </section>

      {/* Tombol Kembali */}
      <div className="absolute bottom-5 left-5">
        <BackButton />
      </div>
    </main>
  );
}
