"use client";

import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  return (
    <button
      className={`px-2.5 py-0.5 text-xs font-semibold text-white cursor-pointer border-[none] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
