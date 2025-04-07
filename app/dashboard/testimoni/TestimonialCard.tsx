import React from "react";
import { StarRating } from "./StarRating";
import { TokoMiringLogo } from "./TokoMiringLogo";

export function TestimonialCard() {
  return (
    <article className="flex flex-col bg-white rounded-md h-[361px] shadow-[0px_15.6px_20.8px_rgba(0,0,0,0.25)] max-sm:h-auto">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/f3b6baf0d7d8e34e456fcbc44a01f953548d4a25"
        className="-mt-4 mr-0 mb-0 -ml-4 h-[105px] w-[187px]"
        alt="Ferrari"
      />
      <div className="flex flex-col grow gap-3 p-2.5">
        <header className="flex flex-col gap-0">
          <h2 className="text-xs font-extrabold text-black">
            ESEP GANTENG !@#
          </h2>
          <p className="text-xs text-neutral-600">ferari 239810</p>
        </header>
        <p className="grow text-xs text-black">
          &quot;Saya sangat puas dengan Ferrari yang saya beli dari Toko Miring!
          Mobil ini benar-benar menawarkan performa luar biasa dengan tenaga
          yang buas dan handling yang sangat presisi. Desainnya elegan dan
          mewah, benar-benar mencerminkan kelasnya sebagai sport car premium.
          Proses pembelian di Toko Miring juga sangat mudah, transparan, dan
          profesional, sehingga saya merasa aman dan nyaman. Pelayanan mereka
          sangat responsif, dan mobil dikirim dalam kondisi sempurna.
          Benar-benar pengalaman membeli mobil impian yang luar biasa!&quot;
        </p>
        <footer className="flex flex-col gap-2.5">
          <StarRating />
          <TokoMiringLogo />
        </footer>
      </div>
    </article>
  );
}
