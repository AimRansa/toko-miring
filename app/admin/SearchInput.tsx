"use client";

import * as React from "react";

interface SearchInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const SearchInput: React.FC<SearchInputProps> = (props) => {
  return (
    <div className="relative max-sm:flex-1">
      <input
        type="text"
        placeholder="Search"
        className="py-0 pr-8 pl-2.5 rounded border border-black border-solid h-[27px] w-[161px]"
        {...props}
      />
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/465b3fe9fbade4785c77cc50eb815574a176a92f"
        alt=""
        className="absolute top-2/4 w-5 h-5 -translate-y-2/4 right-[5px]"
      />
    </div>
  );
};
