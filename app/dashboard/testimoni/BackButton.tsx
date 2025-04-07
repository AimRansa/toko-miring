"use client";
import React from "react";

export function BackButton() {
  const handleBack = () => {
    // Handle back navigation
    window.history.back();
  };

  return (
    <button
      onClick={handleBack}
      className="absolute cursor-pointer h-[47px] left-[71px] top-[33px] w-[38px] max-sm:top-5 max-sm:left-5 max-sm:h-[37px] max-sm:w-[30px]"
    >
      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a3de98da703a87cfa6b86626e48de17289530cee" alt="Back" />
    </button>
  );
}
