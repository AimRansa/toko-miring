import * as React from "react";

interface CartContainerProps {
  children: React.ReactNode;
}

export const CartContainer: React.FC<CartContainerProps> = ({ children }) => {
  return (
    <section className="flex flex-col items-center p-8 mt-5 shadow-lg backdrop-blur-[28.63px] bg-zinc-300 bg-opacity-10 min-h-[478px] rounded-[55px] w-[882px] max-md:p-5 max-md:w-[90%] max-sm:p-4 max-sm:rounded-[30px]">
      {children}
    </section>
  );
};
