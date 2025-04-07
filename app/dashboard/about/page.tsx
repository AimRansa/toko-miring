"use client";

import Image from "next/image";
import React from "react";
import Link from "next/link";


export default function About() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f1e29] via-[#1e2f38] to-[#a3b8b5] p-6 flex items-center justify-center">
      <div className="max-w-5xl w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">

        {/* Text Section */}
        <div className="flex-1 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 drop-shadow">PROFILE TOKO</h1>
          <h2 className="text-xl font-semibold mt-4 mb-1">RANGGA</h2>
          <h3 className="text-lg font-bold mb-4">PENCETUS TOKO MIRING</h3>
          <p className="text-sm leading-relaxed">
            Toko Miring adalah platform jual beli sport car terkemuka di Indonesia yang menyediakan berbagai pilihan mobil mewah dengan harga bersaing. Didirikan oleh Rangga, seorang penggemar sport car sejati, bisnis ini berawal dari kecintaannya terhadap kecepatan dan desain otomotif kelas dunia.
            <br /><br />
            Berkat inovasi dan strategi bisnis yang kuat, kini Toko Miring telah memiliki berbagai cabang di seluruh Indonesia serta dapat diakses dengan mudah melalui website dan aplikasi mobile. Dengan komitmen menghadirkan pengalaman jual beli yang aman, transparan, dan berkualitas, Toko Miring menjadi destinasi utama bagi para pecinta mobil sport di Tanah Air.
          </p>

          {/* Contact / Sosmed */}
          <div className="mt-6 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Image src="/tiktok.png" alt="Tiktok" width={20} height={20} />
              <span>@toko.miring</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/whatsapp.png" alt="WA" width={20} height={20} />
              <span>081352119999</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/lokasi.png" alt="Lokasi" width={20} height={20} />
              <span>Seluruh Indonesia</span>
            </div>
          </div>

          {/* Button */}
          <Link href="/dashboard/profilkita">
            <button className="mt-6 bg-[#78c0b3] hover:bg-[#5aa195] text-white px-6 py-2 rounded-full font-semibold shadow">
              Our Profile
            </button>
          </Link>


        </div>

        {/* Gambar Rangga */}
        <div className="flex-shrink-0">
          <Image
            src="/foto rangga.png"
            alt="Rangga dan Ferrari"
            width={300}
            height={300}
            className="rounded-3xl"
          />
        </div>
      </div>
    </main>
  );
}
