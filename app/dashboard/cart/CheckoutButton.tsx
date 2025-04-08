import * as React from "react";

export const CheckoutButton: React.FC = () => {
  return (
    <button
      className="mt-5 text-xl font-semibold text-white cursor-pointer border-[none] h-[45px] rounded-[90px] w-[799px] bg-black max-md:w-full"
      onClick={() => console.log("Checkout clicked")}
    >
      Checkout
    </button>
  );
};
