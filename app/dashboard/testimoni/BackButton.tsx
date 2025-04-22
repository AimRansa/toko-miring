"use client";
import React from "react";

export function BackButton() {
  const handleBack = () => {
    window.history.back();
  };

  return (
    <button
      onClick={handleBack}
      className="absolute top-8 left-8 z-50 w-12 h-12 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/40 hover:bg-white/30 transition duration-300 max-sm:top-6 max-sm:left-4 max-sm:w-10 max-sm:h-10"
    >
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a3de98da703a87cfa6b86626e48de17289530cee"
        alt="Back"
        className="w-full h-full object-contain"
      />
    </button>
  );
}
