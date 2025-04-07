"use client";
import * as React from "react";
import { TestimonialCard } from "./TestimonialCard";
import { BackButton } from "./BackButton";

export function TestimonialSection() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@700&family=Manrope:wght@400;800&family=Inter:wght@400&display=swap"
        rel="stylesheet"
      />
      <main className="relative w-full min-h-[728px]">
        <header className="flex gap-2.5 justify-center items-center pt-9">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7af6bb69139ca00aa79af687aa381b50905e4697"
            className="h-[105px] rotate-[0.268deg] rounded-[90px] w-[105px]"
            alt="Toko Miring Logo"
          />
          <h1 className="text-5xl font-bold text-transparent bg-clip-text rotate-[0.268deg] max-sm:text-4xl">
            TESTIMONI
          </h1>
        </header>
        <section className="mx-auto mt-14 mb-0 h-[495px] rounded-[89px] w-[1250px] max-md:h-auto max-md:w-[90%]">
          <div className="grid relative gap-8 p-10 grid-cols-[repeat(5,171px)] max-md:gap-5 max-md:p-5 max-md:grid-cols-[repeat(2,1fr)] max-sm:gap-4 max-sm:p-4 max-sm:grid-cols-[1fr]">
            {[...Array(5)].map((_, index) => (
              <TestimonialCard key={index} />
            ))}
          </div>
        </section>
        <BackButton />
      </main>
    </>
  );
}
