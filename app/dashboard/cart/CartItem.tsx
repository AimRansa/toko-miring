"use client";
import * as React from "react";

interface CartItemProps {
  image: string;
  name: string;
  price: string;
  quantity: number;
}

export const CartItem: React.FC<CartItemProps> = ({
  image,
  name,
  price,
  quantity,
}) => {
  const [itemQuantity, setItemQuantity] = React.useState(quantity);

  const handleDecrease = () => {
    if (itemQuantity > 1) {
      setItemQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    setItemQuantity((prev) => prev + 1);
  };

  return (
    <article className="flex gap-5 items-center px-0 py-2.5 max-sm:flex-wrap max-sm:justify-between">
      <div className="flex items-center">
        <div className="w-4 h-4 border border-black border-solid rounded-[90px]" />
      </div>
      <img src={image} className="h-[30px] w-[30px]" alt={name} />
      <h2 className="flex-1 text-sm font-bold bg-clip-text">{name}</h2>
      <p className="text-sm font-bold bg-clip-text max-sm:order-1">{price}</p>
      <div className="flex gap-4 items-center max-sm:order-3 max-sm:justify-center max-sm:mt-2.5 max-sm:w-full">
        <button onClick={handleDecrease}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/72fb78d2f2420f5194ac97efb3ed29f31470b2e2"
            className="cursor-pointer h-[15px] w-[33px]"
            alt="Decrease"
          />
        </button>
        <span className="text-xs font-bold bg-clip-text">{itemQuantity}</span>
        <button onClick={handleIncrease}>
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/d93ff0c1c49cb4a98c491cd115bef5ad8f5e14b9"
            className="cursor-pointer h-[15px] w-[33px]"
            alt="Increase"
          />
        </button>
      </div>
      <button className="ml-5 text-sm font-bold bg-clip-text max-sm:order-2">
        Edit
      </button>
    </article>
  );
};
