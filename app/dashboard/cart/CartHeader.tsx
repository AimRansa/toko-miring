import * as React from "react";

export const CartHeader: React.FC = () => {
  return (
    <header className="flex flex-col items-center">
      <div className="mb-5">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/e4da0537cbea762330680b6aed154708e88b2dce"
          className="h-[126px] rounded-[90px] w-[126px]"
          alt="Logo"
        />
      </div>
      <div className="flex gap-5 items-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text">Cart</h1>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/f416002050f4550621b436f4ba5e11e0b5a1d79f" className="h-[30px] w-[30px]" alt="Cart" />
      </div>
    </header>
  );
};
