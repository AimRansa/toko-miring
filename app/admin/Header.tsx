"use client";

import * as React from "react";
import { SearchInput } from "./SearchInput";

export const Header: React.FC = () => {
  return (
    <header className="flex gap-5 items-center mb-8">
      <button className="flex flex-col gap-1 cursor-pointer">
        <div className="bg-black rounded-sm h-[3px] w-[22px]" />
        <div className="bg-black rounded-sm h-[3px] w-[22px]" />
        <div className="bg-black rounded-sm h-[3px] w-[22px]" />
      </button>
      <SearchInput />
      <div className="flex gap-2.5 ml-auto max-sm:hidden">
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/579572c42c04ca2e54ef82585aaa46b897e67454" alt="" className="h-[30px] w-[30px]" />
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/3ebd2ad7d41493b129d3dca3cb32890b33dae875" alt="" className="h-[30px] w-[30px]" />
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/ea80d718d30c9aff9f1946a882e21e064f5799e5" alt="" className="h-[30px] w-[30px]" />
      </div>
    </header>
  );
};
