"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

export const CheckoutButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      className="mt-5 text-xl font-semibold text-white cursor-pointer border-[none] h-[45px] rounded-[90px] w-[799px] bg-black max-md:w-full"
      onClick={() => router.push("/dashboard/invoices")}
    >
      Checkout
    </button>
  );
};
