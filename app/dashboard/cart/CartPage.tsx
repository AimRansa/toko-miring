"use client";
import * as React from "react";
import { BackButton } from "./BackButton";
import { CartContainer } from "./CartContainer";
import { CartHeader } from "./CartHeader";
import { CartItem } from "./CartItem";
import { CheckoutButton } from "./CheckoutButton";

const CartPage: React.FC = () => {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <main className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-b from-[#1f2a3a] via-[#2f3c4d] to-[#0e1012] font-[Poppins] text-white">
        <BackButton />

        <div className="relative flex flex-col items-center gap-6 w-full max-w-2xl p-6 mt-4 bg-white/">
          <CartContainer>
            <CartHeader />
            <section className="p-5 w-full border border-black/30 border-solid rounded-xl bg-white/5">
              <CartItem
                image="https://cdn.builder.io/api/v1/image/assets/TEMP/53b93fda9d45587c26f2899f5ca949f439285c0a"
                name="Ferari 488"
                price="$500.000"
                quantity={1}
              />
              <div className="mx-0 my-2.5 w-full h-px bg-white/20" />
            </section>
            <CheckoutButton />
          </CartContainer>
        </div>
      </main>
    </>
  );
};

export default CartPage;
