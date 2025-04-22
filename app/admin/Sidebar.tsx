"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Tags,
  Boxes,
  ShoppingCart,
  LogOut,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
  { label: "Formulir Produk", href: "/admin/formulirProduk", icon: <Tags size={20} /> },
  { label: "Daftar Produk", href: "/admin/daftarProduk", icon: <Boxes size={20} /> },
  { label: "Transaksi", href: "/admin/transaksi", icon: <ShoppingCart size={20} /> },
  { label: "Formulir Transaksi", href: "/admin/formulirTransaksi", icon: <ShoppingCart size={20} /> }, // Tambahan baru
];


export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  return (
    <nav className="flex flex-col justify-between h-screen p-6 bg-slate-900 w-[263px] max-md:w-[200px] max-sm:p-4 max-sm:w-full">
      <div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/5a80eeaad196ee1ff43a447581d3864812447c69"
          alt=""
          className="mb-5 h-[53px] rounded-[90px] w-[53px]"
        />
        <h1 className="mb-10 text-xl font-bold text-zinc-300">Toko Miring</h1>

        <div className="flex flex-col gap-2.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-4 px-2 py-2.5 rounded text-white text-lg hover:bg-slate-800 transition ${
                  isActive ? "bg-slate-800 font-semibold" : ""
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 text-xl text-red-600 mt-10 hover:text-red-400 transition"
      >
        <LogOut size={20} />
        Log Out
      </button>
    </nav>
  );
};
