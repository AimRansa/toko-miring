import React from "react";
import { StarRating } from "./StarRating";
import { TokoMiringLogo } from "./TokoMiringLogo";

export function TestimonialCard() {
  return (
    <article className="flex flex-col bg-white rounded-lg shadow-lg h-[361px] max-sm:h-auto overflow-hidden">
      {/* Gambar produk */}
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3b6baf0d7d8e34e456fcbc44a01f953548d4a25"
        alt="Ferrari"
        className="w-full h-[105px] object-cover"
      />

      {/* Isi testimonial */}
      <div className="flex flex-col justify-between grow gap-3 p-4">
        {/* Header: Nama dan deskripsi */}
        <header>
          <h2 className="text-sm font-bold text-black">ESEP GANTENG !@#</h2>
          <p className="text-xs text-gray-500">ferari 239810</p>
        </header>

        {/* Isi testimonial */}
        <p className="text-sm text-black leading-relaxed line-clamp-6">
          “Saya sangat puas dengan Ferrari yang saya beli dari Toko Miring!
          Mobil ini benar-benar menawarkan performa luar biasa dengan tenaga
          yang buas dan handling yang sangat presisi. Desainnya elegan dan
          mewah, benar-benar mencerminkan kelasnya sebagai sport car premium.
          Proses pembelian di Toko Miring juga sangat mudah, transparan, dan
          profesional, sehingga saya merasa aman dan nyaman. Pelayanan mereka
          sangat responsif, dan mobil dikirim dalam kondisi sempurna.
          Benar-benar pengalaman membeli mobil impian yang luar biasa!”
        </p>

        {/* Footer: Rating dan logo */}
        <footer className="flex flex-col gap-3">
          <StarRating />
          <TokoMiringLogo />
        </footer>
      </div>
    </article>
  );
}
